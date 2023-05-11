import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase.config";
import { FiLogOut } from "react-icons/fi";

export default function Logout() {
	const { currentUser } = useContext(AuthContext);
	const navigate = useNavigate();
	const handleLogout = async (event) => {
		event.preventDefault();

		try {
			await signOut(auth);
			navigate("/login");
		} catch (error) {
			console.error("로그아웃 중 에러 발생:", error);
		}
	};
	return (
		<button onClick={handleLogout} className="tr-300">
			<FiLogOut className="h-14 w-14 text-red-400 hover:text-red-500" />
			<span className="text-medium font-medium text-gray-500">로그아웃</span>
		</button>
	);
}
