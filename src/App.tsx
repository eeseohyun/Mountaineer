import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext";
// componenets
import Footer from "./components/Footer";
import Nav from "./components/Nav";

//Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Join from "./pages/Join";
import Profile from "./pages/Profile";
import Post from "./pages/Post";
import ClubPage from "./pages/ClubPage";
import Detail from "./pages/Detail";
import MyPosts from "./pages/MyPosts";
import MyClubs from "./pages/MyClubs";
import Search from "./pages/Search";
import FreeBoard from "./pages/FreeBoard";
import Edit from "./pages/Edit";
import InfoPage from "./pages/InfoPage";
import "./App.css";

const App = () => {
	return (
		<>
			<Nav />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/join" element={<Join />} />
				<Route path="/mypage/profile" element={<Profile />} />
				<Route path="/search" element={<Search />} />
				<Route path="/club" element={<ClubPage />} />
				<Route path="/post" element={<Post />} />
				<Route path="/club/:postId" element={<Detail />} />
				<Route path="/mypage/myposts" element={<MyPosts />} />
				<Route path="/mypage/myclubs" element={<MyClubs />} />
				<Route path="/board/freeboard" element={<FreeBoard />} />
				<Route path="/club/:postId/edit" element={<Edit />} />
				<Route path="/info" element={<InfoPage />} />
			</Routes>
			<Footer />
		</>
	);
};

export default App;
