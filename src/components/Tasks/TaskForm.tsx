import { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Col } from "react-bootstrap";
import { Task, BasicTask } from "../../api/tasksApi";
import { useHistory } from "react-router-dom";

interface Props {
  task?: Task;
  onSubmit: (task: BasicTask) => void;
  isNewTask?: boolean;
}

const TaskForm = ({ task, onSubmit, isNewTask = false }: Props) => {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [priority, setPriority] = useState(task?.priority || "");
  const [assignedTo, setAssignedTo] = useState(task?.assignedTo || "");
  const [status, setStatus] = useState(task?.status || "");
  const [type, setType] = useState(task?.type || "");

  const history = useHistory();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSubmit({
      title: title,
      description: description,
      priority: priority,
      assignedTo: assignedTo,
      status: isNewTask ? "Open" : status,
      type: type,
    });
  };

  const handleCancel = () => {
    history.goBack();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="exampleForm.ControlInput1">
        <Form.Label>Title</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>
      <Form.Row>
        <Form.Group as={Col} controlId="exampleForm.ControlInput2">
          <Form.Label>Priority</Form.Label>
          <Form.Control
            required
            as="select"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="">Choose...</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Form.Control>
        </Form.Group>
        <Form.Group as={Col} controlId="exampleForm.ControlInput3">
          <Form.Label>Type</Form.Label>
          <Form.Control
            required
            as="select"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">Choose...</option>
            <option>Bug</option>
            <option>Feature Request</option>
            <option>Documentation</option>
          </Form.Control>
        </Form.Group>
        <Form.Group as={Col} controlId="exampleForm.ControlInput4">
          <Form.Label>Assigned To</Form.Label>
          <Form.Control
            type="text"
            placeholder="Assigned To"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
          />
        </Form.Group>
        {!isNewTask ? (
          <Form.Group as={Col} controlId="exampleForm.ControlInput5">
            <Form.Label>Status</Form.Label>
            <Form.Control
              required
              as="select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option>Open</option>
              <option>Closed</option>
              <option>Active</option>
            </Form.Control>
          </Form.Group>
        ) : (
          ""
        )}
      </Form.Row>
      <Form.Label>Description</Form.Label>
      <Editor
        apiKey={process.env.REACT_APP_TINYMCEKEY}
        init={{
          height: 400,
          menubar: false,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          toolbar:
            "undo redo | formatselect | bold italic backcolor alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
        }}
        value={description}
        onEditorChange={(e) => setDescription(e)}
      />
      <Button variant="primary" className="mt-4" type="submit">
        Save
      </Button>
      <Button variant="primary" className="mt-4 ml-2" onClick={handleCancel}>
        Cancel
      </Button>
    </Form>
  );
};

export default TaskForm;
