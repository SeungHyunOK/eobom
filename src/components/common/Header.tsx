import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex gap-4 p-4 bg-gray-100">
      <Link
        to="/"
        className="px-4 py-2 font-medium text-gray-700 border-2 border-black rounded-lg hover:text-white hover:bg-black"
      >
        홈
      </Link>
      <Link
        to="/about"
        className="px-4 py-2 font-medium text-gray-700 border-2 border-black rounded-lg hover:text-white hover:bg-black"
      >
        소개
      </Link>
      <Link
        to="/notFound"
        className="px-4 py-2 font-medium text-gray-700 border-2 border-black rounded-lg hover:text-white hover:bg-black"
      >
        NotFound
      </Link>
    </nav>
  );
};

export default Navbar;
