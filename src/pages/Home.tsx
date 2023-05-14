import Carousels from "../components/Carousels";

export default function Home() {
	return (
		<div className="min-h-screen">
			<Carousels />
			<div className="flex p-7">
				<p>최근 올라온 게시물</p>
				<p>인기있는 산악회</p>
			</div>
		</div>
	);
}
