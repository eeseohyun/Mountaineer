import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./componenets/AuthContext";
// componenets
import Home from "./pages/Home";
import Login from "./pages/Login";
import Join from "./pages/Join";
import Nav from "./componenets/Nav";
import Mypage from "./pages/Mypage";
import Profile from "./componenets/Profile";
import Club from "./pages/Club";
import Participated from "./componenets/Participated";
import Posted from "./componenets/Posted";
import Post from "./pages/Post";

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
				<Route path="/club" element={<Club />} />
				<Route path="/post" element={<Post />} />
			</Routes>
		</>
	);
};

export default App;
