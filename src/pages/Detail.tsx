import { useState, useContext, useEffect } from "react";
import { getDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { AuthContext } from "../components/AuthContext";
import { useParams, useNavigate } from "react-router-dom";
import Comments from "../components/Comments";
import { BsPencil, BsTrash } from "react-icons/bs";

interface DetailData {
	title: string;
	img: string;
	profileImg: string;
	userNickname: string;
	userId: string;
	schedule: string;
	context: string;
	category: string;
	isParticipationed: string[];
	participantsNum: number;
}
export default function Detail() {
	const { postId } = useParams<{ postId: string }>();
	const [detail, setDetail] = useState<DetailData | null>(null);
	const { currentUser } = useContext(AuthContext);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchDetail = async () => {
			const docRef = doc(db, "club", postId);
			const docSnapshot = await getDoc(docRef);
			if (docSnapshot.exists()) {
				setDetail(docSnapshot.data() as DetailData);
			}
		};
		fetchDetail();
	}, [postId]);

	const handleDelete = async (id) => {
		if (window.confirm("삭제하시겠습니까?") == true) {
			const postRef = doc(db, "club", postId);
			await deleteDoc(postRef).then(() => alert("삭제가 완료되었습니다."));
		}
		navigate(`/club/${postId}`);
	};

	return (
		<>
			{detail !== null ? (
				<div className="p-10 justify-center">
					<div className="min-w-2/3 rounded overflow-hidden shadow-lg ">
						{detail.img && (
							<img className="w-full" src={detail.img} alt="Mountain" />
						)}

						<div className="px-6 py-4">
							<div className="font-bold text-2xl mb-3 ">{detail.title}</div>
							<div className="flex border-b-2 pb-3">
								<div className="flex items-center">
									<img
										src={detail.profileImg}
										className="h-10 w-10 rounded-full"
									/>
									<p className="text-gray-700 text-lg ml-2">
										{detail.userNickname}
									</p>
									<div className="flex ml-10">
										{currentUser && currentUser.uid === detail.userId && (
											<>
												<button
													onClick={() => navigate(`/club/${postId}/edit`)}
												>
													<BsPencil className="text-gray-500 hover:text-black" />
												</button>
												<span className="ml-1 mr-1 text-gray-500">|</span>
												<button onClick={handleDelete}>
													<BsTrash className="text-gray-500 hover:text-black" />
												</button>
											</>
										)}
									</div>
								</div>
							</div>

							<div className="context mt-3">
								<p className="text-gray-700 font-semibold">
									🗓️ 일정 : {detail.schedule}
								</p>
								<p className="text-gray-700 text-base whitespace-pre-wrap">
									{detail.context}
								</p>
							</div>
						</div>
						<div className="px-6 pt-4 pb-3">
							<span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
								#{detail.category}
							</span>
							<span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
								{detail.isParticipationed &&
								detail.isParticipationed.length === detail.participantsNum
									? "#모집완료"
									: "#모집중"}
							</span>
						</div>
						<Comments />
					</div>
				</div>
			) : (
				<div className="font-bold">Loading...</div>
			)}
		</>
	);
}
