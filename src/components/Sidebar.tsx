import { Link } from "react-router-dom";
import { BsPeople } from "react-icons/bs";
import { TbPhoto } from "react-icons/tb";
import { ImInfo } from "react-icons/im";

export default function Sidebar({
	outSide,
	sidebarOutSideClick,
}: {
	outSide: boolean;
	sidebarOutSideClick: () => void;
}) {
	return (
		<div className="absolute top-20 left-0 min-h-full flex flex-row">
			<div className="flex flex-col w-56 bg-gray-800 rounded-r-3xl overflow-hidden">
				<div className="flex items-center justify-center h-20 shadow-md">
					<h1 className="text-2xl text-teal-400 font-bold">MENU</h1>
				</div>
				<ul className="flex flex-col py-4">
					<li>
						<a
							href="/club"
							className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-400 hover:text-teal-400"
						>
							<span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
								<BsPeople />
							</span>
							<span className="text-sm font-medium">산악회</span>
						</a>
					</li>
					<li>
						<a
							href="/freeboard"
							className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-400 hover:text-teal-400"
						>
							<span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
								<TbPhoto />
							</span>
							<span className="text-sm font-medium">자유게시판</span>
						</a>
					</li>
					<li>
						<a
							href="/info"
							className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-400 hover:text-teal-400"
						>
							<span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
								<ImInfo />
							</span>
							<span className="text-sm font-medium">정보게시판</span>
						</a>
					</li>
				</ul>
			</div>
		</div>
	);
}
