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
