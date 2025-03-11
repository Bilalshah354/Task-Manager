// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   tasks: {
//     todo: [],
//     inProgress: [],
//     done: [],
//   },
// };

// const projectSlice = createSlice({
//   name: "projects",
//   initialState,
//   reducers: {
//     loadTasks: (state, action) => {
//       state.tasks = action.payload;
//     },
//     addTask: (state, action) => {
//       const { status } = action.payload;
//       state.tasks[status].push(action.payload);
//     },
//     moveTask: (state, action) => {
//       const { taskId, from, to } = action.payload;
//       const taskToMove = state.tasks[from].find((task) => task.id === taskId);
//       if (taskToMove) {
//         state.tasks[from] = state.tasks[from].filter((task) => task.id !== taskId);
//         state.tasks[to].push(taskToMove);
//       }
//     },
//     deleteTask: (state, action) => {
//       const { taskId, category } = action.payload;
//       state.tasks[category] = state.tasks[category].filter((task) => task.id !== taskId);
//     },
//   },
// });

// export const { loadTasks, addTask, moveTask, deleteTask } = projectSlice.actions;
// export default projectSlice.reducer;
