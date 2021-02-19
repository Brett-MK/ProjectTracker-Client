import axios from "axios";
import { Task } from "./tasksApi";

const baseUrl = process.env.REACT_APP_DB_BASE;

export interface Project {
  _id: string;
  title: string;
  users: string[];
  tasks: Task[];
  description: string;
}

export interface BasicProject {
  title: string;
  description: string;
}

export async function getProjects(jwtToken: string) {
  const response = await axios.request<Project[]>({
    baseURL: baseUrl,
    url: "/projects",
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  });

  return response.data;
}

export async function addProject(project: BasicProject, jwtToken: string) {
  const response = await axios.request<Project>({
    baseURL: baseUrl,
    url: "/projects",
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
    method: "post",
    data: project,
  });

  return response.data;
}

export async function updateProject(project: Project, jwtToken: string) {
  const response = await axios.request<Project>({
    baseURL: baseUrl,
    url: `/projects/${project._id}`,
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
    method: "put",
    data: project,
  });

  return response.data;
}

export async function deleteProject(projectId: string, jwtToken: string) {
  const response = await axios.request<Project>({
    baseURL: baseUrl,
    url: `/projects/${projectId}`,
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
    method: "delete",
  });

  return response.data;
}
