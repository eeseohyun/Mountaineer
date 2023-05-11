import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext";
// componenets
import Home from "./pages/Home";
import Login from "./pages/Login";
import Join from "./pages/Join";
import Nav from "./components/Nav";
import Mypage from "./pages/Mypage";
import Profile from "./components/Profile";
import Participated from "./components/Participated";
import Post from "./pages/Post";
import ClubPage from "./pages/ClubPage";
import Detail from "./pages/Detail";
import Board from "./pages/Board";
import "./App.css";
import ProfileModal from "./components/ProfileModal";
import Comments from "./components/Comments";

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
				<Route path="/mypage/participated" element={<Participated />} />
				<Route path="/club" element={<ClubPage />} />
				<Route path="/post" element={<Post />} />
				<Route path="/club/:postId" element={<Detail />} />
				<Route path="/profile" element={<ProfileModal />} />
				<Route path="/board" element={<Board />} />
				<Route path="/clubcomments/:postId" element={<Comments />} />
			</Routes>
		</>
	);
};

export default App;
