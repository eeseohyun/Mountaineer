import { AuthContext } from "../components/AuthContext";
import { useState, useContext, useEffect } from "react";
import { db } from "../firebase.config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Link } from "react-router-dom";
import Empty from "../components/Empty";

interface Mountain {
	id: string;
	img?: string;
	title: string;
	schedule: string;
}
export default function MyClubs() {
	const { currentUser } = useContext(AuthContext);
	const [userMountains, setUserMountains] = useState<Mountain[]>([]);
	useEffect(() => {
		if (currentUser) {
			const fetchPosts = async () => {
				const board = collection(db, "club");
				let querySnapshot;
				querySnapshot = await getDocs(
					query(
						board,
						where("isParticipationed", "array-contains", currentUser.uid)
					)
				);
				const mountains = querySnapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				})) as Mountain[];
				setUserMountains(mountains);
			};
			fetchPosts();
		}
	}, [currentUser]);
	return (
		<div className="min-h-screen">
			<section className="bg-white dark:bg-gray-900">
				<div className="container px-6 py-10 mx-auto">
					<h1 className="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl dark:text-white">
						참여한 산악회
					</h1>
					<div className="grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2">
						{userMountains.length !== 0 ? (
							userMountains.map((mountain) => (
								<div key={mountain.id} className="lg:flex">
									{mountain.img ? (
										<img
											className="object-cover w-full h-56 rounded-lg lg:w-64"
											src={mountain.img}
											alt=""
										/>
									) : (
										<img
											className="object-cover w-full h-56 rounded-lg lg:w-64"
											src="https://baticrom.com/public/medies/noimage.jpg"
											alt="noImg"
										/>
									)}

									<div className="flex flex-col justify-between py-5 lg:mx-6 ml-1">
										<Link
											to={`/club/${mountain.id}`}
											className="text-xl font-semibold text-gray-800 hover:underline dark:text-white"
										>
											{mountain.title}
										</Link>
										<span className="text-sm text-gray-500 dark:text-gray-300">
											일정: {mountain.schedule}
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
