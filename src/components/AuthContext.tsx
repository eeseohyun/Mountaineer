import { useEffect, useState, createContext, ReactNode, FC } from "react";
import { auth } from "../firebase.config";
import { onAuthStateChanged, User } from "firebase/auth";

interface AuthContextProps {
	currentUser: User | null;
}
export const AuthContext = createContext<AuthContextProps | null>(null);

interface AuthProviderProps {
	children: ReactNode;
}
export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
	const [currentUser, setCurrentUser] = useState<User | null>(null);

	//로그인 상태 변경 감지
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			console.log(user);
			if (user) {
				setCurrentUser(user);
			} else {
				setCurrentUser(null);
			}
		});
		return unsubscribe();
	}, []);

	const value: AuthContextProps = { currentUser };

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
