import { auth, db } from "../firebase.config";
import { doc, setDoc } from "firebase/firestore";
import { FormEvent, useState } from "react";
import {
	signInWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
	const [loginEmail, setLoginEmail] = useState("");
	const [loginPassword, setLoginPassword] = useState("");
	const [errMsg, setErrMsg] = useState("");
	const [isLogged, setIsLogged] = useState(false);
	const navigate = useNavigate();
	//login
	const handleLogin = async (e: FormEvent) => {
		e.preventDefault();
		try {
			await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
			navigate("/");
			setIsLogged(true);
		} catch (error: any) {
			console.error(error.code);
			switch (error.code) {
				case "auth/wrong-password":
					setErrMsg("이메일 혹은 비밀번호가 일치하지 않습니다");
				case "auth/user-not-found":
					setErrMsg("존재하는 계정이 없습니다.");
					break;
				default:
					setErrMsg("로그인 중 오류가 발생했습니다");
					break;
			}
		}
	};
	//google login
	const handleGoogleLogin = () => {
		const provider = new GoogleAuthProvider();
		signInWithPopup(auth, provider)
			.then((result) => {
				//google Token
				const credential = GoogleAuthProvider.credentialFromResult(result);
				const token = credential?.accessToken;
				const user = result.user;
				setDoc(doc(db, "users", user.uid), {
					displayName: user.displayName,
					email: user.email,
					photoURL: user.photoURL,
				});
				navigate("/");
			})

			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				const email = error.customData.email;
				const credential = GoogleAuthProvider.credentialFromError(error);
			});
	};
	return (
		<div className="min-h-screen flex justify-center">
			<div className="mt-10 w-96">
				<div className="bg-white shadow-md border border-gray-200 rounded-lg w-full p-4 sm:p-6 lg:p-8  dark:bg-gray-800 dark:border-gray-700">
					<form className="space-y-6" onSubmit={handleLogin}>
						<h1 className="text-2xl font-bold  text-gray-900 dark:text-white">
							로그인
						</h1>
						<div>
							<label className="email text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">
								이메일
							</label>
							<input
								className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
								placeholder="이메일 입력"
								type="email"
								required
								onChange={(e) => setLoginEmail(e.target.value)}
							/>
						</div>

						<div>
							<label className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">
								비밀번호
							</label>
							<input
								className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
								placeholder="비밀번호 입력"
								type="password"
								required
								onChange={(e) => setLoginPassword(e.target.value)}
							/>
						</div>

						<button
							onClick={handleLogin}
							type="submit"
							className="w-full text-white bg-emerald-500 hover:bg-emerald-600 focus:ring-4 focus:ring-emerald-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
						>
							로그인
						</button>
						<hr />
						<button
							onClick={handleGoogleLogin}
							className="w-full border flex justify-center gap-2 border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150  font-medium text-sm px-5 py-2.5 text-center"
						>
							<img
								className="w-6 h-6"
								src="https://www.svgrepo.com/show/475656/google-color.svg"
								loading="lazy"
								alt="google logo"
							/>
							<span>Login with Google</span>
						</button>
					</form>
					<div className="joinContainer flex justify-between mt-2 p-1">
						<span className="text-xs">아직 회원이 아니라면?</span>
						<span className="text-xs">
							<a href="/join" className="text-red-500 mr-1">
								회원가입
							</a>
							하러가기
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}
