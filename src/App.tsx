import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./componenets/AuthContext";
// componenets
import Home from "./pages/Home";
import Login from "./pages/Login";
import Join from "./pages/Join";
import Nav from "./componenets/Nav";
import Mypage from "./pages/Mypage";
import Profile from "./componenets/Profile";
import Participated from "./componenets/Participated";
import Posted from "./componenets/Posted";
import Post from "./pages/Post";
import ClubPage from "./pages/ClubPage";
import Detail from "./pages/Detail";
import "./App.css";

const App = () => {
	return (
		<>
			<Nav />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/join" element={<Join />} />
				<Route path="/mypage" element={<Mypage />} />
				<Route path="/mypage/profile" element={<Profile />} />
				<Route path="/mypage/posted" element={<Posted />} />
				<Route path="/mypage/participated" element={<Participated />} />
				<Route path="/club" element={<ClubPage />} />
				<Route path="/post" element={<Post />} />
				<Route path="/club:id" element={<Detail />} />
			</Routes>
		</>
	);
};

export default App;
