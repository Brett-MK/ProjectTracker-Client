import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import { useAuth } from "../../../contexts/AuthContext";
import withAuthLayout from "../../Layout/withAuthLayout";
import { useDispatch } from "react-redux";
import { fetchProjects, setToken } from "../../../store/projects";
import { unwrapResult } from "@reduxjs/toolkit";
import { AppDispatch } from "../../../store/configureStore";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const dispatch: AppDispatch = useDispatch();
  const { login, getIdToken } = useAuth();

  const handleLogin = async () => {
    try {
      setError("");
      setLoading(true);
      await login(email, password);

      setToken(await getIdToken());
      const response = await dispatch(fetchProjects());
      const projects = unwrapResult(response);

      if (projects.length !== 0) {
        history.replace(`/projects/${projects[0]._id}/dashboard`);
      } else {
        history.replace("/projects/new");
      }
    } catch (error) {
      setError("Failed to login");
    }

    setLoading(false);
  };

  return (
    <div className="container mb-5">
      <div className="row justify-content-center">
        <div className="col-lg-5">
          <div className="card shadow-lg border-0 rounded-lg mt-5">
            <div className="card-header" style={{ display: "block" }}>
              <h3 className="text-center font-weight-light my-4">Login</h3>
            </div>
            {error && (
              <Alert variant="danger" className="text-center">
                {error}
              </Alert>
            )}
            <div className="card-body">
              <Form>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label className="small mb-1">Email</Form.Label>
                  <Form.Control
                    className="py-4"
                    required
                    type="email"
                    placeholder="Enter email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput2">
                  <Form.Label className="small mb-1">Password</Form.Label>
                  <Form.Control
                    className="py-4"
                    required
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput3">
                  <div className="custom-control custom-checkbox">
                    <Form.Control
                      className="custom-control-input"
                      required
                      type="checkbox"
                      placeholder="Enter password"
                    />
                    <Form.Label className="custom-control-label">
                      Remember Password
                    </Form.Label>
                  </div>
                </Form.Group>
                <div className="form-group d-flex align-items-center justify-content-between mt-4 mb-0">
                  <Link className="small" to="/forgot-password">
                    Forgot Password?
                  </Link>
                  <Button
                    disabled={loading}
                    className="btn btn-primary"
                    onClick={handleLogin}
                  >
                    Login
                  </Button>
                </div>
              </Form>
            </div>
            <div className="card-footer text-center">
              <div className="small">
                <Link to="/register">Need an account? Sign up!</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuthLayout(Login);
