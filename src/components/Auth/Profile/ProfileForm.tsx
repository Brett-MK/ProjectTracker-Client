import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import { useHistory } from "react-router-dom";

interface User {
  displayName: string;
  email: string;
  password: string;
}

interface Props {
  user: User;
  onSubmit: (user: User) => void;
}

export const ProfileForm = ({ user, onSubmit }: Props) => {
  const [name, setName] = useState(user.displayName);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const history = useHistory();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    setError("");

    onSubmit({
      displayName: name,
      email: email,
      password: password,
    });
  };

  const handleCancel = () => {
    history.goBack();
  };

  return (
    <>
      {error && (
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>Name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlInput2">
          <Form.Label>Email</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Row>
          <div className="col-md-6">
            <Form.Group controlId="exampleForm.ControlInput3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Leave blank to keep the same"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
          </div>
          <div className="col-md-6">
            <Form.Group controlId="exampleForm.ControlInput4">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Leave blank to keep the same"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>
          </div>
        </Form.Row>
        <Button variant="primary" className="mt-4" type="submit">
          Save
        </Button>
        <Button variant="primary" className="mt-4 ml-2" onClick={handleCancel}>
          Cancel
        </Button>
      </Form>
    </>
  );
};
