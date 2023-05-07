import { useEffect, useState, createContext } from "react";
import { auth, db } from "../firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, updateDoc } from "firebase/firestore";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	//로그인 상태 변경 감지
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			if (user) {
				setCurrentUser(user);
				setIsLoggedIn(true);
			} else {
				setCurrentUser(null);
			}
		});
		return () => {
			unsubscribe();
		};
	}, []);

	return (
		<AuthContext.Provider value={{ currentUser }}>
			{children}
		</AuthContext.Provider>
	);
};
