import { Link, useNavigate } from "react-router-dom";
import {
  HomeIcon,
  MagnifyingGlassIcon,
  BookmarkIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

function Sidebar() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const handleAuthAction = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const playlists = ["Liked Songs", "Daily Mix 1", "Discover Weekly"];

  return (
    <header className="w-full bg-secondary p-4 fixed top-0 left-0 flex items-center justify-between z-10">
      {/* Logo */}
      <div className="flex items-center space-x-4">
        <h1 className="text-2xl font-bold text-white">MyMusicStreamer</h1>
      </div>

      {/* Navigation */}
      <nav className="flex items-center space-x-6">
        <Link
          to="/"
          className="flex items-center space-x-3 text-light hover:text-white"
        >
          <HomeIcon className="w-6 h-6" />
          <span>Home</span>
        </Link>
        <Link
          to="/search"
          className="flex items-center space-x-3 text-light hover:text-white"
        >
          <MagnifyingGlassIcon className="w-6 h-6" />
          <span>Search</span>
        </Link>
        <Link
          to="/library"
          className="flex items-center space-x-3 text-light hover:text-white"
        >
          <BookmarkIcon className="w-6 h-6" />
          <span>Your Library</span>
        </Link>
      </nav>

      {/* Authentication Button */}
      <button
        onClick={handleAuthAction}
        className="flex items-center space-x-2 text-light hover:text-white"
      >
        <ArrowRightOnRectangleIcon className="w-6 h-6" />
        <span>{isLoggedIn ? "Logout" : "Login"}</span>
      </button>
    </header>
  );
}

export default Sidebar;
