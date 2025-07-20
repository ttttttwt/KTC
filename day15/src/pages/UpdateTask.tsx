import { useForm } from "react-hook-form";
import {
  FiCalendar,
  FiUser,
  FiFolder,
  FiAlertCircle,
  FiSave,
  FiX,
  FiEdit3,
} from "react-icons/fi";
import type { Task } from "../type";
import { useNavigate, useParams } from "react-router";
import { useAuthStore } from "../useAuthStore";
import { useEffect, useState } from "react";
import { getTaskById, updateTask } from "../service";

type UpdateTaskForm = Omit<Task, "id" | "created_time" | "created_by">;

export default function UpdateTask() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { loggedInUser } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingTask, setIsLoadingTask] = useState(true);

  useEffect(() => {
    if (!loggedInUser) {
      navigate("/");
    }
  }, [loggedInUser, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateTaskForm>({
    defaultValues: {
      // Mock data for demonstration
      title: "Sample Task",
      description: "This is a sample task description",
      start_date: "2024-01-15T09:00",
      due_date: "2024-01-20T17:00",
      completed_date: null,
      priority: "medium",
      status: "in_progress",
      assignee_id: 1,
      parent_id: null,
      project_id: 1,
      updated_time: new Date().toISOString(),
      updated_by: 1,
      deleted_time: null,
      deleted_by: null,
    },
  });

  useEffect(() => {
    const fetchTask = async () => {
      if (!id) {
        navigate("/our-tasks");
        return;
      }

      try {
        setIsLoadingTask(true);
        const task = await getTaskById(id) as unknown as Task;
        reset({
          title: task.title,
          description: task.description,
          start_date: task.start_date,
          due_date: task.due_date,
          completed_date: task.completed_date,
          priority: task.priority,
          status: task.status,
          assignee_id: task.assignee_id,
          parent_id: task.parent_id,
          project_id: task.project_id,
          updated_time: new Date().toISOString(),
          updated_by: Number(loggedInUser?.id) || 1,
          deleted_time: null,
          deleted_by: null,
        });
      } catch (error) {
        console.error("Error fetching task:", error);
        alert("Failed to fetch task details.");
        navigate("/our-tasks");
      } finally {
        setIsLoadingTask(false);
      }
    };

    fetchTask();
  }, [id, reset, navigate, loggedInUser]);

  const onSubmit = async (data: UpdateTaskForm) => {
    if (!id) return;

    try {
      setIsLoading(true);
      await updateTask(id, data as Omit<Task, "id">);
      navigate("/our-tasks");
    } catch (error) {
      console.error("Error updating task:", error);
      alert("Failed to update task. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoadingTask) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading task details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center">
              <FiEdit3 className="mr-3 text-blue-600" />
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">
                  Update Task
                </h1>
                <p className="mt-1 text-sm text-gray-600">
                  Modify task details and save changes
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                {...register("title", { required: "Title is required" })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter task title"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                {...register("description")}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter task description"
              />
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <FiCalendar className="mr-2" />
                  Start Date *
                </label>
                <input
                  {...register("start_date", {
                    required: "Start date is required",
                  })}
                  type="datetime-local"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errors.start_date && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.start_date.message}
                  </p>
                )}
              </div>

              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <FiCalendar className="mr-2" />
                  Due Date *
                </label>
                <input
                  {...register("due_date", {
                    required: "Due date is required",
                  })}
                  type="datetime-local"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errors.due_date && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.due_date.message}
                  </p>
                )}
              </div>

              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <FiCalendar className="mr-2" />
                  Completed Date
                </label>
                <input
                  {...register("completed_date")}
                  type="datetime-local"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Priority and Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <FiAlertCircle className="mr-2" />
                  Priority *
                </label>
                <select
                  {...register("priority", {
                    required: "Priority is required",
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select priority</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                {errors.priority && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.priority.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status *
                </label>
                <select
                  {...register("status", { required: "Status is required" })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select status</option>
                  <option value="todo">To Do</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
                {errors.status && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.status.message}
                  </p>
                )}
              </div>
            </div>

            {/* Assignee and IDs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <FiUser className="mr-2" />
                  Assignee ID *
                </label>
                <input
                  {...register("assignee_id", {
                    required: "Assignee ID is required",
                    valueAsNumber: true,
                  })}
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter assignee ID"
                />
                {errors.assignee_id && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.assignee_id.message}
                  </p>
                )}
              </div>

              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <FiFolder className="mr-2" />
                  Project ID
                </label>
                <input
                  {...register("project_id", { valueAsNumber: true })}
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter project ID"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Parent Task ID
                </label>
                <input
                  {...register("parent_id", { valueAsNumber: true })}
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter parent task ID"
                />
              </div>
            </div>

            {/* Updated By */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Updated By *
              </label>
              <input
                {...register("updated_by", {
                  required: "Updated by is required",
                  valueAsNumber: true,
                })}
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter user ID"
              />
              {errors.updated_by && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.updated_by.message}
                </p>
              )}
            </div>

            {/* Submit buttons */}
            <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate("/our-tasks")}
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <FiX className="mr-2" />
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
              >
                <FiSave className="mr-2" />
                {isLoading ? "Updating..." : "Update Task"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
