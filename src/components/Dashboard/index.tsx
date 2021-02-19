import AreaChart from "./AreaChart";
import withSideNavLayout from "../Layout/withSideNavLayout";
import { useSelector } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { getProjectById } from "../../store/projects";
import { BarChart } from "./BarChart";
import DataTable from "./DataTable";
import Dropdown from "react-bootstrap/Dropdown";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, Redirect } from "react-router-dom";

interface TParams {
  projectId: string;
}

const Dashboard = ({ match }: RouteComponentProps<TParams>) => {
  const project = useSelector(getProjectById(match.params.projectId));

  if (!project) return <Redirect to="/project-not-found" />;

  return (
    <div className="container-fluid">
      <div className="d-flex">
        <h1 className="my-4">{project.title} Dashboard</h1>
        <Dropdown style={{ margin: "2rem 2rem 2rem auto" }}>
          <Dropdown.Toggle>
            <FontAwesomeIcon icon={faEllipsisH} />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Link className="dropdown-item" to={`/projects/${project._id}`}>
              Edit Project
            </Link>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="row">
        <AreaChart project={project} />
        <BarChart project={project} />
      </div>
      <DataTable
        tasks={project.tasks.filter((task) => task.status !== "Closed")}
        pageSize={5}
        height={370}
      />
    </div>
  );
};

export default withSideNavLayout(Dashboard);
