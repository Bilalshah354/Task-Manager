import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaMoon, FaSun, FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/ThemeSlice";
import { AuthContext } from "./authContext";

const Navbar = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav
      className={`${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      } p-4 fixed w-full top-0 z-10 shadow-md flex justify-between items-center`}
    >
      <Link
        to="/"
        className={`text-2xl font-bold ${
          darkMode ? "text-blue-400" : "text-blue-600"
        }`}
      >
        DevSync
      </Link>

      <div className="flex items-center space-x-4">
        <div className="cursor-pointer" onClick={() => dispatch(toggleTheme())}>
          {darkMode ? (
            <FaSun size={24} className="text-yellow-400" />
          ) : (
            <FaMoon size={24} className="text-gray-800" />
          )}
        </div>

        <div className="relative">
          <div
            className="cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <FaUserCircle
              size={28}
              className={`${
                darkMode ? "text-gray-300" : "text-gray-700"
              } transition-colors duration-300`}
            />
          </div>

          {dropdownOpen && (
            <div
              className={`absolute right-0 mt-2 w-40 rounded-lg shadow-lg transition-all ${
                darkMode ? "bg-gray-800 text-white" : "bg-white text-black-900"
              }`}
            >
              <ul className="flex flex-col">
                <li>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 transition-all"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Profile
                  </Link>
                </li>
                {user ? (
                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 transition-all"
                    >
                      Logout
                    </button>
                  </li>
                ) : (
                  <li>
                    <Link
                      to="/login"
                      className="block px-4 py-2 transition-all"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Login
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
