import { useState, useEffect, useContext, ChangeEvent, FormEvent } from "react";
import { BsPencil, BsTrash } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { doc, addDoc, Timestamp, query, orderBy } from "firebase/firestore";
import { db } from "../firebase.config";
import { getDocs, collection, updateDoc, deleteDoc } from "firebase/firestore";
import { AuthContext } from "./AuthContext";
import EditBtn from "./EditBtn";

interface Comment {
	id: string;
	text: string;
	postId: string;
	userId: string;
	userNickname: string;
	userProfile: string;
	timestamp: Timestamp;
}
export default function Comments() {
	const [comments, setComments] = useState<Comment[]>([]);
	const [commentText, setCommentText] = useState("");
	const [editText, setEditText] = useState("");
	const { currentUser } = useContext(AuthContext);
	const { postId } = useParams<{ postId: string }>();
	const [editCommentId, setEditCommentId] = useState<string | null>(null);

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
					} as Comment;
				})
			);
		};
		fetchComments();
	}, [postId]);
	//댓글 달기 함수
	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		const newComment: Comment = {
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

	//댓글 삭제 함수
	const handleDelete = async (id: string) => {
		if (window.confirm("삭제하시겠습니까?") == true) {
			const postRef = doc(db, "club", postId);
			const commentsRef = collection(postRef, "comments");
			await deleteDoc(doc(commentsRef, id)).then(() =>
				alert("삭제가 완료되었습니다.")
			);
		} else {
			return;
		}
		// 삭제된 댓글을 상태에 추가
		setComments(comments.filter((comment) => comment.id !== id));
	};

	//댓글 수정 함수
	const handleUpdate = async (id: string) => {
		const postRef = doc(db, "club", postId);
		const commentsRef = collection(postRef, "comments");
		const commentRef = doc(commentsRef, id);
		await updateDoc(commentRef, { text: editText });

		//수정된 댓글을 comments 상태에 업데이트
		const updatedComments = comments.map((comment) =>
			comment.id === id ? { ...comment, text: editText } : comment
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
								value={editText}
								onChange={(e) => setEditText(e.target.value)}
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
									<EditBtn
										setEditCommentId={setEditCommentId}
										handleDelete={handleDelete}
										commentId={comment.id}
										commentText={comment.text}
										setEditText={setEditText}
									/>
								</div>
							)}
						</div>
					)}
				</div>
			))}
		</div>
	);
}
