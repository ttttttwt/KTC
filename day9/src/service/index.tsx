import type { Task } from "../type";

const baseUrl = "https://server.aptech.io";

const defaultHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: `Bearer ${localStorage.getItem("access_token") || ""}`,
};

export const login = async (username: string, password: string) => {
  const response = await fetch(`${baseUrl}/auth/login`, {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify({ username, password }),
  });
  return response.json();
};

export const getMyTasks = async (user_id: string) => {
  const response = await fetch(
    `${baseUrl}/workspaces/tasks/assignee/${user_id}`,
    {
      method: "GET",
      headers: defaultHeaders,
    }
  );
  return response.json();
};

export const getOurTasks = async () => {
  const response = await fetch(`${baseUrl}/workspaces/tasks/`, {
    method: "GET",
    headers: defaultHeaders,
  });
  return response.json();
};

export const getTaskById = async (task_id: string) => {
  const response = await fetch(`${baseUrl}/workspaces/tasks/${task_id}`, {
    method: "GET",
    headers: defaultHeaders,
  });
  return response.json();
};

export const createTask = async (task: Omit<Task, "id">) => {
  const response = await fetch(`${baseUrl}/workspaces/tasks/`, {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify(task),
  });
  return response.json();
};

export const updateTask = async (task_id: string, task: Omit<Task, "id">) => {
  const response = await fetch(`${baseUrl}/workspaces/tasks/${task_id}`, {
    method: "PATCH",
    headers: defaultHeaders,
    body: JSON.stringify(task),
  });
  return response.json();
};
