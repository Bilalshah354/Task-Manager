import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const ProjectBoard = () => {
  const { id } = useParams();

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem(`tasks-${id}`);
    return savedTasks
      ? JSON.parse(savedTasks)
      : { todo: [], inProgress: [], done: [] };
  });

  const [showForm, setShowForm] = useState(false);
  const [taskData, setTaskData] = useState({
    name: "",                   
    detail: "",
    dueDate: "",
    status: "todo",
  });

  useEffect(() => {
    localStorage.setItem(`tasks-${id}`, JSON.stringify(tasks));
  }, [tasks, id]);

  const handleInputChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const addTask = () => {
    if (taskData.name.trim() === "" || taskData.detail.trim() === "") return;

    const newTask = { id: Date.now().toString(), ...taskData };

    setTasks((prev) => {
      const updatedTasks = {
        ...prev,
        [taskData.status]: [...prev[taskData.status], newTask],
      };
      localStorage.setItem(`tasks-${id}`, JSON.stringify(updatedTasks));
      return updatedTasks;
    });

    setTaskData({ name: "", detail: "", dueDate: "", status: "todo" });
    setShowForm(false);
  };

  const deleteTask = (taskId, category) => {
    setTasks((prev) => {
      const updatedTasks = {
        ...prev,
        [category]: prev[category].filter((task) => task.id !== taskId),
      };
      localStorage.setItem(`tasks-${id}`, JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
  
    const { source, destination } = result;
    const sourceColumn = source.droppableId;
    const destinationColumn = destination.droppableId;
  
    setTasks((prev) => {
      const updatedTasks = { ...prev };
  
      if (sourceColumn === destinationColumn) {
   
        const reorderedTasks = Array.from(updatedTasks[sourceColumn]);
        const [movedTask] = reorderedTasks.splice(source.index, 1);
        reorderedTasks.splice(destination.index, 0, movedTask);
        updatedTasks[sourceColumn] = reorderedTasks;
      } else {
   
        const sourceTasks = Array.from(updatedTasks[sourceColumn]);
        const destinationTasks = Array.from(updatedTasks[destinationColumn]);
        const [movedTask] = sourceTasks.splice(source.index, 1);
        movedTask.status = destinationColumn;
        destinationTasks.splice(destination.index, 0, movedTask);
        updatedTasks[sourceColumn] = sourceTasks;
        updatedTasks[destinationColumn] = destinationTasks;
      }
  
      localStorage.setItem(`tasks-${id}`, JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  };

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Project Tasks
        </h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 md:px-5 md:py-2 rounded-lg text-sm md:text-lg"
        >
          + Add Task
        </button>
      </div>

      <p className="text-gray-600 text-sm md:text-lg mb-4">Project ID: {id}</p>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {["todo", "inProgress", "done"].map((category) => (
            <Droppable key={category} droppableId={category}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-white p-4 shadow-lg rounded-lg min-h-[300px] overflow-visible"
                >
                  <h2 className="text-lg md:text-xl font-semibold text-gray-700 mb-3">
                    {category === "todo"
                      ? "To Do"
                      : category === "inProgress"
                      ? "In Progress"
                      : "Done"}
                  </h2>

                  <ul className="space-y-3">
                    {tasks[category].map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-gray-100 p-3 rounded-lg flex justify-between items-center"
                          >
                            <div>
                              <span className="text-gray-800 font-semibold">
                                {task.name}
                              </span>
                              <p className="text-sm text-gray-600">
                                {task.detail}
                              </p>
                              <p className="text-sm text-gray-500">
                                Due: {task.dueDate || "N/A"}
                              </p>
                            </div>

                            <button
                              onClick={() => deleteTask(task.id, category)}
                              className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md"
                            >
                              ✕
                            </button>
                          </li>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </ul>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Add New Task</h2>

            <input
              type="text"
              name="name"
              value={taskData.name}
              onChange={handleInputChange}
              className="w-full border p-2 rounded mt-1"
              placeholder="Task Name"
              required
            />
            <textarea
              name="detail"
              value={taskData.detail}
              onChange={handleInputChange}
              className="w-full border p-2 rounded mt-1"
              placeholder="Task Detail"
              required
            ></textarea>
            <input
              type="date"
              name="dueDate"
              value={taskData.dueDate}
              onChange={handleInputChange}
              className="w-full border p-2 rounded mt-1"
            />
            <select
              name="status"
              value={taskData.status}
              onChange={handleInputChange}
              className="w-full border p-2 rounded mt-1"
            >
              <option value="todo">To Do</option>
              <option value="inProgress">In Progress</option>
              <option value="done">Done</option>
            </select>

            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setShowForm(false)}
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={addTask}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectBoard;
