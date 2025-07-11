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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Tasks</h1>
          <p className="text-gray-600">Manage and track your personal tasks</p>
          <div className="mt-4 flex justify-center">
            <div className="bg-white rounded-lg px-4 py-2 shadow-sm border">
              <span className="text-sm text-gray-500">Total Tasks: </span>
              <span className="font-semibold text-indigo-600">
                {tasks.length}
              </span>
            </div>
          </div>
        </div>

        {/* Tasks Grid */}
        {tasks.length === 0 ? (
          <div className="text-center py-16">
            <svg
              className="mx-auto h-16 w-16 text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No tasks found
            </h3>
            <p className="text-gray-500">
              Create your first task to get started!
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 cursor-pointer overflow-hidden transform hover:-translate-y-1 h-80 flex flex-col"
                onClick={() => navigate(`/update-task/${task.id}`)}
              >
                {/* Card Header - Fixed height */}
                <div className="p-6 pb-4 flex-shrink-0">
                  <div className="flex justify-between items-start mb-3">
                    <h2 className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-indigo-600 transition-colors leading-tight">
                      {task.title}
                    </h2>
                    <span
                      className={`px-2 py-1 ${getPriorityClass(
                        task.priority
                      )} text-xs font-semibold rounded-full flex-shrink-0 ml-2`}
                    >
                      {task.priority.toUpperCase()}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                    {task.description}
                  </p>

                  {/* Status Badge */}
                  <div>
                    <span
                      className={`inline-flex items-center px-3 py-1 ${getStatusClass(
                        task.status
                      )} text-xs font-medium rounded-full`}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-current mr-2"></div>
                      {task.status.replace("_", " ").toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Card Body - Flexible height */}
                <div className="px-6 flex-1 flex flex-col justify-center space-y-2">
                  <div className="flex items-center text-sm">
                    <svg
                      className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-gray-500">Start:</span>
                    <span className="ml-1 font-medium text-gray-700 truncate">
                      {formatDate(task.start_date)}
                    </span>
                  </div>

                  <div className="flex items-center text-sm">
                    <svg
                      className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-gray-500">Due:</span>
                    <span className="ml-1 font-medium text-gray-700 truncate">
                      {formatDate(task.due_date)}
                    </span>
                  </div>

                  <div className="flex items-center text-sm">
                    <svg
                      className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-gray-500">Completed:</span>
                    <span
                      className={`ml-1 font-medium truncate ${
                        task.completed_date ? "text-green-600" : "text-red-500"
                      }`}
                    >
                      {task.completed_date
                        ? formatDate(task.completed_date)
                        : "Not completed"}
                    </span>
                  </div>
                </div>

                {/* Card Footer - Fixed height */}
                <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Click to edit</span>
                    <svg
                      className="w-4 h-4 text-gray-400 group-hover:text-indigo-500 transition-colors flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
