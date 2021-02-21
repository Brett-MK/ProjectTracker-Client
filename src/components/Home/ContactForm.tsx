import Alert from "react-bootstrap/Alert";
import { useState } from "react";

const ContactForm = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("Thank you for contacting us!");
  };

  return (
    <>
      {message ? (
        <Alert variant="success" className="text-center">
          {message}
        </Alert>
      ) : (
        <form onSubmit={handleSubmit}>
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
      )}
    </>
  );
};

export default ContactForm;
