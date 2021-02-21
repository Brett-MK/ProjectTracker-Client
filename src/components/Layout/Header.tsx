import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import ProjectsDropdown from "./ProjectsDropdown";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";
import { useHistory, RouteComponentProps } from "react-router";

interface TParams {
  projectId: string;
}

const Header = ({ match }: RouteComponentProps<TParams>) => {
  const [, setError] = useState("");

  const { logout, currentUser } = useAuth();

  const history = useHistory();

  async function handleLogout() {
    setError("");
    try {
      await logout();
      history.push("/");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">
        Projectivity
      </Link>

      {currentUser ? (
        <ProjectsDropdown selectedProjectId={match.params.projectId} />
      ) : (
        ""
      )}

      <form className="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0"></form>
      <ul className="navbar-nav ml-auto ml-md-0">
        {currentUser ? (
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              id="userDropdown"
              href="/"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <FontAwesomeIcon icon={faUser} />
            </a>
            <div className="dropdown-menu dropdown-menu-right">
              <Link className="dropdown-item" to="/profile">
                Profile
              </Link>
              <div className="dropdown-divider"></div>
              <a href="/" className="dropdown-item" onClick={handleLogout}>
                Logout
              </a>
            </div>
          </li>
        ) : (
          <Link to="/login">
            <button className="btn btn-primary">Login</button>
          </Link>
        )}
      </ul>
    </nav>
  );
};

export default Header;
