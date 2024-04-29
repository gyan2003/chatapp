import mongoose from "mongoose";

const connectToMongoDB=async (req,res)=>{
    try{
      await mongoose.connect(process.env.MONGODB_URI);
      console.log("Connected to MONGODB");
    }catch(err){
      console.log("Error connecting in mongodb: ",err.message);
    }
}

export default connectToMongoDB;