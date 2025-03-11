import { useDispatch, useSelector } from "react-redux";
import { addProject, editProject, deleteProject } from "../redux/projectSlice";
import { Link } from "react-router-dom";
import { useState } from "react";

const Dashboard = () => {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects.projects);
  const [projectName, setProjectName] = useState("");
  const [editMode, setEditMode] = useState(null);

  const handleAddProject = () => {
    if (projectName.trim() !== "") {
      dispatch(addProject({ name: projectName }));
      setProjectName("");
    }
  };

  const handleEditProject = (id, name) => {
    setEditMode(id);
    setProjectName(name);
  };

  const handleSaveEdit = (id) => {
    dispatch(editProject({ id, name: projectName }));
    setEditMode(null);
    setProjectName("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddProject();
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">Project Dashboard</h1>

      {/* Input Field and Button */}
      <div className="mb-4 flex flex-col md:flex-row gap-3">
        <input
          type="text"
          placeholder="Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          onKeyDown={handleKeyPress}
          className="border p-3 text-lg flex-grow rounded-md"
        />
        <button 
          onClick={handleAddProject} 
          className="bg-blue-500 text-white px-4 py-3 rounded-md hover:bg-blue-600 transition"
        >
          Add Project
        </button>
      </div>

      {/* Project List */}
      <ul className="space-y-3">
        {projects.map((project) => (
          <li 
            key={project.id} 
            className="border p-3 flex flex-col md:flex-row justify-between items-center rounded-md shadow-md bg-white"
          >
            {editMode === project.id ? (
              <div className="flex w-full gap-2">
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="border p-2 text-lg flex-grow rounded-md"
                />
                <button
                  onClick={() => handleSaveEdit(project.id)}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="w-full flex flex-col md:flex-row justify-between items-center">
                <Link to={`/project/${project.id}`} className="text-gray-900 text-lg font-semibold truncate">
                  {project.name}
                </Link>
                <div className="flex gap-2 mt-2 md:mt-0">
                  <button
                    onClick={() => handleEditProject(project.id, project.name)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => dispatch(deleteProject(project.id))}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
