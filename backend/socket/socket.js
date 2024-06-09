import { Server } from "socket.io";
import http from "http";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    } 
  },
});

const userSocketMap = {}; // {userId: socketId}

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId !== undefined && userId !== "undefined") {
    userSocketMap[userId] = socket.id;
  }

  // Send the current list of online users to all clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
    if (userId !== undefined && userId !== "undefined") {
      delete userSocketMap[userId];
    }
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

// Utility function to get the receiver's socket ID
export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

export { app, io, server };
