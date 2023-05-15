import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../components/AuthContext";

export default function currentPosts({ currentPosts }) {
	const { currentUser } = useContext(AuthContext);
	return (
		<section className="bg-white dark:bg-gray-900">
			<div className="container px-5 py-9 mx-auto">
				<h1 className="flex text-3xl font-bold text-gray-800 capitalize lg:text-3xl dark:text-white">
					최근 게시물
					<p className="ml-1 p-1 flex justify-center items-center rounded-full w-9 font-mono text-sm text-cyan-600 bg-sky-100">
						new
					</p>
				</h1>
				<div className="grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2">
					{currentPosts &&
						currentPosts.map((post) => (
							<div key={post.id} className="lg:flex shadow-lg p-2">
								<img
									className="object-cover w-full h-56 rounded-lg lg:w-64"
									src={post.img}
									alt="mountain"
								/>
								<div className="flex flex-col justify-between py-4 lg:mx-6 ml-3">
									<Link
										to={currentUser ? `/club/${post.id}` : "/login"}
										className="text-xl font-semibold text-gray-800 hover:underline dark:text-white"
									>
										{post.title}
									</Link>
									<span className="text-sm text-gray-500 dark:text-gray-300">
										{post.createdDate.toDate().toLocaleString()}
									</span>
									<div className="flex items-center">
										<img
											src={post.profileImg}
											alt="mountain"
											className="rounded-full h-10 w-10"
										/>
										<span className="ml-1 text-sm text-gray-600 dark:text-gray-300">
											{post.userNickname}
										</span>
									</div>
								</div>
							</div>
						))}
				</div>
			</div>
		</section>
	);
}
