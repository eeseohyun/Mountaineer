import { addDoc, Timestamp, collection, doc, getDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../firebase.config";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../componenets/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const categories = [
	"전체",
	"서울",
	"경기",
	"강원",
	"충청",
	"전라",
	"경상",
	"제주",
];
export default function Post() {
	const { currentUser } = useContext(AuthContext);
	const [category, setCategory] = useState("");
	const [title, setTitle] = useState("");
	const [participantsNum, setParticipantsNum] = useState(0);
	const [schedule, setSchedule] = useState("");
	const [context, setContext] = useState("");
	const [imgUpload, setImgUpload] = useState(null);
	const navigate = useNavigate();

	const postData = {
		createdDate: Timestamp.fromDate(new Date()),
		title: title,
		participantsNum: participantsNum,
		schedule: schedule,
		context: context,
		category: category,
		profileImg: currentUser.photoURL,
		userNickname: currentUser.displayName,
	};
	const handlePost = async (e) => {
		e.preventDefault();
		try {
			if (imgUpload) {
				// 이미지를 storage에 업로드
				const imageRef = ref(
					storage,
					`${currentUser.uid}/${new Date().getTime()}`
				);
				await uploadBytes(imageRef, imgUpload);

				//업로드된 이미지의 URl을 가져와 Firestore에 저장
				const imgUrl = await getDownloadURL(imageRef);
				const userRef = await addDoc(collection(db, "club"), {
					...postData,
					img: imgUrl,
				});

				alert("게시물을 업로드하였습니다!");
				navigate("/club");
				console.log(userRef);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="bg-stone-50 min-h-screen md:px-20 pt-6">
			<div className=" bg-white rounded-md px-6 py-10 max-w-3xl mx-auto">
				<form className="space-y-4" onSubmit={handlePost}>
					<div className="space-x-2">
						<label>카테고리</label>
						<select
							onChange={(e) => {
								setCategory(e.target.value);
							}}
							id="region"
							name="region"
							className="ml-2"
							required
						>
							{categories.map((category) => (
								<option key={category}>{category}</option>
							))}
						</select>
					</div>
					<div className="space-x-2">
						<label>제목</label>
						<input
							onChange={(e) => {
								setTitle(e.target.value);
							}}
							type="text"
							className="title w-2/3 outline-none py-1 px-2 text-sm border-2 rounded-md"
							placeholder="산행지를 입력해주세요."
							required
						/>
					</div>
					<div className="space-x-2">
						<label>참가인원</label>
						<input
							onChange={(e) => {
								setParticipantsNum(Number(e.target.value));
							}}
							type="number"
							className="participantsNum"
							required
						/>
					</div>
					<div className="space-x-2">
						<label>일정</label>
						<input
							onChange={(e) => {
								setSchedule(e.target.value);
							}}
							type="date"
							className="schedule"
							required
						/>
					</div>
					<div>
						<label className="block mb-2">내용</label>
						<textarea
							onChange={(e) => {
								setContext(e.target.value);
							}}
							required
							rows="20"
							className="context w-full text-gray-600 border-2 outline-none rounded-md p-2"
							placeholder="산행코스, 산행시간, 출발시간 등 산행일정에 대한 자세한 내용을 입력해주세요."
						></textarea>
					</div>
					<div className="space-x-2">
						<label>첨부파일</label>
						<input
							onChange={(e) => {
								setImgUpload(e.target.files[0]);
							}}
							type="file"
							className="img"
						/>
					</div>
					<div className="flex justify-end space-x-2">
						<Link to="/club">
							<button className="rounded-md bg-red-400 text-white py-2 px-4">
								취소
							</button>
						</Link>
						<button className="rounded-md bg-blue-500 text-white py-2 px-4">
							등록
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
