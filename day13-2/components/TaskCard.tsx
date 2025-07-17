import React from "react";
import type { Task } from "../type";

interface TaskCardProps {
  task: Task;
  onEdit: (taskId: string) => void;
  onDelete: (taskId: string, taskTitle: string, e: React.MouseEvent) => void;
}

export default function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
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
    <div
      className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 cursor-pointer overflow-hidden transform hover:-translate-y-1 h-80 flex flex-col"
      onClick={() => onEdit(String(task.id))}
    >
      {/* Card Header - Fixed height */}
      <div className="p-6 pb-4 flex-shrink-0">
        <div className="flex justify-between items-start mb-3">
          <h2 className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-indigo-600 transition-colors leading-tight">
            {task.title}
          </h2>
          <div className="flex items-center space-x-2 flex-shrink-0 ml-2">
            <span
              className={`px-2 py-1 ${getPriorityClass(
                task.priority
              )} text-xs font-semibold rounded-full`}
            >
              {task.priority.toUpperCase()}
            </span>
            <button
              onClick={(e) => onDelete(String(task.id), task.title, e)}
              className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
              title="Delete task"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
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
  );
}
