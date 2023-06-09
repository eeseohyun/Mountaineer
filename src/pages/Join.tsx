import { auth, db } from "../firebase.config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { FormEvent, useContext, useState } from "react";
import { AuthContext } from "../components/AuthContext";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { join } from "path";

export default function Join() {
	const [nickname, setNickname] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMsg, setErrorMsg] = useState("");
	const [confirmedPassword, setConfirmedPassword] = useState("");
	const authContext = useContext(AuthContext);
	const currentUser = authContext?.currentUser;
	const navigate = useNavigate();

	//닉네임 중복 검사
	const checkNicknameDuplicate = async (nickname: string) => {
		try {
			const q = query(
				collection(db, "users"),
				where("displayName", "==", nickname)
			);
			const querySnapshot = await getDocs(q);
			return querySnapshot.docs.length > 0;
		} catch (error) {
			console.log(error);
			return false;
		}
	};
	const handleJoin = async (e: FormEvent) => {
		e.preventDefault();
		if (password !== confirmedPassword) {
			setErrorMsg("비밀번호가 일치하지 않습니다.");
			return;
		}
		if (!/^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{6,20}$/.test(password)) {
			setErrorMsg("최소 1개의 숫자 혹은 특수 문자를 포함하여 6자리 이상.");
			return;
		}
		const isNicknameDuplicated = await checkNicknameDuplicate(nickname);
		if (isNicknameDuplicated) {
			setErrorMsg("중복된 닉네임입니다.");
			return;
		}

		try {
			setErrorMsg("");
			const joinedUser = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			await updateProfile(joinedUser.user, {
				displayName: nickname,
				photoURL:
					"https://img.freepik.com/premium-vector/mountain-illustration-design_617585-1673.jpg",
			});

			alert("회원가입이 완료되었습니다.");
			navigate("/");
		} catch (error: any) {
			console.log(error);
			switch (error.code) {
				case "auth/weak-password":
					setErrorMsg("비밀번호는 6자리 이상이어야 합니다.");
					break;
				case "auth/invalid-email":
					setErrorMsg("잘못된 이메일 형식입니다.");
					break;
				case "auth/email-already-in-use":
					setErrorMsg("이미 가입되어 있는 계정입니다.");
					break;
				default:
					setErrorMsg("회원가입 중 오류가 발생했습니다.");
					break;
			}
		}
	};

	return (
		<div className="min-h-screen flex justify-center">
			<div className="mt-10 w-96">
				<div className="bg-white shadow-md border border-gray-200 rounded-lg w-full p-4 sm:p-6 lg:p-8  dark:bg-gray-800 dark:border-gray-700">
					<form className="space-y-6" onSubmit={handleJoin}>
						<h1 className="text-2xl font-bold  text-gray-900 dark:text-white">
							회원가입
						</h1>
						<div>
							<label className="email text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">
								닉네임
							</label>
							<input
								className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
								placeholder="닉네임 입력"
								type="text"
								required
								value={nickname}
								onChange={(e) => setNickname(e.target.value)}
							/>
							{errorMsg === "중복된 닉네임입니다." && (
								<p className="text-red-500 text-xs">{errorMsg}</p>
							)}
						</div>
						<div>
							<label className="email text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">
								이메일
							</label>
							<input
								className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
								placeholder="이메일 입력"
								type="email"
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
							{errorMsg === "잘못된 이메일 형식입니다." && (
								<p className="text-red-500 text-xs">{errorMsg}</p>
							)}
						</div>

						<div>
							<label className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">
								비밀번호
							</label>
							<input
								className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
								placeholder="비밀번호(영문, 숫자 혹은 특수기호 포함 6자 이상)"
								type="password"
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
							{errorMsg === "비밀번호는 6자리 이상이어야 합니다." ||
								(errorMsg ===
									"최소 1개의 숫자 혹은 특수 문자를 포함하여 6자리 이상." && (
									<p className="text-red-500 text-xs">{errorMsg}</p>
								))}
						</div>
						<div>
							<label className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">
								비밀번호 확인
							</label>
							<input
								className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
								placeholder="비밀번호 확인"
								type="password"
								required
								value={confirmedPassword}
								onChange={(e) => setConfirmedPassword(e.target.value)}
							/>
							{(errorMsg === "비밀번호가 일치하지 않습니다." ||
								errorMsg === "이미 가입되어 있는 계정입니다.") && (
								<p className="text-red-500 text-xs">{errorMsg}</p>
							)}
						</div>

						<button
							type="submit"
							className="w-full text-white bg-emerald-500 hover:bg-emerald-600 focus:ring-4 focus:ring-emerald-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
						>
							회원가입
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}
