import { Task } from "@/type";
import { getCookie } from "@/utils/cookies";

const baseUrl = "https://server.aptech.io";

const getHeaders = () => ({
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: `Bearer ${
    typeof window !== "undefined" ? getCookie("access_token") || "" : ""
  }`,
});

export const login = async (username: string, password: string) => {
  const response = await fetch(`${baseUrl}/auth/login`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ username, password }),
  });
  return response.json();
};

export const getMyTasks = async (user_id: string) => {
  const response = await fetch(
    `${baseUrl}/workspaces/tasks/assignee/${user_id}`,
    {
      method: "GET",
      headers: getHeaders(),
    }
  );
  return response.json();
};

export const getOurTasks = async () => {
  const response = await fetch(`${baseUrl}/workspaces/tasks/`, {
    method: "GET",
    headers: getHeaders(),
  });
  return response.json();
};

export const getTaskById = async (task_id: string) => {
  const response = await fetch(`${baseUrl}/workspaces/tasks/${task_id}`, {
    method: "GET",
    headers: getHeaders(),
  });
  return response.json();
};

export const createTask = async (task: Omit<Task, "id">) => {
  const response = await fetch(`${baseUrl}/workspaces/tasks/`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(task),
  });
  return response.json();
};

export const updateTask = async (task_id: string, task: Omit<Task, "id">) => {
  const response = await fetch(`${baseUrl}/workspaces/tasks/${task_id}`, {
    method: "PATCH",
    headers: getHeaders(),
    body: JSON.stringify(task),
  });
  return response.json();
};

export const deleteTask = async (task_id: string) => {
  const response = await fetch(`${baseUrl}/workspaces/tasks/${task_id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  return response.json();
};
