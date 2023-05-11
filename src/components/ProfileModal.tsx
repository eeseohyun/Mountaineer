import { AiOutlineClose } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { BsPencilSquare } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { useContext } from "react";
import Logout from "./Logout";

export default function ProfileModal({ setIsProfileModalOpen }) {
	const { currentUser } = useContext(AuthContext);
	return (
		<div className="h-full w-full flex flex-col bg-gray-100 dark:bg-gray-700 shadow-xl rounded-xl">
			<div className="ml-3 h-7 flex justify-end items-center">
				<button
					onClick={() => setIsProfileModalOpen(false)}
					className="m-1 p-2 justify-end rounded-md text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500"
				>
					<AiOutlineClose />
				</button>
			</div>
			<div className="bg-emerald-400 shadow-lg pb-3 rounded-b-3xl">
				<div className="flex rounded-b-3xl bg-gray-100 dark:bg-gray-700 space-y-5 flex-col items-center py-7">
					<img
						className="h-28 w-28 rounded-full border"
						src={currentUser?.photoURL}
						alt="userProfile"
					/>
					<span className="font-bold text-lg">{currentUser?.displayName}</span>
				</div>
				<div className="grid px-7 py-2 items-center justify-around grid-cols-2 gap-3 divide-x divide-solid">
					<div className="col-span-1 flex flex-col items-center">
						<span className="text-2xl font-bold dark:text-gray-500">12</span>
						<span className="text-lg font-medium 0">게시물</span>
					</div>
					<div className="col-span-1 px-3 flex flex-col items-center">
						<span className="text-2xl font-bold dark:text-gray-500">12</span>
						<span className="text-lg font-medium">참여</span>
					</div>
				</div>
			</div>
			<div className="grid rounded-2xl divide-y divide-dashed justify-evenly bg-gray-50 dark:bg-gray-300 m-3 mt-10 grid-cols-3">
				<div className="col-span-1 p-3">
					<div className="flex flex-col items-center">
						<Link to="/mypage/profile">
							<button className="tr-300">
								<CgProfile className="h-14 w-14 text-gray-500 hover:text-gray-600" />
								<span className="text-medium font-medium text-gray-500">
									프로필 수정
								</span>
							</button>
						</Link>
					</div>
				</div>
				<div className="col-span-1 p-3">
					<div className="flex flex-col items-center">
						<Link to="/post">
							<button className="tr-300">
								<BsPencilSquare className="h-14 w-14 text-gray-500 hover:text-gray-600" />
								<span className="text-medium font-medium text-gray-500">
									글쓰기
								</span>
							</button>
						</Link>
					</div>
				</div>
				<div className="col-span-1 p-3 ">
					<div className="flex flex-col items-center">
						<Logout />
					</div>
				</div>
			</div>
			<div className="flex mx-auto mt-3 mb-3 w-100 ">
				<button className="p-2 shadow-lg rounded-xl tr-300 w-100 font-medium  bg-red-400 hover:bg-red-500 text-gray-50">
					계정삭제
				</button>
			</div>
		</div>
	);
}
