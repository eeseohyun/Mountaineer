import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../components/AuthContext";
import { Timestamp } from "firebase/firestore";
import Empty from "./Empty";

interface PopularPostsProps {
	popularPost?: Post[];
}
interface Post {
	id: number;
	img: string;
	title: string;
	createdDate: Timestamp;
}

export default function PopularPosts({ popularPosts }: PopularPostsProps) {
	const authContext = useContext(AuthContext);
	const currentUser = authContext?.currentUser;
	return (
		<section className="bg-white dark:bg-gray-900">
			<div className="container px-5 py-9 mx-auto">
				<h1 className="flex text-3xl font-bold text-gray-800 capitalize lg:text-3xl dark:text-white">
					인기 게시물
					<p className="ml-1 p-1 flex justify-center items-center rounded-full w-9 font-mono text-sm text-red-600 bg-rose-200">
						🔥
					</p>
				</h1>
				<div className="grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2">
					{popularPosts.length !== 0 ? (
						popularPosts.map((post) => (
							<div key={post.id} className="lg:flex">
								<img
									className="object-cover w-full h-56 rounded-lg lg:w-64"
									src={post.img}
									alt="mountain"
								/>
								<div className="flex flex-col justify-between py-5 lg:mx-6 ml-1">
									<Link
										to={currentUser ? `/club/${post.id}` : "/login"}
										className="text-xl font-semibold text-gray-800 hover:underline dark:text-white"
									>
										{post.title}
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
	);
}
