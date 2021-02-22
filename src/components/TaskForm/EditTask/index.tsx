import { RouteComponentProps } from "react-router-dom";
import { useHistory, Redirect } from "react-router-dom";
import withSideNavLayout from "../../Layout/withSideNavLayout";
import {
  getProjectById,
  updateTaskData,
  deleteTaskData,
} from "../../../store/projects";
import { useSelector, useDispatch } from "react-redux";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Dropdown from "react-bootstrap/Dropdown";
import TaskForm from "../TaskForm";
import { BasicTask } from "../../../api/tasksApi";

interface TParams {
  projectId: string;
  taskId: string;
}

const EditTaskForm = ({ match }: RouteComponentProps<TParams>) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const project = useSelector(getProjectById(match.params.projectId));

  if (!project) return <Redirect to="/project-not-found" />;

  const task = project.tasks.find(
    (project) => project._id === match.params.taskId
  );

  if (!task) return <Redirect to="/task-not-found" />;

  const handleSubmit = (editedTask: BasicTask) => {
    const updatedTask = {
      ...task,
      title: editedTask.title,
      description: editedTask.description,
      priority: editedTask.priority,
      assignedTo: editedTask.assignedTo,
      status: editedTask.status,
      type: editedTask.type,
    };

    dispatch(updateTaskData({ projectId: project._id, task: updatedTask }));
    history.push(`/projects/${project._id}/dashboard`);
  };

  const deleteTask = () => {
    dispatch(deleteTaskData({ projectId: project._id, task }));
    history.push(`/projects/${project._id}/dashboard`);
  };

  return (
    <div className="container-fluid mb-5">
      <div className="d-flex">
        <h1 className="my-4">{task.title}</h1>
        <Dropdown style={{ margin: "2rem 2rem 2rem auto" }}>
          <Dropdown.Toggle>
            <FontAwesomeIcon icon={faEllipsisH} />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={deleteTask}>Delete Task</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <TaskForm onSubmit={handleSubmit} task={task} />
    </div>
  );
};

export default withSideNavLayout(EditTaskForm);
