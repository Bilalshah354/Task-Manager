import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projects: [],
};

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    addProject: (state, action) => {
      const newProject = {
        id: Date.now(), 
        name: action.payload.name,
      };
      state.projects.push(newProject);
    },
    editProject: (state, action) => {
      const { id, name } = action.payload;
      const project = state.projects.find((proj) => proj.id === id);
      if (project) {
        project.name = name;
      }
    },
    deleteProject: (state, action) => {
      state.projects = state.projects.filter((proj) => proj.id !== action.payload);
    },
  },
});

export const { addProject, editProject, deleteProject } = projectSlice.actions;
export default projectSlice.reducer;
