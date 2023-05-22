import {
	collection,
	doc,
	query,
	getDocs,
	where,
	deleteDoc,
} from "firebase/firestore";
import {
	deleteUser,
	reauthenticateWithCredential,
	EmailAuthProvider,
} from "firebase/auth";
import { db } from "../firebase.config";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

export default function DeleteAccount({ setIsProfileModalOpen }) {
	const authContext = useContext(AuthContext);
	const currentUser = authContext?.currentUser;
	const navigate = useNavigate();

	const deleteAccount = async (e) => {
		e.preventDefault();
		if (!currentUser || !window.confirm("정말로 회원을 탈퇴하시겠습니까?")) {
			return;
		}
		const password = prompt("비밀번호를 입력하세요:");
		if (password === null) {
			return;
		}

		const credential = EmailAuthProvider.credential(
			currentUser?.email,
			password
		);
		await reauthenticateWithCredential(currentUser, credential);

		try {
			const userCommentsRef = collection(db, "comments");
			const userCommentsQuery = query(
				userCommentsRef,
				where("userId", "==", currentUser.uid)
			);
			const userCommentsSnapshot = await getDocs(userCommentsQuery);
			const commentsDelete = userCommentsSnapshot.docs.map((doc) =>
				deleteDoc(doc.ref)
			);
			await Promise.all(commentsDelete);

			const userPostsRef = collection(db, "club");
			const userPostsQuery = query(
				userPostsRef,
				where("userId", "==", currentUser.uid)
			);
			const userPostsSnapshot = await getDocs(userPostsQuery);
			const postsDelete = userPostsSnapshot.docs.map((doc) =>
				deleteDoc(doc.ref)
			);
			await Promise.all(postsDelete);

			const userRef = doc(db, "users", currentUser.uid);
			await deleteDoc(userRef);
			await deleteUser(currentUser);

			alert("탈퇴가 완료되었습니다.");
			setIsProfileModalOpen(false);
			navigate("/login");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<button
			onClick={deleteAccount}
			className="p-2 shadow-lg rounded-xl tr-300 w-100 font-medium  bg-red-400 hover:bg-red-500 text-gray-50"
		>
			회원탈퇴
		</button>
	);
}
