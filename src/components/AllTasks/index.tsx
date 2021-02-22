import withSideNavLayout from "../Layout/withSideNavLayout";
import { useSelector } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { getProjectById } from "../../store/projects";
import DataTable from "../Dashboard/DataTable";
import { Redirect } from "react-router-dom";

interface TParams {
  projectId: string;
}

const AllTasks = ({ match }: RouteComponentProps<TParams>) => {
  const project = useSelector(getProjectById(match.params.projectId));

  if (!project) return <Redirect to="/project-not-found" />;

  return (
    <div className="container-fluid">
      <h1 className="my-4">All Tasks</h1>
      <DataTable tasks={project.tasks} pageSize={10} height={640} />
    </div>
  );
};

export default withSideNavLayout(AllTasks);
