import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext";
// componenets
import Home from "./pages/Home";
import Login from "./pages/Login";
import Join from "./pages/Join";
import Nav from "./components/Nav";
import Profile from "./pages/Profile";
import Participated from "./components/Participated";
import Post from "./pages/Post";
import ClubPage from "./pages/ClubPage";
import Detail from "./pages/Detail";
import MyPosts from "./pages/MyPosts";
import MyClubs from "./pages/MyClubs";
import Footer from "./components/Footer";
import Search from "./pages/Search";
import "./App.css";

const App = () => {
	return (
		<div>
			<Nav />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/join" element={<Join />} />
				<Route path="/mypage/profile" element={<Profile />} />
				<Route path="/mypage/participated" element={<Participated />} />
				<Route path="/search" element={<Search />} />
				<Route path="/club" element={<ClubPage />} />
				<Route path="/post" element={<Post />} />
				<Route path="/club/:postId" element={<Detail />} />
				<Route path="/mypage/myposts" element={<MyPosts />} />
				<Route path="/mypage/myclubs" element={<MyClubs />} />
			</Routes>
			<Footer />
		</div>
	);
};

export default App;
