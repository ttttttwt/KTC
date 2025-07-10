/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { getTaskById, updateTask } from "../service";
import type { Task } from "../type";

export default function UpdateTaskPage() {
  const { id } = useParams<{ id: string }>();
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
  const navigate = useNavigate();

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
        setForm(formData);
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
    if (!form || !id) return;

    const user_id = Number(localStorage.getItem("user_id")) || 1;
    const now = new Date().toISOString();

    const taskData = {
      ...form,
      updated_time: now,
      updated_by: user_id,
    };

    await updateTask(id, taskData);
    navigate("/my-tasks");
  };

  if (!task || !form) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        Update Task
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
              value={form.start_date?.slice(0, 10)}
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
              value={form.due_date?.slice(0, 10)}
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
            value={form.completed_date ? form.completed_date.slice(0, 10) : ""}
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
              <option value="in_progress">In Progress</option>
              <option value="done">Done</option>
              <option value="to_do">To Do</option>
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
              value={form.assignee_id ?? ""}
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
          Update Task
        </button>
      </form>
    </div>
  );
}
