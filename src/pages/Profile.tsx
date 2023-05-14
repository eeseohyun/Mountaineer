import { useContext, useState } from "react";
import { AuthContext } from "../components/AuthContext";
import { updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { storage, db } from "../firebase.config";

const Profile = () => {
	const { currentUser } = useContext(AuthContext);
	const [newNickname, setNewNickname] = useState("");
	const [newPhotoURL, setNewPhotoURL] = useState("");
	const [newPhotoFile, setNewPhotoFile] = useState(null);
	const navigate = useNavigate();

	const handleUpdate = async (e) => {
		e.preventDefault();
		const newUserInfo = {
			displayName: newNickname || currentUser.displayName,
			photoURL: currentUser.photoURL,
			email: currentUser.email,
		};
		//유저 프로필 사진 storage에 저장하고 다운로드 url 가져오기
		if (newPhotoFile) {
			const photoRef = ref(storage, `users/${currentUser.uid}/profileImg.jpg`);
			await uploadBytes(photoRef, newPhotoFile);
			const photoUrl = await getDownloadURL(photoRef);
			newUserInfo.photoURL = photoUrl;
		}
		try {
			await updateProfile(currentUser, newUserInfo);
			await addDoc(collection(db, "users"), {
				...newUserInfo,
			});
			alert("수정이 완료되었습니다.");
			navigate("/mypage");
		} catch (error) {
			console.log(error.code);
		}
	};

	return (
		<div className="max-w-2xl mx-auto">
			<div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm p-4 sm:p-6 lg:p-8  dark:bg-gray-800 dark:border-gray-700">
				{currentUser ? (
					<form className="space-y-6" onSubmit={handleUpdate}>
						<h1 className="text-2xl font-bold  text-gray-900 dark:text-white">
							프로필 수정
						</h1>
						<div>
							<label className="email text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">
								닉네임
							</label>
							<input
								className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
								type="text"
								placeholder={
									currentUser.displayName !== null
										? currentUser.displayName
										: "새로 변경할 닉네임"
								}
								value={currentUser.displayName}
								onChange={(e) => {
									if (e.target.value !== null) {
										setNewNickname(currentUser.displayName);
									} else {
										setNewNickname(e.target.value);
									}
								}}
							/>
						</div>
						<div>
							<label className="email text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">
								이메일
							</label>
							<input
								className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
								type="email"
								value={currentUser.email}
								readOnly
							/>
						</div>
						<div>
							<label className="email text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">
								프로필 사진
							</label>
							<input
								type="file"
								onChange={(e) => setNewPhotoFile(e.target.files[0])}
							/>
						</div>
						<button
							className="w-full border flex justify-center gap-2 border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150  font-medium text-sm px-5 py-2.5 text-center"
							type="submit"
						>
							수정완료
						</button>
					</form>
				) : (
					<p>Loading</p>
				)}
			</div>
		</div>
	);
};

export default Profile;