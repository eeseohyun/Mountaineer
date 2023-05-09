import { useContext, useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaBars } from "react-icons/fa";
import { TbMountain } from "react-icons/tb";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import Logout from "./Logout";
import { getDocs, doc } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { storage, db } from "../firebase.config";
import Sidebar from "./Sidebar";

const Nav = () => {
	const { currentUser } = useContext(AuthContext);
	const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [searchInput, setSearchInput] = useState("");
	const [userProfile, setUserProfile] = useState(
		"https://www.thechooeok.com/common/img/default_profile.png"
	);

	useEffect(() => {
		const fetchProfile = async () => {
			const storageRef = ref(storage, `${currentUser.uid}/profile`);
			const url = await getDownloadURL(storageRef);
			console.log();
			setUserProfile(url);
		};
		if (currentUser) {
			fetchProfile();
		}
	}, [currentUser]);

	const handleSearchSubmit = (e) => {
		e.preventDefault();
		// Handle search submit
		console.log(`Search submitted: ${searchInput}`);
	};

	return (
		<nav className="navbar flex items-center justify-between py-4 px-6 bg-gray-800">
			<div className="flex items-center">
				<FaBars
					className="h-7 w-7 text-white"
					onClick={() => setIsSidebarOpen(!isSidebarOpen)}
				/>

				<div className="h-8 w-8 ml-2">
					<Link to="/">
						<TbMountain className="h-8 w-8 text-white" />
					</Link>
				</div>
			</div>

			<div className="flex items-center justify-center">
				<form onSubmit={handleSearchSubmit}>
					<input
						type="text"
						placeholder="검색"
						className="px-4 py-2 mr-2 border border-gray-300 rounded-lg focus:outline-none"
						value={searchInput}
						onChange={(e) => {
							setSearchInput(e.target.value);
						}}
					/>
				</form>
				<div className="relative items-center justify-center">
					{currentUser ? (
						<button
							className="text-white font-semibold focus:outline-none"
							onClick={() => {
								setIsProfileModalOpen(!isProfileModalOpen);
							}}
						>
							{userProfile && (
								<img
									src={userProfile}
									alt="Profile Picture"
									className="h-10 w-10 rounded-full mx-1"
								/>
							)}
						</button>
					) : (
						<>
							<Link to="/login">
								<button className="text-white font-semibold text-sm focus:outline-none">
									로그인
								</button>
							</Link>
							<span className="text-white font-semibold ml-1 mr-1">|</span>
							<Link to="/join">
								<button className="text-white font-semibold text-sm focus:outline-none">
									회원가입
								</button>
							</Link>
						</>
					)}
					{isProfileModalOpen && (
						<div className="absolute mt-2 py-2 w-48 bg-white rounded-lg shadow-xl">
							<Link to="/mypage">
								<button>마이페이지</button>
							</Link>
							<br></br>
							<Logout />
						</div>
					)}
				</div>
			</div>
		</nav>
	);
};

export default Nav;
