import { FiSettings } from "react-icons/fi";

export default function Prepare() {
	return (
		<div className="min-h-screen p-20 flex-col items-center justify-center">
			<div className="flex justify-center items-center mb-10 animate-spin-slow">
				<FiSettings className=" h-1/4 w-1/4" />
			</div>
			<h1 className="flex justify-center font-bold text-4xl">
				페이지 <p className="text-blue-500 ml-2 mr-2">준비중</p>입니다.
			</h1>
		</div>
	);
}
