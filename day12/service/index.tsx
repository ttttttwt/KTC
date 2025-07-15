export type Task = {
  id: number;
  created_time: string;
  updated_time: string;
  deleted_time: string | null;
  created_by: number;
  updated_by: number;
  deleted_by: number | null;
  title: string;
  description: string;
  start_date: string;
  due_date: string;
  completed_date: string | null;
  priority: string;
  status: string;
  assignee_id: number;
  parent_id: number | null;
  project_id: number | null;
};

const baseUrl = "https://server.aptech.io";

const getHeaders = () => ({
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ0dW5nbnRAc29mdGVjaC52biIsImVtYWlsIjoidHVuZ250QHNvZnRlY2gudm4iLCJzdWIiOjEsImFwcGxpY2F0aW9uIjoiT25saW5lIFNob3AgLSBBUEkiLCJyb2xlcyI6W3siaWQiOjEsIm5hbWUiOiJBZG1pbmlzdHJhdG9ycyJ9LHsiaWQiOjIsIm5hbWUiOiJNYW5hZ2VycyJ9XSwiaWF0IjoxNzUyNTY1ODY4LCJleHAiOjE3ODQxMjM0Njh9.xh6pV3u7BMG9hppCea_44faeJeR8c-_-nqosXA17EcA"}`,
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
