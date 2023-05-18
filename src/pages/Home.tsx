import Carousels from "../components/Carousels";
import CurrentPosts from "../components/CurrentPosts";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../components/AuthContext";
import { db } from "../firebase.config";
import {
	collection,
	query,
	where,
	getDocs,
	orderBy,
	limit,
} from "firebase/firestore";
import PopularPosts from "../components/PopularPosts";

interface PostData {
	id: string;
	category: string;
	context: string;
	createdDate: Date;
	img: string;
	participantsNum: number;
	profileImg: number;
	schedule: string;
	title: string;
	userId: string;
	userNickname: string;
}
export default function Home() {
	const [currentPosts, setCurrentPosts] = useState<PostData[]>([]);
	const [popoularPosts, setPopularPosts] = useState<PostData[]>([]);
	const authContext = useContext(AuthContext);
	const currentUser = authContext?.currentUser;

	useEffect(() => {
		const fetchCurrentPosts = async () => {
			const board = collection(db, "club");
			let querySnapshot;
			querySnapshot = await getDocs(
				query(board, orderBy("createdDate", "desc"), limit(4))
			);
			const posts = querySnapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			})) as PostData[];
			setCurrentPosts(posts);
		};
		fetchCurrentPosts();
	}, [currentUser]);

	useEffect(() => {
		const fetchPopularPosts = async () => {
			const board = collection(db, "club");
			let querySnapshot;
			querySnapshot = await getDocs(
				query(
					board,
					where(
						"isParticipationed.length",
						">=",
						Math.floor("participantsNum" / 2)
					),
					limit(4)
				)
			);
			const posts = querySnapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			})) as PostData[];
			setPopularPosts(posts);
			console.log(popoularPosts);
		};
		fetchPopularPosts();
	}, [currentUser]);

	return (
		<div className="min-h-screen">
			<Carousels />
			<CurrentPosts currentPosts={currentPosts} />
			<PopularPosts popularPosts={popoularPosts} />
		</div>
	);
}
