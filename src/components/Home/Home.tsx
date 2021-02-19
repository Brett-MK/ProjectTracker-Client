import React, { useState } from "react";
import "./home.css";
import cloud from "./images/cloud.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTasks,
  faSmile,
  faBug,
  faNewspaper,
  faProjectDiagram,
  faRibbon,
  faLaptop,
  faHouseUser,
} from "@fortawesome/free-solid-svg-icons";

import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useSelector } from "react-redux";
import { getAllProjects } from "../../store/projects";
import Footer from "../Layout/Footer";

const Home = () => {
  const { logout, currentUser } = useAuth();
  const [, setError] = useState("");

  const projects = useSelector(getAllProjects());
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
    <div className="body-home">
      <div className="navbar-home">
        <div className="container-home flex-home">
          <h1 className="logo h1-home">Projecti.</h1>
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

      <section className="showcase">
        <div className="container-home grid-home">
          <div className="showcase-text">
            <h1 className="h1-home">Easier Project Tracking</h1>
            <p className="p-home">
              Track projects of all kinds, from large scale enterprise projects
              to individual home projects. Try Projecti today.
            </p>
          </div>
          <div className="card-home showcase-form">
            <h2 className="h2-home">Contact Us</h2>
            <form>
              <div className="form-control-home">
                <input
                  className="input-home"
                  type="text"
                  name="name"
                  placeholder="Name"
                  required
                />
              </div>
              <div className="form-control-home">
                <input
                  className="input-home"
                  type="text"
                  name="company"
                  placeholder="Company Name"
                  required
                />
              </div>
              <div className="form-control-home">
                <input
                  className="input-home"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                />
              </div>
              <input
                type="submit"
                value="Send"
                className="btn-home btn-primary-home input-home"
              />
            </form>
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="container-home">
          <h3 className="stats-heading text-center-home my-1 h3-home">
            Welcome to the best platform for tracking projects of all types.
          </h3>
          <div className="grid-home grid-3-home text-center-home my-5">
            <div>
              <FontAwesomeIcon className="fas fa-3x" icon={faProjectDiagram} />
              <h3 className="h3-home">3,256,356</h3>
              <p className="text-secondary-home p-home">Projects</p>
            </div>
            <div>
              <FontAwesomeIcon className="fas fa-3x" icon={faTasks} />
              <h3 className="h3-home">15,433,565</h3>
              <p className="text-secondary-home p-home">Tasks Finished</p>
            </div>
            <div>
              <FontAwesomeIcon className="fas fa-3x" icon={faSmile} />
              <h3 className="h3-home">143,523</h3>
              <p className="text-secondary-home p-home">Happy Customers</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cloud bg-primary-home my-2 py-2">
        <div className="container-home grid-home">
          <div className="text-center-home">
            <h2 className="lg-home h2-home">Extreme Project Tracking</h2>
            <p className="lead-home my-1 p-home">
              Project traking like you've never seen. Fast, efficient and,
              scalable
            </p>
          </div>
          <img className="img-home" src={cloud} alt="" />
        </div>
      </section>

      <section className="languages">
        <h2 className="md-home text-center-home my-4 h2-home">
          Track Anything
        </h2>
        <div className="container-home flex-home mb-4">
          <div className="card-home">
            <h4>Features</h4>
            <div className="text-center-home">
              <FontAwesomeIcon
                style={{ color: "#3F873F" }}
                className="fas fa-3x"
                icon={faRibbon}
              />
            </div>
          </div>
          <div className="card-home">
            <h4>Bugs</h4>
            <div className="text-center-home">
              <FontAwesomeIcon
                style={{ color: "#67217A" }}
                className="fas fa-3x"
                icon={faBug}
              />
            </div>
          </div>
          <div className="card-home">
            <h4>Docs</h4>
            <div className="text-center-home">
              <FontAwesomeIcon
                style={{ color: "#B9005E" }}
                className="fas fa-3x"
                icon={faNewspaper}
              />
            </div>
          </div>
          <div className="card-home">
            <h4>Software</h4>
            <div className="text-center-home">
              <FontAwesomeIcon
                style={{ color: "#00ADF3" }}
                className="fas fa-3x"
                icon={faLaptop}
              />
            </div>
          </div>
          <div className="card-home">
            <h4>Chores</h4>
            <div className="text-center-home">
              <FontAwesomeIcon
                style={{ color: "#C2392C" }}
                className="fas fa-3x"
                icon={faHouseUser}
              />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
