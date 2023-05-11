import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase.config";

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
		<div className="group-hover:text-red-500 group-hover:font-semibold w-full group-active:scale-95 self-stretch pl-2 rounded flex items-center space-x-2 transition-all duration-200 dark:group-hover:text-white dark:hover:text-white text-sm">
			<span onClick={handleLogout} className="font-QuicksandMedium">
				로그아웃
			</span>
		</div>
	);
}
