import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";
import { useHistory, RouteComponentProps } from "react-router";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useSelector } from "react-redux";
import { getAllProjects } from "../../store/projects";
import { Project } from "../../api/projectsApi";
import { getProjectById } from "../../store/projects";

interface TParams {
  projectId: string;
}

const Header = ({ match }: RouteComponentProps<TParams>) => {
  const [, setError] = useState("");

  const { logout } = useAuth();
  const projects = useSelector(getAllProjects());
  const selectedProject = useSelector(getProjectById(match.params.projectId));

  const history = useHistory();

  async function handleLogout() {
    setError("");
    try {
      await logout();
    } catch {
      setError("Failed to log out");
    }
  }

  const selectDeProject = (project: Project) => {
    history.push(`/projects/${project._id}/dashboard`);
  };

  return (
    <Navbar
      expand="lg"
      bg="dark"
      variant="dark"
      style={{ zIndex: 1039, position: "sticky", top: "0" }}
    >
      <Link className="navbar-brand mr-lg-7" to="/">
        Projectiviti
      </Link>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link className="nav-link" to="/">
            Home
          </Link>

          <Link
            className="nav-link"
            to={`/projects/${selectedProject?._id}/dashboard`}
          >
            Dashboard
          </Link>

          <Link
            className="nav-link"
            to={`/projects/${selectedProject?._id}/tasks`}
          >
            All Tasks
          </Link>
        </Nav>
        <Nav>
          <NavDropdown title="Select a Project" id="basic-nav-dropdown">
            {projects.map((project) => (
              <NavDropdown.Item onClick={() => selectDeProject(project)}>
                {project.title}
              </NavDropdown.Item>
            ))}
          </NavDropdown>
        </Nav>
        <Nav>
          <NavDropdown
            alignRight
            title={<FontAwesomeIcon icon={faUser} />}
            id="basic-nav-dropdown"
          >
            <Link className="dropdown-item" to="/profile">
              Profile
            </Link>
            <div className="dropdown-divider"></div>
            <Link to="/" className="dropdown-item" onClick={handleLogout}>
              Logout
            </Link>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
