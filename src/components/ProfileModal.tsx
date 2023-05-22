import { AiOutlineClose } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { BsPencilSquare } from "react-icons/bs";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { useContext, useState, useEffect } from "react";
import { collection, where, getDocs, query } from "firebase/firestore";
import { db } from "../firebase.config";
import Logout from "./Logout";
import DeleteAccount from "./DeleteAccount";

interface Post {
	id: string;
	//추가
}
interface Mountain {
	id: string;
	//추가
}
export default function ProfileModal({
	setIsProfileModalOpen,
}: {
	setIsProfileModalOpen: (isOpen: boolean) => void;
}) {
	const authContext = useContext(AuthContext);
	const currentUser = authContext?.currentUser;
	const [userPosts, setUserPosts] = useState<Post[]>([]);
	const [userMountains, setUserMountains] = useState<Mountain[]>([]);

	useEffect(() => {
		if (currentUser) {
			const fetchPosts = async () => {
				const board = collection(db, "club");
				let querySnapshot;
				querySnapshot = await getDocs(
					query(board, where("userId", "==", currentUser.uid))
				);
				const posts: Post[] = querySnapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				setUserPosts(posts);
			};
			fetchPosts();
		}
	}, [currentUser]);

	useEffect(() => {
		if (currentUser) {
			const fetchPosts = async () => {
				const board = collection(db, "club");
				let querySnapshot;
				querySnapshot = await getDocs(
					query(
						board,
						where("isParticipationed", "array-contains", currentUser.uid)
					)
				);
				const mountains: Mountain[] = querySnapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				setUserMountains(mountains);
			};
			fetchPosts();
		}
	}, [currentUser]);

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
			<span className="flex justify-center text-2xl font-bold">PROFILE</span>
			<div className="bg-indigo-200 shadow-lg pb-3 rounded-b-3xl">
				<div className="flex rounded-b-3xl bg-gray-100 dark:bg-gray-700 space-y-5 flex-col items-center py-7">
					{currentUser && currentUser.photoURL && (
						<img
							className="h-28 w-28 rounded-full border"
							src={currentUser?.photoURL}
							alt="userProfile"
						/>
					)}

					<span className="font-bold text-lg">{currentUser?.displayName}</span>
				</div>
				<div className="grid px-7 py-2 items-center justify-around grid-cols-2 gap-3 divide-x divide-solid">
					<Link
						to="/mypage/myposts"
						onClick={() => setIsProfileModalOpen(false)}
					>
						<div className="col-span-1 flex flex-col items-center">
							<span className="text-2xl font-bold text-indigo-600 dark:text-gray-500">
								{userPosts.length}
							</span>
							<span className="text-lg font-medium text-indigo-600">
								게시물
							</span>
						</div>
					</Link>
					<Link
						to="/mypage/myclubs"
						onClick={() => setIsProfileModalOpen(false)}
					>
						<div className="col-span-1 px-3 flex flex-col items-center">
							<span className="text-2xl font-bold text-indigo-600 dark:text-gray-500">
								{userMountains?.length}
							</span>
							<span className="text-lg font-medium text-indigo-600">
								산악참여
							</span>
						</div>
					</Link>
				</div>
			</div>
			<div className="grid rounded-2xl divide-y divide-dashed justify-evenly bg-gray-50 dark:bg-gray-300 m-3 mt-10 grid-cols-3">
				<div className="col-span-1 p-3">
					<div className="flex flex-col items-center">
						<Link
							to="/mypage/profile"
							onClick={() => setIsProfileModalOpen(false)}
						>
							<button className="tr-300">
								<CgProfile className="ml-1 h-14 w-14 text-gray-500 hover:text-gray-600" />
								<span className="text-medium font-medium text-gray-500">
									프로필
								</span>
								<span className="text-medium font-medium text-gray-500">
									수정
								</span>
							</button>
						</Link>
					</div>
				</div>
				<div className="col-span-1 p-3">
					<div className="flex flex-col items-center">
						<Link to="/post" onClick={() => setIsProfileModalOpen(false)}>
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
						<Logout setIsProfileModalOpen={setIsProfileModalOpen} />
					</div>
				</div>
			</div>
			<div className="flex mx-auto mt-3 mb-3 w-100 ">
				<DeleteAccount setIsProfileModalOpen={setIsProfileModalOpen} />
			</div>
		</div>
	);
}
