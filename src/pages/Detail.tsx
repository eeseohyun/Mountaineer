import { useState, useContext, useEffect } from "react";
import { getDoc, getDocs, doc } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase.config";
import { db } from "../firebase.config";
import { AuthContext } from "../componenets/AuthContext";
import { useParams } from "react-router-dom";

export default function Detail() {
	const { postId } = useParams();
	const [post, setPost] = useState([]);
	const { currentUser } = useContext(AuthContext);

	useEffect(() => {
		const fetchDetail = async () => {
			const docRef = doc(db, "club", postId);
			const docSnapshot = await getDoc(docRef);
			if (docSnapshot.exists()) {
				setPost(docSnapshot.data());
			}
		};
		fetchDetail();
	}, [postId]);

	return (
		<>
			{post ? (
				<div className="p-10 justify-center">
					<div className="min-w-2/3 rounded overflow-hidden shadow-lg ">
						<img className="w-full" src="/mountain.jpg" alt="Mountain" />
						<div className="px-6 py-4">
							<div className="font-bold text-xl mb-2">{post.title}</div>
							<p className="text-gray-700 text-base">일정 : {post.schedule}</p>
							<p className="text-gray-700 text-base">{post.context}</p>
						</div>
						<div className="px-6 pt-4 pb-2">
							<span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
								#{post.category}
							</span>
							<span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
								#모집중
							</span>
						</div>
					</div>
				</div>
			) : (
				<div>Loading...</div>
			)}
		</>
	);
}
