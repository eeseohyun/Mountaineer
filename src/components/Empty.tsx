import { CiFileOff } from "react-icons/ci";

export default function Empty() {
	return (
		<div className="flex items-center justify-center text-xl text-gray-400">
			<CiFileOff className="mr-2" />
			게시물이 존재하지 않습니다.
		</div>
	);
}
