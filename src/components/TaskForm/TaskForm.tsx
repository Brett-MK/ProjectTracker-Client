import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Col } from "react-bootstrap";
import { Task, BasicTask } from "../../api/tasksApi";
import { useHistory } from "react-router-dom";
import { TinyMceEditor } from "../Common/TinyMceEditor";

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
      <Form.Group>
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
        <Form.Group as={Col}>
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
        <Form.Group as={Col}>
          <Form.Label>Type</Form.Label>
          <Form.Control
            required
            as="select"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">Choose...</option>
            <option>Issue</option>
            <option>Feature Request</option>
            <option>Document Change</option>
          </Form.Control>
        </Form.Group>

        {!isNewTask ? (
          <Form.Group as={Col}>
            <Form.Label>Status</Form.Label>
            <Form.Control
              required
              as="select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option>Open</option>
              <option>Active</option>
              <option>Closed</option>
            </Form.Control>
          </Form.Group>
        ) : (
          ""
        )}
        <Form.Group as={Col}>
          <Form.Label>Assigned</Form.Label>
          <Form.Control
            type="text"
            placeholder="Assigned To"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
          />
        </Form.Group>
      </Form.Row>
      <Form.Label>Description</Form.Label>
      <TinyMceEditor value={description} onEditorChange={setDescription} />
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
