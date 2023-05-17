import { BsPencil, BsTrash } from "react-icons/bs";

interface EditBtnProps {
	setEditCommentId: (id: string | null) => void;
	handleDelete: (id: string) => void;
	commentId: string;
	commentText: string;
	setEditText: (text: string) => void;
}
export default function EditBtn({
	setEditCommentId,
	handleDelete,
	commentId,
	commentText,
	setEditText,
}: EditBtnProps) {
	const handleEdit = () => {
		setEditCommentId(commentId);
		setEditText(commentText);
	};

	return (
		<div className="flex space-x-2">
			<BsPencil
				className="cursor-pointer text-gray-400 hover:text-gray-600"
				onClick={handleEdit}
			/>
			<BsTrash
				className="cursor-pointer text-gray-400 hover:text-gray-600"
				onClick={() => handleDelete(commentId)}
			/>
		</div>
	);
}
