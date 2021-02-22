import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import Alert from "react-bootstrap/Alert";
import withAuthLayout from "../../Layout/withAuthLayout";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const { resetPassword } = useAuth();

  const handleReset = async () => {
    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(email);
      setMessage("Check your inbox for further instructions");
    } catch (error) {
      setError("Failed to reset password");
    }

    setLoading(false);
  };

  return (
    <div className="container mb-5">
      <div className="row justify-content-center">
        <div className="col-lg-5">
          <div className="card shadow-lg border-0 rounded-lg mt-5">
            <div className="card-header" style={{ display: "block" }}>
              <h3 className="text-center font-weight-light my-4">
                Password Recovery
              </h3>
            </div>
            {error && (
              <Alert variant="danger" className="text-center">
                {error}
              </Alert>
            )}
            {message && (
              <Alert variant="success" className="text-center">
                {message}
              </Alert>
            )}
            <div className="card-body">
              <div className="small mb-3 text-muted">
                Enter your email address and we will send you a link to reset
                your password.
              </div>
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
                <Form.Group
                  controlId="exampleForm.ControlInput2"
                  className="d-flex align-items-center justify-content-between mt-4 mb-0"
                >
                  <Link className="small" to="/login">
                    Return to login
                  </Link>
                  <Button
                    disabled={loading}
                    className="btn btn-primary"
                    onClick={handleReset}
                  >
                    Reset Password
                  </Button>
                </Form.Group>
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

export default withAuthLayout(ForgotPassword);
