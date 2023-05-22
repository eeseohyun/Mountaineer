import { useEffect, useState, createContext, ReactNode, FC } from "react";
import { auth } from "../firebase.config";
import { onAuthStateChanged, User } from "firebase/auth";

interface AuthContextProps {
	currentUser: User | null;
	setIsLogged: (value: boolean) => void;
}
export const AuthContext = createContext<AuthContextProps | null>(null);

interface AuthProviderProps {
	children: ReactNode;
}
export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
	const [currentUser, setCurrentUser] = useState<User | null>(null);
	const [isLogged, setIsLogged] = useState<boolean>(false);

	//로그인 상태 변경 감지
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			console.log(user);
			if (user) {
				setCurrentUser(user);
				setIsLogged(true);
			} else {
				setCurrentUser(null);
				setIsLogged(false);
			}
		});
		return unsubscribe;
	}, []);

	const value: AuthContextProps = { currentUser, setIsLogged };

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
