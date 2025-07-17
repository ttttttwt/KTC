import type { Task } from "../type";

interface TaskDetailModalProps {
  isOpen: boolean;
  isLoading: boolean;
  task: Task | null;
  onClose: () => void;
}

export default function TaskDetailModal({
  isOpen,
  isLoading,
  task,
  onClose,
}: TaskDetailModalProps) {
  if (!isOpen) return null;

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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Task Details</h2>
            <button
              onClick={onClose}
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

          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading task details...</p>
            </div>
          ) : task ? (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Task ID
                </label>
                <div className="bg-gray-50 rounded-lg p-3">
                  <span className="text-indigo-600 font-semibold">
                    #{task.id}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <div className="bg-gray-50 rounded-lg p-3">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {task.title}
                  </h3>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {task.description}
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
                        task.priority
                      )}`}
                    >
                      <div className="w-2 h-2 rounded-full bg-current mr-2"></div>
                      {task.priority.toUpperCase()}
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
                        task.status
                      )}`}
                    >
                      <div className="w-2 h-2 rounded-full bg-current mr-2"></div>
                      {task.status.replace("_", " ").toUpperCase()}
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
                      {formatDate(task.start_date)}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Due Date
                  </label>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-gray-700">{formatDate(task.due_date)}</p>
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
                        User #{task.assignee_id}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {task.completed_date && (
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
                        {formatDate(task.completed_date)}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : null}

          <div className="mt-6 pt-4 border-t border-gray-200">
            <button
              onClick={onClose}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
