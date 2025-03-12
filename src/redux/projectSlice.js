import { createSlice } from "@reduxjs/toolkit";

const loadProjects = () => {
  const data = localStorage.getItem("projects");
  return data ? JSON.parse(data) : [];
};

const projectSlice = createSlice({
  name: "projects",
  initialState: {
    projects: loadProjects(),
  },
  reducers: {
    addProject: (state, action) => {
      const newProject = { id: Date.now(), ...action.payload };
      state.projects.push(newProject);
      localStorage.setItem("projects", JSON.stringify(state.projects));
    },
    editProject: (state, action) => {
      const { id, name } = action.payload;
      const project = state.projects.find((p) => p.id === id);
      if (project) {
        project.name = name;
      }
      localStorage.setItem("projects", JSON.stringify(state.projects));
    },
    deleteProject: (state, action) => {
      state.projects = state.projects.filter((p) => p.id !== action.payload);
      localStorage.setItem("projects", JSON.stringify(state.projects));
    },
  },
});

export const { addProject, editProject, deleteProject } = projectSlice.actions;
export default projectSlice.reducer;
