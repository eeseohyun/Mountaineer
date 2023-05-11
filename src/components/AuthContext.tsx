import { useEffect, useState, createContext } from "react";
import { auth } from "../firebase.config";
import { onAuthStateChanged, OperationType } from "firebase/auth";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	//로그인 상태 변경 감지
	useEffect(() => {
		onAuthStateChanged(auth, async (user) => {
			console.log(user);
			if (user) {
				setCurrentUser(user);
				setIsLoggedIn(true);
			} else {
				setCurrentUser(null);
				setIsLoggedIn(false);
			}
		});
	}, []);

	return (
		<AuthContext.Provider value={{ currentUser, isLoggedIn }}>
			{children}
		</AuthContext.Provider>
	);
};
