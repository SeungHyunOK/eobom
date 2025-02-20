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
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import useAuth from "./apis/auth";
import Caregiver from "./pages/Signup/Caregiver/Caregiver";

function App() {
  const { getLoggedIn } = useAuth();

  const PrivateRoute = () => {
    return getLoggedIn() ? <Outlet /> : <Navigate replace to="/login" />;
  };

  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={getLoggedIn() ? <Navigate replace to="/" /> : <Login />}
        />
        <Route path="/signup/center" element={<CenterSignup />} />
        <Route path="/signup/caregiver" element={<Caregiver />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/seniors/:seniorId/jobs/add" element={<AddJob />} />
          <Route path="/jobs/:jobId" element={<JobDetail />} />
          <Route path="/matching" element={<Matching />} />
          <Route path="/seniors" element={<SeniorManagement />} />
          <Route path="/seniors/add" element={<AddSenior />} />
          <Route path="/chats" element={<ChatList />} />
          <Route path="/chats/detail" element={<Chat />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/menu" element={<Menu />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
