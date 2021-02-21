import { useAuth } from "../../../contexts/AuthContext";
import { useState } from "react";
import { ProfileForm } from "./ProfileForm";
import { useHistory } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import withAuthLayout from "../../Layout/withAuthLayout";

interface User {
  displayName: string;
  email: string;
  password: string;
}

const Profile = () => {
  const [error, setError] = useState("");

  const history = useHistory();
  const { currentUser, updateEmail, updatePassword, updateName } = useAuth();

  const handleSubmit = (user: User) => {
    const promises = [];
    setError("");
    if (user.email !== currentUser.email) {
      promises.push(updateEmail(user.email));
    }

    if (user.displayName !== currentUser.displayName) {
      promises.push(updateName(user.displayName));
    }
    if (user.password) {
      promises.push(updatePassword(user.password));
    }

    Promise.all(promises)
      .then(() => {
        history.goBack();
      })
      .catch(() => {
        setError("Failed to update profile");
      });
  };

  if (!currentUser) return null;

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-10 mt-4">
          <div className="card shadow-lg border-0 rounded-lg mt-5">
            <div className="card-header" style={{ display: "block" }}>
              <h3 className="text-center font-weight-light my-4">Profile</h3>
            </div>
            {error && (
              <Alert variant="danger" className="text-center">
                {error}
              </Alert>
            )}
            <div className="card-body">
              <ProfileForm user={currentUser} onSubmit={handleSubmit} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuthLayout(Profile);
