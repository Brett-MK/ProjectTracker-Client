import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import { getAllProjects } from "../../store/projects";
import { Project } from "../../api/projectsApi";
import { getProjectById } from "../../store/projects";

const ProjectsDropdown = ({
  selectedProjectId,
}: {
  selectedProjectId: string;
}) => {
  const history = useHistory();
  const [show, setShow] = useState(false);
  const projects = useSelector(getAllProjects());
  const selectedProject = useSelector(getProjectById(selectedProjectId));

  const selectDeProject = (project: Project) => {
    setShow(false);
    history.push(`/projects/${project._id}/dashboard`);
  };

  return (
    <>
      {projects.length === 0 ? (
        <Link className="mt-2" to={`/projects/new`}>
          <Button className="btn btn-primary">Add New Project</Button>
        </Link>
      ) : (
        ""
      )}

      {projects.length !== 0 ? (
        <Dropdown show={show}>
          <Dropdown.Toggle
            variant="primary"
            id="dropdown-basic"
            onClick={() => setShow(!show)}
          >
            {selectedProject?.title}
          </Dropdown.Toggle>

          <Dropdown.Menu style={{ overflowY: "scroll", maxHeight: "500px" }}>
            {projects.map((project) => (
              <Dropdown.Item
                key={project._id}
                onClick={() => selectDeProject(project)}
              >
                {project.title}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        ""
      )}
    </>
  );
};

export default ProjectsDropdown;
