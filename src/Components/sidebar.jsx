import { useState } from "react";
import { Link } from "react-router-dom";
import { FaTachometerAlt, FaTasks, FaUser, FaBars, FaTimes } from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`bg-gray-900 text-white p-5 transition-all duration-300 ${isOpen ? "w-64" : "w-16"} min-h-screen mt-16 relative`}>

      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-white p-2 focus:outline-none absolute top-5 right-5"
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      <ul className="mt-4 space-y-4">
        <li>
          <Link to="/" className="flex items-center p-3 hover:bg-gray-700 rounded-lg">
            <FaTachometerAlt className="mr-2" />
            {isOpen && "Dashboard"}
          </Link>
        </li>
        <li>
          <Link to="/project/1" className="flex items-center p-3 hover:bg-gray-700 rounded-lg">
            <FaTasks className="mr-2" />
            {isOpen && "Project Board"}
          </Link>
        </li>
        <li>
          <Link to="/profile" className="flex items-center p-3 hover:bg-gray-700 rounded-lg">
            <FaUser className="mr-2" />
            {isOpen && "Profile"}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;