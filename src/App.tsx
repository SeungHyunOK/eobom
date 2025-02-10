import { Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home/Home";
import NotFound from "./components/pages/NotFound/NotFound";
import About from "./components/pages/About/About";
import Header from "./components/common/Header";
import "./global.css";

function App() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-100">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/notFound" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
