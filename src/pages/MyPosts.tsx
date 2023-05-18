import { AuthContext } from "../components/AuthContext";
import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase.config";
import { collection, query, where, getDocs } from "firebase/firestore";
import { CiFileOff } from "react-icons/ci";
import Empty from "../components/Empty";

interface Post {
	id: string;
	img?: string;
	title: string;
	createdDate: {
		toDate: () => Date;
	};
}
export default function MyPosts() {
	const authContext = useContext(AuthContext);
	const currentUser = authContext?.currentUser;
	const [userPosts, setUserPosts] = useState<Post[]>([]);

	useEffect(() => {
		if (currentUser) {
			const fetchPosts = async () => {
				const board = collection(db, "club");
				let querySnapshot;
				querySnapshot = await getDocs(
					query(board, where("userId", "==", currentUser.uid))
				);
				const posts = querySnapshot.docs.map((doc) => {
					const data = doc.data();
					return { id: doc.id, ...doc.data() } as Post;
				});
				setUserPosts(posts);
			};
			fetchPosts();
		}
	}, [currentUser]);
	return (
		<div className="min-h-screen">
			<section className="bg-white dark:bg-gray-900">
				<div className="container px-6 py-10 mx-auto">
					<h1 className="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl dark:text-white">
						내가 쓴 글
					</h1>
					<div className="grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2">
						{userPosts.length !== 0 ? (
							userPosts.map((post) => (
								<div key={post.id} className="lg:flex">
									{post.img ? (
										<img
											className="object-cover w-full h-56 rounded-lg lg:w-64"
											src={post.img}
											alt="postImg"
										/>
									) : (
										<img
											className="object-cover w-full h-56 rounded-lg lg:w-64"
											src="https://baticrom.com/public/medies/noimage.jpg"
											alt="noImg"
										/>
									)}

									<div className="flex flex-col justify-end py-5 lg:mx-6 ml-1">
										<Link to={`/club/${post.id}`}>
											<span className="text-xl font-semibold text-gray-800 hover:underline dark:text-white">
												{post.title}
											</span>
										</Link>
										<span className="text-sm text-gray-500 dark:text-gray-300">
											{post.createdDate.toDate().toLocaleString()}
										</span>
									</div>
								</div>
							))
						) : (
							<Empty />
						)}
					</div>
				</div>
			</section>
		</div>
	);
}
