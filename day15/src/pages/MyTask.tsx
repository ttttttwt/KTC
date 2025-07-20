import { FaUserCheck } from "react-icons/fa";
import type { Task } from "../type";
import { useAuthStore } from "../useAuthStore";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { getMyTasks } from "../service";

export default function MyTask() {
  const navigate = useNavigate();
  const { loggedInUser } = useAuthStore();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loggedInUser) {
      navigate("/");
      return;
    }

    const fetchMyTasks = async () => {
      try {
        setIsLoading(true);
        const response = await getMyTasks(loggedInUser.id.toString());
        setTasks(response as unknown as Task[]);
      } catch (error) {
        console.error("Error fetching my tasks:", error);
        alert("Failed to fetch tasks.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyTasks();
  }, [loggedInUser, navigate]);

  if (isLoading) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <FaUserCheck /> My Tasks
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
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <FaUserCheck /> My Tasks
      </h2>
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
              </tr>
            </thead>
            <tbody>
              {tasks.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="py-4 px-4 text-center text-gray-500"
                  >
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
