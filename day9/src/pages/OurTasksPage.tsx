import { useEffect, useState } from "react";
import { getOurTasks, getTaskById } from "../service";
import type { Task } from "../type";

export default function OurTasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoadingTask, setIsLoadingTask] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getOurTasks();
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

  const handleTaskClick = async (taskId: string) => {
    setIsLoadingTask(true);
    setIsModalOpen(true);
    try {
      const taskDetail = await getTaskById(taskId);
      setSelectedTask(taskDetail);
    } catch (error) {
      console.error("Error fetching task details:", error);
    } finally {
      setIsLoadingTask(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Our Tasks</h1>
          <p className="text-gray-600">
            View all team tasks and their progress
          </p>
          <div className="mt-4 flex justify-center">
            <div className="bg-white rounded-lg px-4 py-2 shadow-sm border">
              <span className="text-sm text-gray-500">Total Tasks: </span>
              <span className="font-semibold text-indigo-600">
                {tasks.length}
              </span>
            </div>
          </div>
        </div>

        {/* Tasks Table */}
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
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No team tasks found
            </h3>
            <p className="text-gray-500">
              Tasks will appear here once they are created by team members.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      <div className="flex items-center space-x-1">
                        <span>ID</span>
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Task Details
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Priority
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Timeline
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Assignee
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Completion
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {tasks.map((task, index) => (
                    <tr
                      key={task.id}
                      className={`hover:bg-gray-50 transition-colors cursor-pointer ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                      }`}
                      onClick={() => handleTaskClick(String(task.id))}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8 bg-indigo-100 rounded-full flex items-center justify-center">
                            <span className="text-xs font-medium text-indigo-600">
                              #{task.id}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="max-w-xs">
                          <div className="text-sm font-semibold text-gray-900 mb-1">
                            {task.title}
                          </div>
                          <div className="text-sm text-gray-600 line-clamp-2">
                            {task.description}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getPriorityClass(
                            task.priority
                          )}`}
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-current mr-2"></div>
                          {task.priority.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm space-y-1">
                          <div className="flex items-center text-gray-600">
                            <svg
                              className="w-3 h-3 mr-1"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span>{formatDate(task.start_date)}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <svg
                              className="w-3 h-3 mr-1"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span>{formatDate(task.due_date)}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(
                            task.status
                          )}`}
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-current mr-2"></div>
                          {task.status.replace("_", " ").toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <svg
                              className="w-4 h-4 text-blue-600"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">
                              User #{task.assignee_id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {task.completed_date ? (
                          <div className="flex items-center text-sm">
                            <svg
                              className="w-4 h-4 text-green-500 mr-2"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-green-600 font-medium">
                              {formatDate(task.completed_date)}
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center text-sm">
                            <svg
                              className="w-4 h-4 text-red-500 mr-2"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-red-500 font-medium">
                              Not completed
                            </span>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Task Detail Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Task Details
                  </h2>
                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                {isLoadingTask ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
                    <p className="mt-2 text-gray-600">
                      Loading task details...
                    </p>
                  </div>
                ) : selectedTask ? (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Task ID
                      </label>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <span className="text-indigo-600 font-semibold">
                          #{selectedTask.id}
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Title
                      </label>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {selectedTask.title}
                        </h3>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-gray-700 whitespace-pre-wrap">
                          {selectedTask.description}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Priority
                        </label>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${getPriorityClass(
                              selectedTask.priority
                            )}`}
                          >
                            <div className="w-2 h-2 rounded-full bg-current mr-2"></div>
                            {selectedTask.priority.toUpperCase()}
                          </span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Status
                        </label>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusClass(
                              selectedTask.status
                            )}`}
                          >
                            <div className="w-2 h-2 rounded-full bg-current mr-2"></div>
                            {selectedTask.status
                              .replace("_", " ")
                              .toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Start Date
                        </label>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-gray-700">
                            {formatDate(selectedTask.start_date)}
                          </p>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Due Date
                        </label>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-gray-700">
                            {formatDate(selectedTask.due_date)}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Assignee
                      </label>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <svg
                              className="w-5 h-5 text-blue-600"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">
                              User #{selectedTask.assignee_id}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {selectedTask.completed_date && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Completed Date
                        </label>
                        <div className="bg-green-50 rounded-lg p-3">
                          <div className="flex items-center">
                            <svg
                              className="w-5 h-5 text-green-500 mr-2"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-green-600 font-medium">
                              {formatDate(selectedTask.completed_date)}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : null}

                <div className="mt-6 pt-4 border-t border-gray-200">
                  <button
                    onClick={closeModal}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
