import { RouteComponentProps } from "react-router-dom";
import { useHistory, Redirect } from "react-router-dom";
import withSideNavLayout from "../../Layout/withSideNavLayout";
import {
  getProjectById,
  updateProjectData,
  deleteProjectData,
} from "../../../store/projects";
import { useSelector, useDispatch } from "react-redux";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Dropdown from "react-bootstrap/Dropdown";
import ProjectForm from "../ProjectForm";
import { BasicProject } from "../../../api/projectsApi";

interface TParams {
  projectId: string;
}

const EditProject = ({ match }: RouteComponentProps<TParams>) => {
  const project = useSelector(getProjectById(match.params.projectId));
  const dispatch = useDispatch();
  const history = useHistory();

  if (!project) return <Redirect to="/project-not-found" />;

  const handleSubmit = (editedProject: BasicProject) => {
    const updatedProject = {
      ...project,
      title: editedProject.title,
      description: editedProject.description,
    };

    dispatch(updateProjectData(updatedProject));
    history.push(`/projects/${project._id}/dashboard`);
  };

  const deleteProject = () => {
    dispatch(deleteProjectData(project._id));
    history.push(`/`);
  };

  return (
    <div className="container-fluid mb-5">
      <div className="d-flex">
        <h1 className="my-4">{project.title}</h1>
        <Dropdown style={{ margin: "2rem 2rem 2rem auto" }}>
          <Dropdown.Toggle>
            <FontAwesomeIcon icon={faEllipsisH} />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={deleteProject}>
              Delete Project
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <ProjectForm onSubmit={handleSubmit} project={project} />
    </div>
  );
};

export default withSideNavLayout(EditProject);
