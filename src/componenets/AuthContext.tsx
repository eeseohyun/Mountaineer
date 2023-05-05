import { useEffect, useState, createContext } from "react";
import { auth, db } from "../firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, updateDoc } from "firebase/firestore";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	const [profilePhotoURL, setProfilePhoteURL] = useState(
		"https://www.thechooeok.com/common/img/default_profile.png"
	);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	//로그인 상태 변경 감지
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			if (user) {
				setCurrentUser(user);
				setIsLoggedIn(true);
				//firestore에서 유저 정보 가져옴
				const userRef = doc(db, "users", user.uid);
				setDoc(userRef, { uid: user.uid }, { merge: true });

				// 프로필 사진 URL 가져오기
				setProfilePhoteURL(user.photoURL);
			} else {
				setCurrentUser(null);
				setProfilePhoteURL(
					"https://www.thechooeok.com/common/img/default_profile.png"
				);
			}
		});
		return () => {
			unsubscribe();
		};
	}, []);

	return (
		<AuthContext.Provider value={{ currentUser, profilePhotoURL }}>
			{children}
		</AuthContext.Provider>
	);
};
