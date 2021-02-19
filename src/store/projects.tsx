import {
  createSlice,
  createSelector,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import {
  getProjects,
  addProject,
  updateProject,
  Project,
  BasicProject,
  deleteProject,
} from "../api/projectsApi";
import {
  addTask,
  BasicTask,
  getTasks,
  updateTask,
  Task,
  deleteTask,
} from "../api/tasksApi";

let storedJwtToken = "";
export const setToken = (jwtToken: string) => {
  storedJwtToken = jwtToken;
};

export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async () => {
    return await getProjects(storedJwtToken);
  }
);

export const createProject = createAsyncThunk(
  "projects/addProject",
  async (project: BasicProject) => {
    return await addProject(project, storedJwtToken);
  }
);

export const updateProjectData = createAsyncThunk(
  "projects/updateProject",
  async (project: Project) => {
    return await updateProject(project, storedJwtToken);
  }
);

export const deleteProjectData = createAsyncThunk(
  "project/deleteProject",
  async (projectId: string) => {
    return await deleteProject(projectId, storedJwtToken);
  }
);

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (projectId: string) => {
    return await getTasks(projectId, storedJwtToken);
  }
);

export const createTask = createAsyncThunk(
  "tasks/addTask",
  async ({ projectId, task }: { projectId: string; task: BasicTask }) => {
    return await addTask(projectId, task, storedJwtToken);
  }
);

export const updateTaskData = createAsyncThunk(
  "tasks/updateTask",
  async ({ projectId, task }: { projectId: string; task: Task }) => {
    return await updateTask(projectId, task, storedJwtToken);
  }
);

export const deleteTaskData = createAsyncThunk(
  "tasks/deleteTask",
  async ({ projectId, task }: { projectId: string; task: Task }) => {
    return await deleteTask(projectId, task, storedJwtToken);
  }
);

interface ProjectsState {
  projects: Project[];
  loading: boolean;
  error: string | null;
}

const initialState: ProjectsState = {
  projects: [],
  loading: true,
  error: null,
};

const slice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProjects.fulfilled, (state, action) => {
      state.projects = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchProjects.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createProject.fulfilled, (state, action) => {
      state.projects.push(action.payload);
      state.loading = false;
    });
    builder.addCase(createProject.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateProjectData.fulfilled, (state, action) => {
      const index = state.projects.findIndex(
        (project) => project._id === action.payload._id
      );
      state.projects[index] = action.payload;
      state.loading = false;
    });
    builder.addCase(updateProjectData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteProjectData.fulfilled, (state, action) => {
      const index = state.projects.findIndex(
        (project) => project._id === action.payload._id
      );
      state.projects.splice(index, 1);
      state.loading = false;
    });
    builder.addCase(deleteProjectData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createTask.fulfilled, (state, action: any) => {
      const index = state.projects.findIndex(
        (project) => project._id === action.payload.projectId
      );
      state.projects[index].tasks.push(action.payload.task);
      state.loading = false;
    });
    builder.addCase(createTask.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateTaskData.fulfilled, (state, action: any) => {
      const index = state.projects.findIndex(
        (project) => project._id === action.payload.projectId
      );
      const taskIndex = state.projects[index].tasks.findIndex(
        (task) => task._id === action.payload.task._id
      );
      state.projects[index].tasks[taskIndex] = action.payload.task;
      state.loading = false;
    });
    builder.addCase(updateTaskData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteTaskData.fulfilled, (state, action: any) => {
      const index = state.projects.findIndex(
        (project) => project._id === action.payload.projectId
      );
      const taskIndex = state.projects[index].tasks.findIndex(
        (task) => task._id === action.payload.task._id
      );
      state.projects[index].tasks.splice(taskIndex, 1);
      state.loading = false;
    });
    builder.addCase(deleteTaskData.pending, (state) => {
      state.loading = true;
    });
  },
});

export default slice.reducer;

export const getProjectById = (id: string) =>
  createSelector(
    (state: ProjectsState) => state.projects,
    (projects) => projects.find((project) => project._id === id)
  );

export const getIsLoading = () =>
  createSelector(
    (state: ProjectsState) => state,
    (state) => state.loading
  );

export const getAllProjects = () =>
  createSelector(
    (state: ProjectsState) => state.projects,
    (projects) => projects
  );
