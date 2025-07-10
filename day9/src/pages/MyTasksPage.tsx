import { useEffect, useState } from "react";
import { getMyTasks } from "../service";
import { useNavigate } from "react-router";
import type { Task } from "../type";

export default function MyTasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMyTasks(localStorage.getItem("user_id") || "");
      setTasks(data);
    };
    fetchData();
  }, []);

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-600";
      case "medium":
        return "bg-yellow-100 text-yellow-600";
      case "low":
        return "bg-green-100 text-green-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "done":
        return "bg-green-100 text-green-600";
      case "in_progress":
        return "bg-blue-100 text-blue-600";
      case "to_do":
        return "bg-gray-100 text-gray-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        My Tasks
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100 cursor-pointer"
            onClick={() => navigate(`/update-task/${task.id}`)}
          >
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold text-gray-800">{task.title}</h2>
              <span
                className={`px-3 py-1 ${getPriorityClass(
                  task.priority
                )} text-xs font-medium rounded-full`}
              >
                {task.priority}
              </span>
            </div>

            <p className="text-gray-700 mb-4">{task.description}</p>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Start Date</span>
                <span className="text-gray-700 font-medium">
                  {formatDate(task.start_date)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Due Date</span>
                <span className="text-gray-700 font-medium">
                  {formatDate(task.due_date)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Completed</span>
                <span
                  className={
                    task.completed_date
                      ? "text-green-500 font-medium"
                      : "text-red-500 font-medium"
                  }
                >
                  {task.completed_date
                    ? formatDate(task.completed_date)
                    : "Not completed"}
                </span>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-gray-100">
              <span
                className={`px-3 py-1 ${getStatusClass(
                  task.status
                )} text-xs font-medium rounded-full`}
              >
                {task.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
