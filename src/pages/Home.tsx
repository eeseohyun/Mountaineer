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

export default function Home() {
	const [currentPosts, setCurrentPosts] = useState([]);
	const [popoularPosts, setPopularPosts] = useState([]);
	const { currentUser } = useContext(AuthContext);
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
			}));
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
					orderBy("isParticipationed.length", "desc"),
					limit(4)
				)
			);
			const posts = querySnapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
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
