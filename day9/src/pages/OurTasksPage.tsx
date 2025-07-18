import { useEffect, useState } from "react";
import { getOurTasks, getTaskById } from "../service";
import type { Task } from "../type";
import TaskDetailModal from "../components/Modal";
import {
  HiOutlineUser,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineCalendar,
} from "react-icons/hi";

export default function OurTasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoadingTask, setIsLoadingTask] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getOurTasks();
      setTasks(data as unknown as Task[]);
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
      // force the data to be in the correct format task
      setSelectedTask(taskDetail as unknown as Task);
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
                          <div className="flex-shrink-0 p-2 bg-indigo-100 rounded-full flex items-center justify-center">
                            <span className="text-xs font-medium text-indigo-600 ">
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
                            <HiOutlineCalendar className="w-3 h-3 mr-1" />
                            <span>{formatDate(task.start_date)}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <HiOutlineCalendar className="w-3 h-3 mr-1" />
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
                            <HiOutlineUser className="w-4 h-4 text-blue-600" />
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
                            <HiOutlineCheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span className="text-green-600 font-medium">
                              {formatDate(task.completed_date)}
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center text-sm">
                            <HiOutlineXCircle className="w-4 h-4 text-red-500 mr-2" />
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
        <TaskDetailModal
          isOpen={isModalOpen}
          isLoading={isLoadingTask}
          task={selectedTask}
          onClose={closeModal}
        />
      </div>
    </div>
  );
}
