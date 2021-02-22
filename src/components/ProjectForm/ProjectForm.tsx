import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { BasicProject, Project } from "../../api/projectsApi";
import { useHistory } from "react-router-dom";
import { TinyMceEditor } from "../Common/TinyMceEditor";

interface Props {
  project?: Project;
  onSubmit: (project: BasicProject) => void;
  isNewProject?: boolean;
}

const ProjectForm = ({ project, onSubmit, isNewProject = false }: Props) => {
  const [title, setTitle] = useState(project?.title || "");
  const [description, setDescription] = useState(project?.description || "");

  const history = useHistory();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSubmit({
      title: title,
      description: description,
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
          minLength={3}
          maxLength={30}
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>
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

export default ProjectForm;
