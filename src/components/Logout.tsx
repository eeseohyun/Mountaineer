import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase.config";
import { FiLogOut } from "react-icons/fi";

export default function Logout({
	setIsProfileModalOpen,
}: {
	setIsProfileModalOpen: (isOpen: boolean) => void;
}) {
	const navigate = useNavigate();
	const handleLogout = async () => {
		if (!window.confirm("로그아웃 하시겠습니까?")) {
			return;
		}
		try {
			await signOut(auth);
			setIsProfileModalOpen(false);
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
