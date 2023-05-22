import { useEffect, useContext, useState } from "react";
import { ClipLoader } from "react-spinners";
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
import { AuthContext } from "../components/AuthContext";
import { Link } from "react-router-dom";
import Pagination from "../components/Pagination";

interface Category {
	label: string;
	hoverColor: string;
}

interface PostData {
	title: string;
	schedule: string;
	category: string;
	participantsNum: number;
	img: string;
	idx: string;
	isParticipationed: string[] | undefined;
}
export default function ClubPage(): JSX.Element {
	const [img, setImg] = useState<string>("");
	const [posts, setPosts] = useState<PostData[]>([]);
	const [participationBtn, setParticipationBtn] = useState<number>(0);
	const [category, setCategory] = useState<string>("전체");
	const [loading, setLoading] = useState<boolean>(true);
	const [participationBtns, setParticipationBtns] = useState<string[]>([]);
	//pagination
	const [limit, setLimit] = useState<number>(5);
	const [page, setPage] = useState<number>(1);
	const offset: number = (page - 1) * limit;
	const authContext = useContext(AuthContext);
	const currentUser = authContext?.currentUser;

	const categories: Category[] = [
		{ label: "전체", hoverColor: "gray-800" },
		{ label: "서울", hoverColor: "rose-500" },
		{ label: "경기", hoverColor: "orange-400" },
		{ label: "강원", hoverColor: "amber-400" },
		{ label: "충청", hoverColor: "emerald-400" },
		{ label: "전라", hoverColor: "sky-400" },
		{ label: "경상", hoverColor: "blue-500" },
		{ label: "제주", hoverColor: "purple-400" },
	];
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
				isParticipationed: doc.data().isParticipationed,
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

		const fetchParticipationBtns = async () => {
			const btns: string[] = [];
			if (currentUser) {
				for (const post of posts) {
					if (
						post.isParticipationed &&
						post.isParticipationed.includes(currentUser.uid)
					) {
						btns.push(post.idx);
					}
				}
			}
			setParticipationBtns(btns);
		};
		fetchPost();
		fetchImg();
		fetchParticipationBtns();
		setLoading(false);
	}, [
		category,
		participationBtn,
		currentUser,
		posts.map((post) => post.isParticipationed).join(","),
	]);

	//참여하기 버튼 함수
	const handleClick = async (idx: string) => {
		const clubRef = doc(db, "club", idx);
		const clubDoc = await getDoc(clubRef);
		const participants = clubDoc.data()?.isParticipationed || [];

		if (
			currentUser &&
			participants &&
			!participants.includes(currentUser.uid)
		) {
			await updateDoc(clubRef, {
				isParticipationed: [...participants, currentUser.uid],
			});

			const updatedBtns = [...participationBtns, idx];
			setParticipationBtns(updatedBtns);

			alert("참여하기 완료!");
		}
	};
	console.log(posts);
	return (
		<div className="py-5 w-full min-h-screen">
			<div className="flex justify-around items-center mb-3">
				<div className="flex justify-center">
					{categories.map((category) => (
						<p
							key={category.label}
							className={`cursor-pointer mr-5 text-lg font-medium text-gray-500 hover:text-${category.hoverColor}`}
							onClick={() => setCategory(category.label)}
						>
							{category.label}
						</p>
					))}
				</div>
				<Link to={currentUser ? "/post" : "/login"}>
					<button className="flex text-sm items-center p-2 w-1/10 border border-gray-400 text-gray-500 rounded-none outline-none hover:rounded-lg duration-200">
						글쓰기
						<BsPencilFill className="ml-1" />
					</button>
				</Link>
			</div>
			{loading ? (
				<div className="flex justify-center items-center h-screen">
					<ClipLoader color="#FCA5A5" size={100} />
				</div>
			) : (
				<>
					{posts.slice(offset, offset + limit).map((post) => (
						<div
							key={post.idx}
							className="sm:flex items-center justify-center w-full"
						>
							<div className="sm:w-full lg:m-7 lg:mb-0 mb-3 bg-white p-5 shadow rounded hover:bg-neutral-100">
								<div className="flex items-center  border-gray-200 pb-3">
									{post.img ? (
										<img src={post.img} className="h-32 w-44" />
									) : (
										<img
											className="h-32 w-44"
											src="https://baticrom.com/public/medies/noimage.jpg"
										/>
									)}
									<div className="flex items-start justify-between w-full">
										<div className="w-1/2 flex flex-col ml-5">
											<Link to={currentUser ? `/club/${post.idx}` : "/login"}>
												<p className="text-xl font-bold leading-4 text-gray-800">
													{post.title}
												</p>
											</Link>
											<p className="text-m leading-normal pt-2 text-gray-500">
												일정 : {post.schedule}
											</p>
											<div className="flex">
												<p className="w-12 py-2 px-3 mt-2 mr-1 text-xs text-center text-indigo-700 rounded-2xl bg-indigo-100">
													{post.category}
												</p>
												{(post.isParticipationed &&
													post.isParticipationed.length ===
														post.participantsNum) ||
												new Date(post.schedule) <= new Date() ? (
													<p className="w-20 py-2 px-3 mt-2 text-xs text-center text-white rounded-2xl bg-neutral-400">
														모집완료
													</p>
												) : null}
											</div>
										</div>
									</div>
									<div className="w-1/4 flex flex-col justify-center items-center">
										<p className="text-xl font-bold">인원</p>
										<p className="text-xl font-bold">
											{post.isParticipationed == undefined
												? 0
												: post.isParticipationed.length}
											/{post.participantsNum}
										</p>

										{post.isParticipationed &&
										(post.isParticipationed.length === post.participantsNum ||
											new Date(post.schedule) <= new Date()) ? (
											<button
												disabled
												className="font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-1 text-white bg-neutral-400"
											>
												모집완료
											</button>
										) : participationBtns.includes(post.idx) ? (
											<button
												disabled
												className="font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-1 text-white bg-neutral-400"
											>
												참여완료
											</button>
										) : new Date(post.schedule) <= new Date() ? (
											<button
												disabled
												className="font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-1 text-white bg-neutral-400"
											>
												모집마감
											</button>
										) : (
											<button
												onClick={() => handleClick(post.idx)}
												disabled={participationBtns.includes(post.idx)}
												className="mt-1 text-white bg-emerald-500 hover:bg-emerald-600 focus:ring-4 focus:ring-emerald-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
											>
												참여하기
											</button>
										)}
									</div>
								</div>
							</div>
						</div>
					))}
					<div className="flex justify-center mt-3">
						<Pagination
							total={posts.length}
							limit={limit}
							page={page}
							setPage={setPage}
						/>
					</div>
				</>
			)}
		</div>
	);
}
