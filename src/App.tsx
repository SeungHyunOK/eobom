import "./global.css";
// import Signup from "./pages/Signup/Signup";
import CenterSignup from "./pages/Signup/Center/CenterSignup";
import AddSenior from "./pages/Signup/Center/AddSenior";
import AddJob from "./pages/Signup/Center/AddJob";
import JobDetail from "./pages/Signup/Center/JobDetail";
import Matching from "./pages/Signup/Center/Matching";
import Home from "./pages/Signup/Center/Home";
import SeniorManagement from "./pages/Signup/Center/SeniorManagement";
import ChatList from "./pages/Signup/Center/ChatList";
import Chat from "./pages/Signup/Center/Chat";
import MyPage from "./pages/Signup/Center/MyPage";
import Menu from "./pages/Signup/Center/Menu";
import Login from "./pages/Signup/Center/Login";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup/center" element={<CenterSignup />} />
        <Route path="/jobs/add" element={<AddJob />} />
        <Route path="/jobs/detail" element={<JobDetail />} />
        <Route path="/matching" element={<Matching />} />
        <Route path="/seniors" element={<SeniorManagement />} />
        <Route path="/seniors/add" element={<AddSenior />} />
        <Route path="/chats" element={<ChatList />} />
        <Route path="/chats/detail" element={<Chat />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/Menu" element={<Menu />} />
      </Routes>
    </>
  );
}

export default App;
