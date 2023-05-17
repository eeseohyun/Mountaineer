import { useEffect, useState, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { Link } from "react-router-dom";
import { db } from "../firebase.config";
import { AuthContext } from "../components/AuthContext";

interface PostData {
	id: string;
	title: string;
	userNickname: string;
	profileImg: string;
}
export default function Search() {
	const [searchParams] = useSearchParams();
	const [postResults, setPostResults] = useState<PostData[]>([]);
	const { currentUser } = useContext(AuthContext);
	const searchParam = new URLSearchParams(searchParams);
	const searchTerm = searchParam.get("keyword");
	useEffect(() => {
		const fetchSearchResults = async () => {
			const titlePostsQuery = query(
				collection(db, "club"),
				where("title", ">=", searchTerm),
				where("title", "<=", searchTerm + "\uf8ff")
			);
			const nicknamePostsQuery = query(
				collection(db, "club"),
				where("userNickname", ">=", searchTerm),
				where("userNickname", "<=", searchTerm + "\uf8ff")
			);

			const titlePostDocs = await getDocs(titlePostsQuery);
			const nicknamePostDocs = await getDocs(nicknamePostsQuery);

			const mergedResults = [...titlePostDocs.docs, ...nicknamePostDocs.docs];
			//중복 게시물 제거
			const uniqueResults = Array.from(
				new Set(mergedResults.map((doc) => doc.id))
			).map((id) => {
				return mergedResults.find((doc) => doc.id === id);
			});
			setPostResults(
				uniqueResults.map((doc) => ({ id: doc.id, ...doc.data() } as PostData))
			);
		};
		if (searchParam) {
			fetchSearchResults();
		}
	}, [searchParams]);
	return (
		<div className="min-h-screen">
			<div className="flex justify-center mt-9 border-b-2">
				<h1 className="flex text-xl font-bold ">
					<p className="text-neutral-500 mr-2 mb-5">"{searchTerm}" </p>검색 결과
					({postResults.length})
				</h1>
			</div>
			<div className="w-full">
				{postResults.map((result) => (
					<Link to={currentUser ? `/club/${result.id}` : "/login"}>
						<div key={result.id} className="p-7 hover:bg-gray-50">
							<p className="font-semibold text-xl mb-2">{result.title}</p>
							<div className="flex items-center">
								<img
									src={result.profileImg}
									className="h-12 w-12 rounded-full mr-2"
								/>
								<p>{result.userNickname}</p>
							</div>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}
