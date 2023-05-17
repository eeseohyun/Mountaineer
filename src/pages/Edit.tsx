import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../components/AuthContext";
import { Link, useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc, Timestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase.config";
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
export default function Edit() {
	const { currentUser } = useContext(AuthContext);
	const [editCategory, setEditCategory] = useState("");
	const [editTitle, setEditTitle] = useState("");
	const [editContext, setEditContext] = useState("");
	const [preDetail, setPreDetail] = useState({});
	const [editParticipantsNum, setEditParticipantsNum] = useState(0);
	const [editSchedule, setEditSchedule] = useState("");
	const [editImgUpload, setEditImgUpload] = useState(null);
	const { postId } = useParams();
	const navigate = useNavigate();

	const editData = {
		createdDate: Timestamp.fromDate(new Date()),
		title: editTitle,
		participantsNum: editParticipantsNum,
		schedule: editSchedule,
		context: editContext,
		category: editCategory,
		profileImg: currentUser?.photoURL,
		userNickname: currentUser?.displayName,
		userId: currentUser?.uid,
	};
	useEffect(() => {
		const fetchPreDetail = async () => {
			try {
				const docRef = doc(db, "club", postId);
				const docSnapshot = await getDoc(docRef);
				if (docSnapshot.exists()) {
					const preData = docSnapshot.data();
					setPreDetail(preData);
					setEditCategory(preData.category);
					setEditTitle(preData.title);
					setEditParticipantsNum(preData.participantsNum);
					setEditSchedule(preData.schedule);
					setEditContext(preData.context);
				}
			} catch (error) {
				console.log(error);
			}
		};
		fetchPreDetail();
	}, [postId]);

	const handleUpdate = async (e) => {
		e.preventDefault();
		try {
			if (editImgUpload) {
				// 이미지를 storage에 업로드
				const imageRef = ref(
					storage,
					`${currentUser.uid}/${new Date().getTime()}`
				);
				await uploadBytes(imageRef, editImgUpload);

				//업로드된 이미지의 URl을 가져와 Firestore에 저장
				const imgUrl = await getDownloadURL(imageRef);
				const userRef = await updateDoc(doc(db, "club", postId), {
					...editData,
					img: imgUrl,
				});

				alert("게시물을 수정하였습니다!");
				navigate(`/club/${postId}`);
				console.log(userRef);
			} else {
				await updateDoc(doc(db, "club", postId), {
					...editData,
				});
				alert("게시물을 수정하였습니다!");
				navigate(`/club/${postId}`);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="bg-stone-50 min-h-screen md:px-20 pt-6">
			<div className=" bg-white rounded-md px-6 py-10 max-w-3xl mx-auto">
				<form className="space-y-4">
					<div className="space-x-2">
						<label>카테고리</label>
						<select
							value={editCategory}
							onChange={(e) => {
								setEditCategory(e.target.value);
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
							value={editTitle}
							onChange={(e) => {
								setEditTitle(e.target.value);
							}}
							type="text"
							className="title w-2/3 outline-none py-1 px-2 text-sm border-2 rounded-md"
							required
						/>
					</div>
					<div className="space-x-2">
						<label>참가인원</label>
						<input
							value={editParticipantsNum}
							onChange={(e) => {
								setEditParticipantsNum(Number(e.target.value));
							}}
							type="number"
							className="participantsNum"
							required
						/>
					</div>
					<div className="space-x-2">
						<label>일정</label>
						<input
							value={editSchedule}
							onChange={(e) => {
								setEditSchedule(e.target.value);
							}}
							type="date"
							className="schedule"
							required
						/>
					</div>
					<div>
						<label className="block mb-2">내용</label>
						<textarea
							value={editContext}
							onChange={(e) => {
								setEditContext(e.target.value);
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
								setEditImgUpload(e.target.files[0]);
							}}
							type="file"
							className="img"
						/>
					</div>
					<div className="flex justify-end space-x-2">
						<Link to={`/club/${postId}`}>
							<button className="rounded-md bg-red-400 text-white py-2 px-4">
								취소
							</button>
						</Link>
						<button
							onClick={handleUpdate}
							className="rounded-md bg-blue-500 text-white py-2 px-4"
						>
							수정
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
