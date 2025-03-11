import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./ThemeSlice";
import projectReducer from "./projectSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    projects: projectReducer,
  },
});
