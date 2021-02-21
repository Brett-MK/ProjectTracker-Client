import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faTable } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import { DataGrid, ValueFormatterParams } from "@material-ui/data-grid";
import Chip from "@material-ui/core/Chip";
import { Task } from "../../api/tasksApi";
import BugReportIcon from "@material-ui/icons/BugReport";
import CreateIcon from "@material-ui/icons/Create";
import DescriptionIcon from "@material-ui/icons/Description";

interface Props {
  tasks: Task[];
  pageSize: number;
  height: number;
}

const DataTable = ({ tasks, pageSize, height }: Props) => {
  const rows = tasks.map((task) => ({
    ...task,
    id: task._id,
    created: new Date(parseInt(task.created)).toLocaleDateString(),
  }));

  const columns = [
    {
      field: "title",
      headerName: "Title",
      headerClassName: "bg-light",
      width: 260,
      renderCell: (params: ValueFormatterParams) => (
        <Link to={`tasks/${params.row.id}`} className="text-truncate">
          {params.row.title}
        </Link>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      headerClassName: "bg-light",
      width: 302,
      renderCell: (params: ValueFormatterParams) => {
        if (params.row.status === "Open") {
          return (
            <Chip
              label={params.row.status}
              color="secondary"
              style={{ backgroundColor: "#007bff" }}
            />
          );
        } else if (params.row.status === "Closed") {
          return (
            <Chip
              label={params.row.status}
              color="primary"
              style={{ backgroundColor: "#dc3545" }}
            />
          );
        } else {
          return (
            <Chip
              label={params.row.status}
              color="secondary"
              style={{ backgroundColor: "#28a745" }}
            />
          );
        }
      },
    },
    {
      field: "type",
      headerName: "Type",
      headerClassName: "bg-light",
      width: 260,
      renderCell: (params: ValueFormatterParams) => {
        if (params.row.type === "Bug") {
          return (
            <Chip
              label={params.row.type}
              color="secondary"
              style={{ backgroundColor: "#dc3545" }}
              icon={<BugReportIcon />}
            />
          );
        } else if (params.row.type === "Feature Request") {
          return (
            <Chip
              label={params.row.type}
              color="primary"
              style={{ backgroundColor: "#28a745" }}
              icon={<CreateIcon />}
            />
          );
        } else {
          return (
            <Chip
              label={params.row.type}
              color="secondary"
              style={{ backgroundColor: "#007bff" }}
              icon={<DescriptionIcon />}
            />
          );
        }
      },
    },
    {
      field: "priority",
      headerName: "Priority",
      headerClassName: "bg-light",
      width: 260,
    },
    {
      field: "assignedTo",
      headerName: "Assigned To",
      headerClassName: "bg-light",
      width: 260,
    },
    {
      field: "created",
      headerName: "Created On",
      headerClassName: "bg-light",
      type: "date",
      width: 260,
    },
  ];

  return (
    <div className="card mb-4">
      <div
        className="card-header"
        style={{ display: "flex", alignItems: "center" }}
      >
        <FontAwesomeIcon className="mr-1" icon={faTable} />
        Open Tasks
        <Link to={(location) => `tasks/new`} style={{ marginLeft: "auto" }}>
          <Button variant="primary">Add</Button>
        </Link>
      </div>

      <div className="card-body">
        <div style={{ height: height, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={pageSize}
            sortModel={[
              {
                field: "status",
                sort: "asc",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default DataTable;
