import { useContext, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { TbMountain } from "react-icons/tb";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import Logout from "./Logout";

const Nav = () => {
	const { currentUser, profilePhotoURL } = useContext(AuthContext);
	const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
	const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
	const [searchInput, setSearchInput] = useState("");

	const toggleCategoryModal = () => {
		setIsCategoryModalOpen(!isCategoryModalOpen);
	};

	const toggleProfileModal = () => {
		setIsProfileModalOpen(!isProfileModalOpen);
	};

	const handleSearchInputChange = (e) => {
		setSearchInput(e.target.value);
	};

	const handleSearchSubmit = (e) => {
		e.preventDefault();
		// Handle search submit
		console.log(`Search submitted: ${searchInput}`);
	};

	return (
		<nav className="navbar flex items-center justify-between py-4 px-6 bg-gray-800">
			{/* Logo and Categories */}
			<div className="flex items-center">
				{/* Logo */}
				<div className="h-8 w-8 mr-2">
					<Link to="/">
						<TbMountain className="h-8 w-8 text-white" />
					</Link>
				</div>

				{/* Category */}
				<div className="relative">
					<button
						className="text-white font-semibold mr-3 ml-2 focus:outline-none"
						onClick={toggleCategoryModal}
					>
						동호회 모집
					</button>

					{/* Category Modal Window */}
					{isCategoryModalOpen && (
						<div className="absolute mt-2 py-2 w-48 bg-white rounded-lg shadow-xl z-1">
							<li className="">전체</li>
							<li className="">서울</li>
							<li>경기</li>
							<li>강원</li>
							<li>충청</li>
							<li>전라</li>
							<li>경상</li>
							<li>제주</li>
						</div>
					)}
					<button className="text-white font-semibold mr-3 focus:outline-none">
						자유 게시판
					</button>
					<button className="text-white font-semibold focus:outline-none">
						정보 게시판
					</button>
				</div>
			</div>

			{/* Search Input and User Profile */}
			<div className="flex items-center">
				{/* Search Input */}
				<form onSubmit={handleSearchSubmit}>
					<input
						type="text"
						placeholder="검색"
						className="px-4 py-2 mr-2 border border-gray-300 rounded-lg focus:outline-none"
						value={searchInput}
						onChange={handleSearchInputChange}
					/>
				</form>
				{currentUser ? (
					<div className="relative items-center justify-center">
						<button
							className="text-white font-semibold focus:outline-none"
							onClick={toggleProfileModal}
						>
							{profilePhotoURL && (
								<img
									src={profilePhotoURL}
									alt="Profile Picture"
									className="h-8 w-8 rounded-full mx-2"
								/>
							)}
						</button>

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
				) : (
					<div className="relative items-center justify-center">
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
					</div>
				)}
			</div>
		</nav>
	);
};

export default Nav;
