import { BsPencil, BsTrash } from "react-icons/bs";
export default function EditBtn({ setEditCommentId, commentId, handleDelete }) {
	return (
		<>
			<button onClick={() => setEditCommentId(commentId)}>
				<BsPencil className="text-gray-500 hover:text-black" />
			</button>
			<span className="ml-1 mr-1 text-gray-500">|</span>
			<button onClick={() => handleDelete(commentId)}>
				<BsTrash className="text-gray-500 hover:text-black" />
			</button>
		</>
	);
}
