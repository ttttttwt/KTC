import { FaRegCalendarCheck } from "react-icons/fa";
import { FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";
import type { Task } from "../type";
import { useEffect, useState } from "react";
import { useAuthStore } from "../useAuthStore";
import { useNavigate } from "react-router";
import { getOurTasks, deleteTask } from "../service";

export default function OurTask() {
  const navigate = useNavigate();
  const { loggedInUser } = useAuthStore();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loggedInUser) {
      navigate("/");
      return;
    }

    const fetchOurTasks = async () => {
      try {
        setIsLoading(true);
        const response = await getOurTasks();
        setTasks(response as unknown as Task[]);
      } catch (error) {
        console.error("Error fetching our tasks:", error);
        alert("Failed to fetch tasks.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOurTasks();
  }, [loggedInUser, navigate]);

  const handleDelete = async (taskId: number) => {
    if (!confirm("Are you sure you want to delete this task?")) {
      return;
    }

    try {
      await deleteTask(taskId.toString());
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task.");
    }
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <FaRegCalendarCheck /> Our Tasks
        </h2>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2">Loading tasks...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
      <h2 className="text-2xl font-bold flex items-center gap-2">
        <FaRegCalendarCheck /> Our Tasks
      </h2>
      <button
        onClick={() => navigate("/create-task")}
        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        <FiPlus className="mr-2" />
        Create Task
      </button>
      </div>
      <div className="overflow-x-auto">
      <div className="max-h-200 overflow-y-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded shadow">
        <thead>
          <tr className="bg-gray-100">
          <th className="py-2 px-4 border-b">ID</th>
          <th className="py-2 px-4 border-b">Title</th>
          <th className="py-2 px-4 border-b">Description</th>
          <th className="py-2 px-4 border-b">Start Date</th>
          <th className="py-2 px-4 border-b">Due Date</th>
          <th className="py-2 px-4 border-b">Completed Date</th>
          <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length === 0 ? (
          <tr>
            <td colSpan={7} className="py-4 px-4 text-center text-gray-500">
            No tasks found
            </td>
          </tr>
          ) : (
          tasks.map((task) => (
            <tr key={task.id} className="hover:bg-gray-50">
            <td className="py-2 px-4 border-b">{task.id}</td>
            <td className="py-2 px-4 border-b">{task.title}</td>
            <td className="py-2 px-4 border-b">{task.description}</td>
            <td className="py-2 px-4 border-b">{task.start_date}</td>
            <td className="py-2 px-4 border-b">{task.due_date}</td>
            <td className="py-2 px-4 border-b">
              {task.completed_date ? task.completed_date : "N/A"}
            </td>
            <td className="py-2 px-4 border-b">
              <div className="flex items-center gap-2">
              <button
                onClick={() => navigate(`/update-task/${task.id}`)}
                className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
                title="Edit"
              >
                <FiEdit2 size={16} />
              </button>
              <button
                onClick={() => handleDelete(task.id)}
                className="p-1 text-red-600 hover:text-red-800 transition-colors"
                title="Delete"
              >
                <FiTrash2 size={16} />
              </button>
              </div>
            </td>
            </tr>
          ))
          )}
        </tbody>
        </table>
      </div>
      </div>
    </div>
  );
}
