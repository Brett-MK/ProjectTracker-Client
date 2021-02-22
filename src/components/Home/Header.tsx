import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useSelector } from "react-redux";
import { getAllProjects } from "../../store/projects";

const Header = () => {
  const { logout, currentUser } = useAuth();
  const projects = useSelector(getAllProjects());
  async function handleLogout() {
    await logout();
  }

  return (
    <div className="navbar-home">
      <div className="container-home flex-home">
        <h1 className="logo h1-home">Projectiviti.</h1>
        <nav>
          <ul className="ul-home">
            <li>
              <Link className="a-home" to="/">
                Home
              </Link>
            </li>
            {currentUser ? (
              <>
                {projects.length !== 0 ? (
                  <li>
                    <Link
                      className="a-home"
                      to={`/projects/${projects[0]._id}/dashboard`}
                    >
                      Dashboard
                    </Link>
                  </li>
                ) : (
                  <li>
                    <Link className="a-home" to="/projects/new">
                      New Project
                    </Link>
                  </li>
                )}
                <li>
                  <a
                    className="a-home"
                    href="/"
                    style={{ cursor: "pointer" }}
                    onClick={handleLogout}
                  >
                    Logout
                  </a>
                </li>
              </>
            ) : (
              <li>
                <Link className="a-home" to="/login">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
