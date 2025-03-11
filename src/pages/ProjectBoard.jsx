import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const ProjectBoard = () => {
  const { id } = useParams();

  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    done: [],
  });

  const [showForm, setShowForm] = useState(false);
  const [taskData, setTaskData] = useState({
    name: "",
    detail: "",
    dueDate: "",
    status: "todo",
  });

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem(`tasks-${id}`));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, [id]);

  useEffect(() => {
    localStorage.setItem(`tasks-${id}`, JSON.stringify(tasks));
  }, [tasks, id]);

  const handleInputChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const addTask = () => {
    if (taskData.name.trim() === "" || taskData.detail.trim() === "") return;

    const newTask = { id: Date.now(), ...taskData };

    setTasks((prev) => ({
      ...prev,
      [taskData.status]: [...prev[taskData.status], newTask],
    }));

    setTaskData({ name: "", detail: "", dueDate: "", status: "todo" });
    setShowForm(false);
  };

  const deleteTask = (taskId, category) => {
    setTasks((prev) => ({
      ...prev,
      [category]: prev[category].filter((task) => task.id !== taskId),
    }));
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const sourceColumn = source.droppableId;
    const destinationColumn = destination.droppableId;

    const movedTask = tasks[sourceColumn][source.index];

    const updatedSourceTasks = [...tasks[sourceColumn]];
    updatedSourceTasks.splice(source.index, 1);

    const updatedDestinationTasks = [...tasks[destinationColumn]];
    updatedDestinationTasks.splice(destination.index, 0, movedTask);

    setTasks((prev) => ({
      ...prev,
      [sourceColumn]: updatedSourceTasks,
      [destinationColumn]: updatedDestinationTasks,
    }));
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Project Tasks</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg text-lg"
        >
          + Add Task
        </button>
      </div>

      <p className="text-gray-600 text-lg mb-4">Project ID: {id}</p>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-3 gap-6">
          {["todo", "inProgress", "done"].map((category) => (
            <Droppable key={category} droppableId={category}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-white p-4 shadow-lg rounded-lg min-h-[300px]"
                >
                  <h2 className="text-xl font-semibold text-gray-700 mb-3">
                    {category === "todo"
                      ? "To Do"
                      : category === "inProgress"
                      ? "In Progress"
                      : "Done"}
                  </h2>

                  <ul className="space-y-3">
                    {tasks[category].map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                        {(provided) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-gray-100 p-3 rounded-lg flex justify-between items-center"
                          >
                            <div>
                              <span className="text-gray-800 font-semibold">{task.name}</span>
                              <p className="text-sm text-gray-600">{task.detail}</p>
                              <p className="text-sm text-gray-500">Due: {task.dueDate || "N/A"}</p>
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Add New Task</h2>

            <label className="block mb-2">
              Task Name:
              <input
                type="text"
                name="name"
                value={taskData.name}
                onChange={handleInputChange}
                className="w-full border p-2 rounded mt-1"
                required
              />
            </label>

            <label className="block mb-2">
              Task Detail:
              <textarea
                name="detail"
                value={taskData.detail}
                onChange={handleInputChange}
                className="w-full border p-2 rounded mt-1"
                required
              ></textarea>
            </label>

            <label className="block mb-2">
              Due Date:
              <input
                type="date"
                name="dueDate"
                value={taskData.dueDate}
                onChange={handleInputChange}
                className="w-full border p-2 rounded mt-1"
              />
            </label>

            <label className="block mb-4">
              Task Status:
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
            </label>

            <div className="flex justify-end space-x-2">
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
