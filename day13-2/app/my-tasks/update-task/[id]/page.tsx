"use client";

/* eslint-disable @typescript-eslint/no-unused-vars */
import { Task } from "@/type";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { deleteTask, getTaskById, updateTask } from "@/service";
import { getCookie } from "@/utils/cookies";

export default function UpdateTaskPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [task, setTask] = useState<Task | null>(null);
  const [form, setForm] = useState<Omit<
    Task,
    | "id"
    | "created_time"
    | "updated_time"
    | "deleted_time"
    | "created_by"
    | "updated_by"
    | "deleted_by"
  > | null>(null);

  useEffect(() => {
    if (id) {
      getTaskById(id).then((data) => {
        setTask(data);
        // Initialize form with task data
        const {
          id: _,
          created_time,
          updated_time,
          deleted_time,
          created_by,
          updated_by,
          deleted_by,
          ...formData
        } = data;
        // Set assignee_id to current user
        const currentUserId = Number(getCookie("user_id")) || 1;
        setForm({
          ...formData,
          assignee_id: currentUserId,
        });
      });
    }
  }, [id]);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    if (!form) return;

    const { name, value, type } = e.target;
    setForm((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        [name]:
          type === "number" ? (value === "" ? null : Number(value)) : value,
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form || !id || !task) return;

    const user_id = Number(getCookie("user_id")) || 1;
    const now = new Date().toISOString();

    const taskData = {
      ...task,
      ...form,
      updated_time: now,
      updated_by: user_id,
    };

    await updateTask(id, taskData);
    router.push("/my-tasks");
  };

  const handleDeleteTask = async () => {
    if (!id || !task) return;

    if (
      window.confirm(
        `Are you sure you want to delete "${task.title}"? This action cannot be undone.`
      )
    ) {
      try {
        await deleteTask(id);
        router.push("/my-tasks");
      } catch (error) {
        console.error("Failed to delete task:", error);
        alert("Failed to delete task. Please try again.");
      }
    }
  };

  if (!task || !form) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700">
            Loading task details...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Update Task</h1>
          <p className="text-gray-600">
            Modify task details and track progress
          </p>
          <div className="mt-4 inline-flex items-center px-4 py-2 bg-white rounded-lg shadow-sm border">
            <span className="text-sm text-gray-500 mr-2">Task ID:</span>
            <span className="font-semibold text-indigo-600">#{id}</span>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="px-8 py-6 bg-gradient-to-r from-blue-500 to-indigo-600">
            <div className="flex items-center space-x-3">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              <h2 className="text-2xl font-bold text-white">
                Edit Task Information
              </h2>
            </div>
          </div>

          <form className="p-8 space-y-8" onSubmit={handleSubmit}>
            {/* Basic Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-indigo-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Basic Information
              </h3>

              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Task Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Enter a descriptive task title"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                  />
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    required
                    rows={4}
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Provide detailed description of the task"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-indigo-500"
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
                Timeline
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label
                    htmlFor="start_date"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Start Date *
                  </label>
                  <input
                    type="date"
                    id="start_date"
                    name="start_date"
                    required
                    value={form.start_date?.slice(0, 10)}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                  />
                </div>

                <div>
                  <label
                    htmlFor="due_date"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Due Date *
                  </label>
                  <input
                    type="date"
                    id="due_date"
                    name="due_date"
                    required
                    value={form.due_date?.slice(0, 10)}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                  />
                </div>

                <div>
                  <label
                    htmlFor="completed_date"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Completed Date
                  </label>
                  <input
                    type="date"
                    id="completed_date"
                    name="completed_date"
                    value={
                      form.completed_date
                        ? form.completed_date.slice(0, 10)
                        : ""
                    }
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                  />
                </div>
              </div>
            </div>

            {/* Task Properties */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-indigo-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                Task Properties
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="priority"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Priority *
                  </label>
                  <select
                    id="priority"
                    name="priority"
                    required
                    value={form.priority}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                  >
                    <option value="low">🟢 Low Priority</option>
                    <option value="medium">🟡 Medium Priority</option>
                    <option value="high">🔴 High Priority</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="status"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Status *
                  </label>
                  <select
                    id="status"
                    name="status"
                    required
                    value={form.status}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                  >
                    <option value="to_do">📋 To Do</option>
                    <option value="in_progress">⚡ In Progress</option>
                    <option value="done">✅ Done</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Assignment & Relations */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-indigo-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                Assignment & Relations
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label
                    htmlFor="assignee_id"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Assignee ID
                  </label>
                  <input
                    type="number"
                    id="assignee_id"
                    name="assignee_id"
                    value={form.assignee_id ?? ""}
                    readOnly
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Automatically set to current user
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="parent_id"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Parent Task ID
                  </label>
                  <input
                    type="number"
                    id="parent_id"
                    name="parent_id"
                    value={form.parent_id ?? ""}
                    onChange={handleChange}
                    placeholder="Optional parent task"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                  />
                </div>

                <div>
                  <label
                    htmlFor="project_id"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Project ID
                  </label>
                  <input
                    type="number"
                    id="project_id"
                    name="project_id"
                    value={form.project_id ?? ""}
                    onChange={handleChange}
                    placeholder="Optional project ID"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => router.push("/my-tasks")}
                className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteTask}
                className="flex-1 py-3 px-6 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transform transition duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                Delete Task
              </button>
              <button
                type="submit"
                className="flex-1 py-3 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform transition duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                Update Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
