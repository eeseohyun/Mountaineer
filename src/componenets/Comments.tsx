import { useState, useEffect, useContext } from "react";
import { BsPencil, BsTrash } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { doc, addDoc, Timestamp, query, orderBy } from "firebase/firestore";
import { db } from "../firebase.config";
import { getDocs, collection, updateDoc, deleteDoc } from "firebase/firestore";
import { AuthContext } from "./AuthContext";

export default function Comments() {
	const [comments, setComments] = useState([]);
	const [commentText, setCommentText] = useState("");
	const [editText, setEditText] = useState("");
	const { currentUser } = useContext(AuthContext);
	const { postId } = useParams();
	const [editCommentId, setEditCommentId] = useState(null);

	useEffect(() => {
		const fetchComments = async () => {
			const postRef = doc(db, "club", postId);
			const commentsRef = collection(postRef, "comments");
			const q = query(commentsRef, orderBy("timestamp", "asc"));
			const commentsSnapshot = await getDocs(q);
			setComments(
				commentsSnapshot.docs.map((doc) => {
					return {
						id: doc.id,
						...doc.data(),
					};
				})
			);
		};
		fetchComments();
	}, [postId]);
	const handleSubmit = async (e) => {
		e.preventDefault();
		const newComment = {
			text: commentText,
			postId,
			userId: currentUser.uid,
			userNickname: currentUser.displayName,
			userProfile: currentUser.photoURL,
			timestamp: Timestamp.fromDate(new Date()),
		};

		const postRef = doc(db, "club", postId);
		const commentsRef = collection(postRef, "comments");
		const newCommentRef = await addDoc(commentsRef, newComment);

		// 추가된 댓글을 상태에 추가
		setComments([...comments, { ...newComment, id: newCommentRef.id }]);
		setCommentText("");
	};
	const handleDelete = async (id) => {
		const postRef = doc(db, "club", postId);
		const commentsRef = collection(postRef, "comments");
		await deleteDoc(doc(commentsRef, id));

		setComments(comments.filter((comment) => comment.id !== id));
	};

	const handleUpdate = async (id) => {
		const postRef = doc(db, "club", postId);
		const commentsRef = collection(postRef, "comments");
		const commentRef = doc(commentsRef, id);
		await updateDoc(commentRef, { text: commentText });

		//수정된 댓글을 comments 상태에 업데이트
		const updatedComments = comments.map((comment) =>
			comment.id === id ? { ...comment, text: commentText } : comment
		);
		setComments(updatedComments);

		setEditCommentId(null);
		setCommentText("");
	};
	return (
		<div className="px-6 pt-4 pb-2">
			<div className="text-medium font-semi-bold mb-3 text-gray-800 border-b-2 py-2">
				댓글 ({comments.length})
			</div>
			<form className="w-full rounded-lg" onSubmit={handleSubmit}>
				<div className="flex flex-wrap ">
					<div className="w-full md:w-full px-2 mb-2 mt-2">
						<textarea
							className="bg-gray-100 rounded border border-gray-300 leading-normal resize-none w-full h-20 py-2 px-3 font-sm placeholder-gray-400 focus:outline-none focus:bg-white"
							placeholder="댓글을 남겨주세요."
							required
							value={commentText}
							onChange={(e) => setCommentText(e.target.value)}
						></textarea>
						<button
							type="submit"
							className="cursor-pointer bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100 dark:bg-gray-500 dark:text-white dark:hover:bg-gray-100"
						>
							완료
						</button>
					</div>
				</div>
			</form>
			{comments.map((comment) => (
				<div
					key={comment.id}
					className="m-3 border-1 rounded border-gray-100 border-t-2 py-2 px-2"
				>
					<div className="flex items-center">
						<img
							src={comment.userProfile}
							className="h-10 w-10 rounded-full mr-2"
						/>
						<div>
							<p className="font-normal">{comment.userNickname}</p>
							<p className="text-sm text-gray-400 font-normal">
								{comment.timestamp.toDate().toLocaleString()}
							</p>
						</div>
					</div>
					{editCommentId === comment.id ? (
						<div className="flex items-center px-10">
							<input
								type="text"
								value={commentText}
								onChange={(e) => setCommentText(e.target.value)}
								className="w-5/6 bg-gray-100 rounded-l-lg border border-gray-300 leading-normal resize-none py-1 px-3 font-sm placeholder-gray-400 focus:outline-none focus:bg-white"
							/>
							<button
								className="cursor-pointer bg-white text-gray-700 font-medium py-1 px-4 border border-gray-300 rounded-r-lg tracking-wide mr-1 hover:bg-gray-100 dark:bg-gray-500 dark:text-white dark:hover:bg-gray-100"
								onClick={() => handleUpdate(comment.id)}
							>
								수정완료
							</button>
						</div>
					) : (
						<div className="flex items-center px-10">
							<p className="mr-5 ml-2 w-5/6">{comment.text}</p>
							{currentUser.uid === comment.userId && (
								<div className="flex w-1/6 justify-end">
									<button onClick={() => setEditCommentId(comment.id)}>
										<BsPencil className="text-gray-500 hover:text-black" />
									</button>
									<span className="ml-1 mr-1 text-gray-500">|</span>
									<button onClick={() => handleDelete(comment.id)}>
										<BsTrash className="text-gray-500 hover:text-black" />
									</button>
								</div>
							)}
						</div>
					)}
				</div>
			))}
		</div>
	);
}
