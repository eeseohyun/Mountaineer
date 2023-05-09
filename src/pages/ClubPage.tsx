import { useEffect, useContext, useState } from "react";
import { BsPencilFill } from "react-icons/bs";
import { listAll, ref, getDownloadURL } from "firebase/storage";
import {
	collection,
	getDocs,
	orderBy,
	query,
	doc,
	updateDoc,
	getDoc,
	where,
} from "firebase/firestore";
import { storage, db } from "../firebase.config";
import { AuthContext } from "../componenets/AuthContext";
import { Link } from "react-router-dom";

export default function ClubPage() {
	const [img, setImg] = useState("");
	const [posts, setPosts] = useState([]);
	const [participationBtn, setParticipationBtn] = useState(0);
	const [category, setCategory] = useState("전체");
	const { currentUser } = useContext(AuthContext);

	useEffect(() => {
		const fetchPost = async () => {
			const board = collection(db, "club");
			//일정이 빨리 끝나는 순으로 불러옴
			let querySnapshot;
			//지역별로 게시물 불러오기
			if (category === "전체") {
				querySnapshot = await getDocs(query(board, orderBy("schedule", "asc")));
			} else {
				querySnapshot = await getDocs(
					query(
						board,
						where("category", "==", category),
						orderBy("schedule", "asc")
					)
				);
			}
			const postData = querySnapshot.docs.map((doc) => ({
				title: doc.data().title,
				schedule: doc.data().schedule,
				category: doc.data().category,
				participantsNum: doc.data().participantsNum,
				img: doc.data().img,
				idx: doc.id,
			}));
			setPosts(postData);
		};
		//게시물의 해당하는 이미지 불러오기
		const fetchImg = async () => {
			if (currentUser !== null) {
				const imgRef = ref(storage, `${currentUser.uid}`);
				await listAll(imgRef).then((response) => {
					response.items.forEach((item) => {
						getDownloadURL(item).then((url) => {
							if (url.includes(img)) {
								console.log(url);
								setImg(url);
							}
						});
					});
				});
			}
		};
		fetchPost();
		fetchImg();
	}, [category]);

	const handleClick = async (idx) => {
		const clubRef = doc(db, "club", idx);
		const clubDoc = await getDoc(clubRef);
		const participants = clubDoc.data().isParticipationed || [];

		if (!participants.includes(currentUser.uid)) {
			await updateDoc(clubRef, {
				isParticipationed: [...participants, currentUser.uid],
			});
			setParticipationBtn(participationBtn + 1);
		}
	};

	return (
		<div className="py-5 w-full">
			<div className="flex justify-around items-center mb-3">
				<div className="flex justify-center">
					<p
						className="cursor-pointer mr-5 text-lg font-medium text-gray-500 hover:text-gray-800"
						onClick={() => setCategory("전체")}
					>
						전체
					</p>
					<p
						className="cursor-pointer text-lg mr-5 font-medium text-gray-500 hover:text-rose-500"
						onClick={() => setCategory("서울")}
					>
						서울
					</p>
					<p
						className="cursor-pointer text-lg mr-5 font-medium text-gray-500 hover:text-orange-400"
						onClick={() => setCategory("경기")}
					>
						경기
					</p>
					<p
						className="cursor-pointer text-lg mr-5 font-medium text-gray-500 hover:text-amber-400"
						onClick={() => setCategory("강원")}
					>
						강원
					</p>
					<p
						className="cursor-pointer text-lg mr-5 font-medium text-gray-500 hover:text-emerald-400"
						onClick={() => setCategory("충청")}
					>
						충청
					</p>
					<p
						className="cursor-pointer text-lg mr-5 font-medium text-gray-500 hover:text-sky-400"
						onClick={() => setCategory("전라")}
					>
						전라
					</p>
					<p
						className="cursor-pointer text-lg mr-5 font-medium text-gray-500 hover:text-blue-500"
						onClick={() => setCategory("경상")}
					>
						경상
					</p>
					<p
						className="cursor-pointer text-lg mr-5 font-medium text-gray-500 hover:text-purple-400"
						onClick={() => setCategory("제주")}
					>
						제주
					</p>
				</div>
				<Link to="/post">
					<button className="flex text-sm items-center p-2 w-1/10 border border-gray-400 text-gray-500 rounded-none outline-none hover:rounded-lg duration-200">
						글쓰기
						<BsPencilFill className="ml-1" />
					</button>
				</Link>
			</div>
			{posts.map((post) => (
				<div
					key={post.idx}
					className="sm:flex items-center justify-center w-full"
				>
					<div className="sm:w-full lg:m-7 lg:mb-0 mb-3 bg-white p-5 shadow rounded hover:bg-neutral-100">
						<div className="flex items-center  border-gray-200 pb-3">
							<img src={post.img} className="w-40 h-30" />
							<div className="flex items-start justify-between w-full">
								<div className="pl-4 w-1/2">
									{currentUser !== null ? (
										<Link to={`/club/${post.idx}`}>
											<p className="text-xl font-bold leading-5 text-gray-800">
												{post.title}
											</p>
										</Link>
									) : (
										<Link to="/login">
											<p className="text-xl font-bold leading-5 text-gray-800">
												{post.title}
											</p>
										</Link>
									)}
									<p className="text-m leading-normal pt-2 text-gray-500">
										일정 : {post.schedule}
									</p>
									<p className="w-12 py-2 px-3 mt-2 text-xs text-center text-indigo-700 rounded-full bg-indigo-100">
										{post.category}
									</p>
								</div>
							</div>
							<div className="w-1/4 flex flex-col justify-center items-center">
								<p className="text-xl font-bold">인원</p>
								<p className="text-xl font-bold">
									{posts.isParticipationed}/{post.participantsNum}
								</p>
								<div>
									<button
										onClick={() => handleClick(post.idx)}
										disabled={participationBtn !== 0}
										className="mt-1 text-white bg-emerald-500 hover:bg-emerald-600 focus:ring-4 focus:ring-emerald-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
									>
										{participationBtn === 0 ? "참여하기" : "참여완료"}
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
