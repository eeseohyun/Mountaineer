import { auth } from "../firebase.config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useContext, useState } from "react";
import { AuthContext } from "../componenets/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Join() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMsg, setErrorMsg] = useState("");
	const [confirmedPassword, setConfirmedPassword] = useState("");
	const { currentUser } = useContext(AuthContext);

	const navigate = useNavigate();
	const handleJoin = async (e) => {
		e.preventDefault();

		if (password !== confirmedPassword) {
			setErrorMsg("비밀번호가 일치하지 않습니다");
			return;
		}
		try {
			setErrorMsg("");
			const user = await createUserWithEmailAndPassword(auth, email, password);
			console.log(user);
			alert("회원가입이 완료되었습니다.");
			navigate("/login");
		} catch (error) {
			console.log(error);
			switch (error.code) {
				case "auth/weak-password":
					setErrorMsg("비밀번호는 6자리 이상이어야 합니다");
					break;
				case "auth/invalid-email":
					setErrorMsg("잘못된 이메일 형식입니다");
					break;
				case "auth/email-already-in-use":
					setErrorMsg("이미 가입되어 있는 계정입니다");
					break;
				default:
					setErrorMsg("회원가입 중 오류가 발생했습니다");
					break;
			}
		}
	};

	return (
		<div className="max-w-2xl mx-auto">
			<div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm p-4 sm:p-6 lg:p-8  dark:bg-gray-800 dark:border-gray-700">
				<form className="space-y-6" onSubmit={handleJoin}>
					<h1 className="text-2xl font-bold  text-gray-900 dark:text-white">
						회원가입
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
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						{errorMsg === "잘못된 이메일 형식입니다" && (
							<p className="text-red-500 text-xs">{errorMsg}</p>
						)}
					</div>

					<div>
						<label className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">
							비밀번호
						</label>
						<input
							className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
							placeholder="비밀번호(영문, 숫자 포함 6자 이상)"
							type="password"
							required
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						{errorMsg === "비밀번호는 6자리 이상이어야 합니다" && (
							<p className="text-red-500 text-xs">{errorMsg}</p>
						)}
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
						{errorMsg === "비밀번호가 일치하지 않습니다" ||
							(errorMsg === "이미 가입되어 있는 계정입니다" && (
								<p className="text-red-500 text-xs">{errorMsg}</p>
							))}
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
	);
}
