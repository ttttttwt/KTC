import { useEffect, useState } from "react";
import { getMyTasks, deleteTask } from "../service";
import { useNavigate } from "react-router";
import type { Task } from "../type";
import TaskCard from "../components/TaskCard";
import { HiOutlineClipboardList } from "react-icons/hi";

export default function MyTasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMyTasks(localStorage.getItem("user_id") || "");
      // force the data to be in the correct format task
      setTasks(Array.isArray(data) ? data : []);
    };
    fetchData();
  }, []);

  const handleEditTask = (taskId: string) => {
    navigate(`/update-task/${taskId}`);
  };

  const handleDeleteTask = async (
    taskId: string,
    taskTitle: string,
    e: React.MouseEvent
  ) => {
    e.stopPropagation(); // Prevent card click navigation

    if (
      window.confirm(
        `Are you sure you want to delete "${taskTitle}"? This action cannot be undone.`
      )
    ) {
      try {
        await deleteTask(taskId);
        // Remove the deleted task from state
        setTasks((prevTasks) =>
          prevTasks.filter((task) => String(task.id) !== taskId)
        );
      } catch (error) {
        console.error("Failed to delete task:", error);
        alert("Failed to delete task. Please try again.");
      }
    }
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
            <HiOutlineClipboardList className="mx-auto h-16 w-16 text-gray-400 mb-4" />
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
              <TaskCard
                key={task.id}
                task={task}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
