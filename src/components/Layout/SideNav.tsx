import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTable,
  faPlus,
  faTachometerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useSelector } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { getProjectById } from "../../store/projects";

interface TParams {
  projectId: string;
}

const SideNav = ({ match }: RouteComponentProps<TParams>) => {
  const { currentUser } = useAuth();
  const project = useSelector(getProjectById(match.params.projectId));

  if (!project) return null;

  return (
    <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
      <div className="sb-sidenav-menu">
        <div className="nav">
          <Link className="nav-link mt-2" to={`/projects/new`}>
            <div className="sb-nav-link-icon">
              <FontAwesomeIcon icon={faPlus} />
            </div>
            New Project
          </Link>
          <div className="sb-sidenav-menu-heading">Core</div>
          <Link className="nav-link" to={`/projects/${project._id}/dashboard`}>
            <div className="sb-nav-link-icon">
              <FontAwesomeIcon icon={faTachometerAlt} />
            </div>
            Dashboard
          </Link>

          <div className="sb-sidenav-menu-heading">Tasks</div>
          <Link className="nav-link" to={`/projects/${project._id}/tasks`}>
            <div className="sb-nav-link-icon">
              <FontAwesomeIcon icon={faTable} />
            </div>
            All Tasks
          </Link>
        </div>
      </div>
      <div className="sb-sidenav-footer">
        <div className="small">Logged in as:</div>
        {currentUser.displayName}
      </div>
    </nav>
  );
};

export default SideNav;
