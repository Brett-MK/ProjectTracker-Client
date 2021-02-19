import React from "react";
import image from "./images/404Image.svg";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const PageNotFound = () => {
  return (
    <div id="layoutError">
      <div id="layoutError_content">
        <main>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <div className="text-center mt-4">
                  <img
                    className="mb-4 img-error"
                    src={image}
                    alt="Page not found"
                  />
                  <p className="lead">
                    This requested URL was not found on this server.
                  </p>
                  <Link to="/">
                    <FontAwesomeIcon
                      className="mr-1"
                      icon={faArrowLeft}
                    ></FontAwesomeIcon>
                    Return to Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PageNotFound;
