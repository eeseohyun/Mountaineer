import { useEffect, useState, createContext, ReactNode } from "react";
import { auth } from "../firebase.config";
import { onAuthStateChanged, User } from "firebase/auth";

interface AuthContextProps {
	currentUser: User | null;
	isLoggedIn: boolean;
}
export const AuthContext = createContext<AuthContextProps | null>(null);

interface AuthProviderProps {
	children: ReactNode;
}
export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
	const [currentUser, setCurrentUser] = useState<User | null>(null);
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
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
