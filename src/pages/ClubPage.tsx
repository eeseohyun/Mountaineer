import { useEffect, useContext, useState } from "react";
import { listAll, ref, getDownloadURL } from "firebase/storage";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { storage, db } from "../firebase.config";
import { AuthContext } from "../componenets/AuthContext";

export default function ClubPage() {
	const [img, setImg] = useState("");
	const [posts, setPosts] = useState([]);
	const [participationBtn, setParticipationBtn] = useState(0);
	const { currentUser } = useContext(AuthContext);

	useEffect(() => {
		const fetchPost = async () => {
			const board = collection(db, "club");
			//일정이 빨리 끝나는 순으로 불러옴
			const querySnapshot = await getDocs(
				query(board, orderBy("schedule", "asc"))
			);
			const postData = querySnapshot.docs.map((doc) => ({
				title: doc.data().title,
				schedule: doc.data().schedule,
				category: doc.data().category,
				participantsNum: doc.data().participantsNum,
				img: doc.data().img,
			}));

			setPosts(postData);
		};

		const fetchImg = async () => {
			const imgRef = ref(storage, `${currentUser.uid}/`);
			await listAll(imgRef).then((response) => {
				response.items.forEach((item) => {
					getDownloadURL(item).then((url) => {
						if (url === img) {
							console.log(url);
							setImg(url);
						}
					});
				});
			});
		};
		fetchPost();
		fetchImg();
	}, []);

	return (
		<div className="py-8 w-full">
			<p>카테고리 | 전체</p>

			{posts.map((post, idx) => (
				<div key={idx} className="sm:flex items-center justify-center w-full">
					<div className="sm:w-full lg:m-7 lg:mb-0 mb-3 bg-white p-5 shadow rounded">
						<div className="flex items-center  border-gray-200 pb-3">
							<img src={post.img} className="w-40 h-30" />
							<div className="flex items-start justify-between w-full">
								<div className="pl-4 w-1/2">
									<p className="text-xl font-bold leading-5 text-gray-800">
										{post.title}
									</p>
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
									{participationBtn}/{post.participantsNum}
								</p>
								<div>
									{post.participantsNum > participationBtn ? (
										<button className="mt-1 text-white bg-emerald-500 hover:bg-emerald-600 focus:ring-4 focus:ring-emerald-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">
											참여하기
										</button>
									) : (
										<button disabled>모집마감</button>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
