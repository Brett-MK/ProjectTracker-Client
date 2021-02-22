import React, { useState } from "react";
import "../Home/home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Footer = () => {
  const { logout, currentUser } = useAuth();
  const [, setError] = useState("");

  async function handleLogout() {
    setError("");
    try {
      await logout();
    } catch {
      setError("Failed to log out");
    }
  }
  return (
    <footer className="footer bg-dark-home py-5">
      <div className="container-home grid-home grid-3-home">
        <div>
          <h1 className="h1-home">Projectiviti.</h1>
          <p className="p-home">Copyright &copy; 2021</p>
        </div>
        <nav>
          <ul className="ul-home">
            <li>
              <Link className="a-home" to="/">
                Home
              </Link>
            </li>
            {currentUser ? (
              <li>
                <Link
                  className="a-home"
                  to="/"
                  style={{ cursor: "pointer" }}
                  onClick={handleLogout}
                >
                  Logout
                </Link>
              </li>
            ) : (
              <li>
                <Link className="a-home" to="/login">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </nav>
        <div className="social">
          <Link className="a-home" to="">
            <FontAwesomeIcon className="fab fa-2x" icon={faGithub} />
          </Link>
          <Link className="a-home" to="">
            <FontAwesomeIcon className="fab fa-2x" icon={faFacebook} />
          </Link>
          <Link className="a-home" to="">
            <FontAwesomeIcon className="fab fa-2x" icon={faInstagram} />
          </Link>
          <Link className="a-home" to="">
            <FontAwesomeIcon className="fab fa-2x" icon={faTwitter} />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
