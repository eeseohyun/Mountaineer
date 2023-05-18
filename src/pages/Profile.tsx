import { FormEvent, useContext, useState } from "react";
import { AuthContext } from "../components/AuthContext";
import { updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc, collection } from "firebase/firestore";
import { storage, db } from "../firebase.config";

interface NewUserInfo {
	displayName: string | undefined;
	photoURL: string | undefined;
	email: string | undefined;
}

export default function Profile() {
	const authContext = useContext(AuthContext);
	const currentUser = authContext?.currentUser;
	const [newNickname, setNewNickname] = useState<string>("");
	const [newPhotoURL, setNewPhotoURL] = useState<string>("");
	const [newPhotoFile, setNewPhotoFile] = useState<File | null>(null);
	const navigate = useNavigate();

	const handleUpdate = async (e: FormEvent) => {
		e.preventDefault();
		const newUserInfo: NewUserInfo = {
			displayName: newNickname || currentUser?.displayName,
			photoURL: currentUser?.photoURL,
			email: currentUser?.email,
		};
		//유저 프로필 사진 storage에 저장하고 다운로드 url 가져오기
		if (newPhotoFile) {
			const photoRef = ref(storage, `users/${currentUser?.uid}/profileImg.jpg`);
			await uploadBytes(photoRef, newPhotoFile);
			const photoUrl = await getDownloadURL(photoRef);
			newUserInfo.photoURL = photoUrl;
		}
		try {
			const userRef = doc(collection(db, "users"), currentUser?.uid);
			await updateProfile(currentUser, newUserInfo);
			await setDoc(userRef, newUserInfo);
			alert("수정이 완료되었습니다.");
			navigate("/mypage/profile");
		} catch (error: any) {
			console.log(error.code);
		}
	};

	return (
		<div className="min-h-screen flex justify-center">
			<div className="mt-10 w-96">
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
									value={newNickname}
									onChange={(e) => {
										if (e.target.value !== null) {
											setNewNickname(e.target.value);
										} else {
											setNewNickname(currentUser?.displayName || "");
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
									value={currentUser?.email || ""}
									readOnly
								/>
							</div>
							<div>
								<label className="email text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">
									프로필 사진
								</label>
								<input
									type="file"
									onChange={(e) => setNewPhotoFile(e.target.files?.[0] || null)}
								/>
							</div>
							<div className="flex gap-1">
								<button
									onClick={() => {
										navigate("/");
									}}
									className="w-1/2 bg-rose-500 border flex justify-center gap-2 border-rose-500 rounded-lg text-stone-100 hover:border-rose-600 hover:text-stone-50 hover:shadow transition duration-150  font-medium text-sm px-5 py-2.5 text-center"
								>
									취소
								</button>
								<button
									className="w-1/2 border flex justify-center gap-2 border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150  font-medium text-sm px-5 py-2.5 text-center"
									type="submit"
								>
									수정완료
								</button>
							</div>
						</form>
					) : (
						<p>Loading...</p>
					)}
				</div>
			</div>
		</div>
	);
}
