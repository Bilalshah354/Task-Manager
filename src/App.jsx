import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useContext } from "react";
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import Dashboard from "./pages/Dashboard";
import ProjectBoard from "./pages/ProjectBoard";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import { AuthContext } from "./Components/authContext";

function App() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return <div>Loading...</div>; // Agar context available nahi toh temporary loading show karo
  }

  const { user } = authContext;

  return (
    <BrowserRouter>
      {!user ? (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      ) : (
        <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"} flex flex-col min-h-screen`}>
          <Navbar />
          <div className="flex flex-1">
            <Sidebar />
            <div className="flex-1 p-6 mt-16">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/project/:id" element={<ProjectBoard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/login" element={<Navigate to="/" />} />
              </Routes>
            </div>
          </div>
        </div>
      )}
    </BrowserRouter>
  );
}

export default App;
