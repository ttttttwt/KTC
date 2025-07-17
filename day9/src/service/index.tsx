import { apiClient } from "../libraries/api-client";
import type { Task } from "../type";

export const login = async (username: string, password: string) => {
  const response = await apiClient.post("/auth/login", { username, password });
  return response;
};

export const getMyTasks = async (user_id: string) => {
  const response = await apiClient.get(`/workspaces/tasks/assignee/${user_id}`);
  return response;
};

export const getOurTasks = async () => {
  const response = await apiClient.get("/workspaces/tasks/");
  return response;
};

export const getTaskById = async (task_id: string) => {
  const response = await apiClient.get(`/workspaces/tasks/${task_id}`);
  return response;
};

export const createTask = async (task: Omit<Task, "id">) => {
  const response = await apiClient.post("/workspaces/tasks/", task);
  return response;
};

export const updateTask = async (task_id: string, task: Omit<Task, "id">) => {
  const response = await apiClient.patch(`/workspaces/tasks/${task_id}`, task);
  return response;
};

export const deleteTask = async (task_id: string) => {
  const response = await apiClient.delete(`/workspaces/tasks/${task_id}`);
  return response;
};
