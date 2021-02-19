import axios from "axios";

const baseUrl = process.env.REACT_APP_DB_BASE;

export interface Task {
  _id: string;
  title: string;
  description: string;
  created: string;
  priority: string;
  assignedTo: string;
  status: string;
  type: string;
}

export interface BasicTask {
  title: string;
  description: string;
  priority: string;
  assignedTo: string;
  status: string;
  type: string;
}

export async function getTasks(projectId: string, jwtToken: string) {
  const response = await axios.request<Task[]>({
    baseURL: baseUrl,
    url: "/tasks",
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
    data: projectId,
  });

  return response.data;
}

export async function addTask(
  projectId: string,
  task: BasicTask,
  jwtToken: string
) {
  const response = await axios.request<Task>({
    baseURL: baseUrl,
    url: "/tasks",
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
    method: "post",
    data: { projectId, task },
  });

  return response.data;
}

export async function updateTask(
  projectId: string,
  task: Task,
  jwtToken: string
) {
  const response = await axios.request<Task>({
    baseURL: baseUrl,
    url: `/tasks/${task._id}`,
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
    method: "put",
    data: { projectId, task },
  });

  return response.data;
}

export async function deleteTask(
  projectId: string,
  task: Task,
  jwtToken: string
) {
  const response = await axios.request<Task>({
    baseURL: baseUrl,
    url: `/tasks/${task._id}`,
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
    method: "delete",
    data: { projectId, task },
  });

  return response.data;
}
