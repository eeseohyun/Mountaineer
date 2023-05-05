import { Link } from "react-router-dom";

export default function MypageNav() {
	return (
		<div className="navbar flex items-center justify-evenly p-2 bg-teal-900">
			<Link to="/mypage/posted">
				<button className="text-white">작성한 글</button>
			</Link>
			<Link to="/mypage/participated">
				<button className="text-white">참여 산행</button>
			</Link>
			<Link to="/mypage/profile">
				<button className="text-white">프로필 수정</button>
			</Link>
		</div>
	);
}
