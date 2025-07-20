import type { JSX } from "react";

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

export type User = {
  id: number;
  fullName: string;
  username: string;
  status: string;
  roles: Role[];
};

export type Role = {
  id?: number;
  code: string;
  name: string;
  description: string;
};

export type router = {
  name: string;
  path: string;
  index?: boolean;
  element: JSX.Element;
  roles?: string[];
  showOnMenu?: boolean;
};

export interface LoggedInUser {
  id: string | number;
  email: string;
  isActive: boolean;
  roles: [
    {
      id: string | number;
      name: string;
    }
  ];
}
