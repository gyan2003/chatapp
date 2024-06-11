import { createContext, useContext, useState, useEffect } from "react";

// Create the AuthContext
export const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuthContext = () => {
	return useContext(AuthContext);
};

// AuthContextProvider component
export const AuthContextProvider = ({ children }) => {
	const [authUser, setAuthUser] = useState(() => {
		const storedUser = localStorage.getItem("chat-user");
		return storedUser ? JSON.parse(storedUser) : null;
	});

	useEffect(() => {
		if (authUser) {
			localStorage.setItem("chat-user", JSON.stringify(authUser));
		} else {
			localStorage.removeItem("chat-user");
		}
	}, [authUser]);

	return (
		<AuthContext.Provider value={{ authUser, setAuthUser }}>
			{children}
		</AuthContext.Provider>
	);
};
