import { useState, useContext, useEffect } from "react";
import { getDoc, getDocs, doc } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase.config";
import { db } from "../firebase.config";
import { AuthContext } from "../componenets/AuthContext";
import { useParams } from "react-router-dom";

export default function Detail() {
	const { postId } = useParams();
	const [detail, setDetail] = useState([]);
	const { currentUser } = useContext(AuthContext);

	useEffect(() => {
		const fetchDetail = async () => {
			const docRef = doc(db, "club", postId);
			const docSnapshot = await getDoc(docRef);
			if (docSnapshot.exists()) {
				setDetail(docSnapshot.data());
			}
		};
		fetchDetail();
	}, [postId]);

	return (
		<>
			{detail ? (
				<div className="p-10 justify-center">
					<div className="min-w-2/3 rounded overflow-hidden shadow-lg ">
						<img className="w-full" alt="Mountain" />
						<div className="px-6 py-4">
							<div className="font-bold text-xl mb-2">{detail.title}</div>
							<p className="text-gray-700 text-base">
								일정 : {detail.schedule}
							</p>
							<p className="text-gray-700 text-base">{detail.context}</p>
						</div>
						<div className="px-6 pt-4 pb-2">
							<span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
								#{detail.category}
							</span>
							<span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
								#모집중
							</span>
						</div>
						<div className="px-6 pt-4 pb-2">
							<form className="w-full rounded-lg">
								<div className="flex flex-wrap">
									<h2 className="text-gray-800 text-sm">댓글 쓰기</h2>
									<div className="w-full md:w-full px-3 mb-2 mt-2">
										<textarea
											className="bg-gray-100 rounded border border-gray-300 leading-normal resize-none w-full h-20 py-2 px-3 font-sm placeholder-gray-400 focus:outline-none focus:bg-white"
											placeholder="댓글을 남겨주세요."
											required
										></textarea>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			) : (
				<div>Loading...</div>
			)}
		</>
	);
}
//<div className="flex mx-auto items-center justify-center shadow-lg mt-56 mb-4 max-w-lg">
