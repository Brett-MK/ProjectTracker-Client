import { useHistory } from "react-router-dom";
import { createProject } from "../../store/projects";
import { useDispatch } from "react-redux";
import ProjectForm from "./ProjectForm";
import withAuthLayout from "../Layout/withAuthLayout";
import { BasicProject } from "../../api/projectsApi";
import { unwrapResult } from "@reduxjs/toolkit";
import { AppDispatch } from "../../store/configureStore";
import Alert from "react-bootstrap/Alert";
import { useState } from "react";

const AddProject = () => {
  const [error] = useState("");

  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = async (project: BasicProject) => {
    const response = await dispatch(createProject(project));
    const addedProject = unwrapResult(response);
    history.push(`/projects/${addedProject._id}/dashboard`);
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-12 mt-3 mb-5">
          <div className="card shadow-lg border-0 rounded-lg mt-5">
            <div className="card-header" style={{ display: "block" }}>
              <h3 className="text-center font-weight-light my-4">
                New Project
              </h3>
            </div>
            {error && (
              <Alert variant="danger" className="text-center">
                {error}
              </Alert>
            )}
            <div className="card-body">
              <ProjectForm onSubmit={handleSubmit} isNewProject={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuthLayout(AddProject);
