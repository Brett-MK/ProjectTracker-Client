import { RouteComponentProps } from "react-router-dom";
import { useHistory, Redirect } from "react-router-dom";
import withSideNavLayout from "../Layout/withSideNavLayout";
import { createTask, getProjectById } from "../../store/projects";
import { useSelector, useDispatch } from "react-redux";
import TaskForm from "./TaskForm";
import { BasicTask } from "../../api/tasksApi";

interface TParams {
  projectId: string;
  taskId: string;
}

const AddTask = ({ match }: RouteComponentProps<TParams>) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const project = useSelector(getProjectById(match.params.projectId));

  if (!project) return <Redirect to="/project-not-found" />;

  const handleSubmit = (task: BasicTask) => {
    dispatch(createTask({ projectId: project._id, task }));
    history.push(`/projects/${project._id}/dashboard`);
  };

  return (
    <div className="container-fluid mb-5">
      <h1 className="my-4">New Task</h1>
      <TaskForm onSubmit={handleSubmit} isNewTask={true} />
    </div>
  );
};

export default withSideNavLayout(AddTask);
