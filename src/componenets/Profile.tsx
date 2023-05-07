// Profile.js
import { useContext, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { AuthContext } from "./AuthContext";
import { updateProfile } from "firebase/auth";
import { db } from "../firebase.config";
import { useNavigate } from "react-router-dom";

const Profile = () => {
	const { currentUser } = useContext(AuthContext);
	const [nickname, setNickname] = useState("");
	const [profilePhoto, setProfilePhoto] = useState("");
	const navigate = useNavigate();

	const handleProfileUpdate = async (e) => {
		e.preventDefault();
		try {
			await updateProfile(currentUser, {
				displayName: nickname,
				photoURL: profilePhoto,
			});

			const userRef = doc(db, "users", currentUser.uid);
			await setDoc(userRef, {
				displayName: nickname,
				photoURL: profilePhoto,
			});
			alert("수정이 완료되었습니다!");
			navigate("/mypage");
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className="max-w-2xl mx-auto">
			<div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm p-4 sm:p-6 lg:p-8  dark:bg-gray-800 dark:border-gray-700">
				{currentUser ? (
					<form className="space-y-6" onSubmit={handleProfileUpdate}>
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
								placeholder="변경할 닉네임"
								value={nickname}
								onChange={(e) => {
									setNickname(e.target.value);
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
								value={profilePhoto}
								onChange={(e) => setProfilePhoto(e.target.value)}
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
