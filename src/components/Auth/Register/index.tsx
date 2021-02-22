import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useHistory, Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import { useAuth } from "../../../contexts/AuthContext";
import withAuthLayout from "../../Layout/withAuthLayout";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const { register } = useAuth();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await register(email, password, firstName, lastName);
      history.replace("/projects/new");
    } catch (error) {
      setError("Failed to create an account");
    }

    setLoading(false);
  };

  return (
    <div className="container mb-5">
      <div className="row justify-content-center">
        <div className="col-lg-7">
          <div className="card shadow-lg border-0 rounded-lg mt-5">
            <div className="card-header" style={{ display: "block" }}>
              <h3 className="text-center font-weight-light my-4">
                Create Account
              </h3>
            </div>
            {error && (
              <Alert variant="danger" className="text-center">
                {error}
              </Alert>
            )}
            <div className="card-body">
              <Form>
                <Form.Row>
                  <div className="col-md-6">
                    <Form.Group controlId="exampleForm.ControlInput1">
                      <Form.Label className="small mb-1">First Name</Form.Label>
                      <Form.Control
                        className="py-4"
                        required
                        type="text"
                        placeholder="Enter first name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group controlId="exampleForm.ControlInput2">
                      <Form.Label className="small mb-1">Last Name</Form.Label>
                      <Form.Control
                        className="py-4"
                        required
                        type="text"
                        placeholder="Enter last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </Form.Group>
                  </div>
                </Form.Row>
                <Form.Group controlId="exampleForm.ControlInput3">
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
                <Form.Row>
                  <div className="col-md-6">
                    <Form.Group controlId="exampleForm.ControlInput4">
                      <Form.Label className="small mb-1">Password</Form.Label>
                      <Form.Control
                        className="py-4"
                        required
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group controlId="exampleForm.ControlInput5">
                      <Form.Label className="small mb-1">
                        Confirm Password
                      </Form.Label>
                      <Form.Control
                        className="py-4"
                        required
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </Form.Group>
                  </div>
                </Form.Row>
                <div className="form-group mt-4 mb-0">
                  <Button
                    disabled={loading}
                    className="btn btn-primary btn-block"
                    onClick={handleRegister}
                  >
                    Create Account
                  </Button>
                </div>
              </Form>
            </div>
            <div className="card-footer text-center">
              <div className="small">
                <Link to="/login">Have an account? Go to login</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuthLayout(Register);
