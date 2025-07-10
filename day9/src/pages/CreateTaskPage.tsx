import React, { useState } from "react";
import { useNavigate } from "react-router";
import { createTask } from "../service";
import type { Task } from "../type";

export default function CreateTaskPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState<
    Omit<
      Task,
      | "id"
      | "created_time"
      | "updated_time"
      | "deleted_time"
      | "created_by"
      | "updated_by"
      | "deleted_by"
    >
  >({
    title: "",
    description: "",
    start_date: "",
    due_date: "",
    completed_date: null,
    priority: "low",
    status: "to_do",
    assignee_id: 1,
    parent_id: null,
    project_id: null,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "number" ? (value === "" ? null : Number(value)) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Giả sử user_id = 1 cho created_by, updated_by
    const user_id = Number(localStorage.getItem("user_id")) || 1;
    const now = new Date().toISOString();
    // Không truyền id, server sẽ tự sinh
    const { /* id, */ ...taskData } = {
      ...form,
      created_time: now,
      updated_time: now,
      deleted_time: null,
      created_by: user_id,
      updated_by: user_id,
      deleted_by: null,
    };
    await createTask(taskData);
    navigate("/my-tasks");
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        Create Task
      </h1>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            value={form.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            required
            value={form.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="start_date"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Start Date
            </label>
            <input
              type="date"
              id="start_date"
              name="start_date"
              required
              value={form.start_date}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="due_date"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Due Date
            </label>
            <input
              type="date"
              id="due_date"
              name="due_date"
              required
              value={form.due_date}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="completed_date"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Completed Date
          </label>
          <input
            type="date"
            id="completed_date"
            name="completed_date"
            value={form.completed_date || ""}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="priority"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              required
              value={form.priority}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Status
            </label>
            <select
              id="status"
              name="status"
              required
              value={form.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="to_do">To Do</option>
              <option value="in_progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="assignee_id"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Assignee ID
            </label>
            <input
              type="number"
              id="assignee_id"
              name="assignee_id"
              required
              value={form.assignee_id}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="parent_id"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Parent Task ID
            </label>
            <input
              type="number"
              id="parent_id"
              name="parent_id"
              value={form.parent_id ?? ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="project_id"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Project ID
            </label>
            <input
              type="number"
              id="project_id"
              name="project_id"
              value={form.project_id ?? ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
        >
          Create Task
        </button>
      </form>
    </div>
  );
}
