import { BsPencil, BsTrash } from "react-icons/bs";
export default function EditBtn({
	setEditCommentId,
	handleDelete,
	commentId,
	commentText,
	setEditText,
}) {
	const handleEdit = () => {
		setEditCommentId(commentId);
		setEditText(commentText);
	};

	return (
		<div className="flex space-x-2">
			<BsPencil
				className="cursor-pointer text-gray-400 hover:text-gray-600"
				onClick={() => handleEdit(commentId)}
			/>
			<BsTrash
				className="cursor-pointer text-gray-400 hover:text-gray-600"
				onClick={() => handleDelete(commentId)}
			/>
		</div>
	);
}
