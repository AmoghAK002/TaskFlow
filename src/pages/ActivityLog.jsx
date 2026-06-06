import { useEffect, useState } from "react";
import axios from "axios";

function ActivityLog() {

  const [logs, setLogs] = useState([]);

useEffect(() => {

  axios
    .get(
      "https://taskflow-ai-backend-fh74.onrender.com/activity-logs"
    )
    .then((res) => {

      setLogs(res.data);

    })
    .catch((err) => {

      console.error(
        "Failed to fetch logs",
        err
      );

    });

}, []);

  return (
    <div className="container mt-4">

      <h1 className="display-5 fw-bold">
        📝 Activity Logs
      </h1>

      <p className="text-muted">
        Track all task activities
      </p>

      <div className="card shadow-lg border-0">

        <div className="card-body">

          <table className="table table-hover">

            <thead>

              <tr>
                <th>Action</th>
                <th>Task</th>
                <th>Timestamp</th>
              </tr>

            </thead>

            <tbody>

  {logs.length === 0 ? (

    <tr>
      <td
        colSpan="3"
        className="text-center text-muted py-4"
      >
        No activity found.
      </td>
    </tr>

  ) : (

    logs.map((log, index) => (

      <tr key={index}>

        <td>

          {log.action === "Created Task" && (
  <span className="badge bg-success">
    Created Task
  </span>
)}

{log.action === "Updated Task" && (
  <span className="badge bg-warning text-dark">
    Updated Task
  </span>
)}

{log.action === "Deleted Task" && (
  <span className="badge bg-danger">
    Deleted Task
  </span>
)}

{log.action === "Created Project" && (
  <span className="badge bg-primary">
    Created Project
  </span>
)}

{log.action === "Deleted Project" && (
  <span className="badge bg-dark">
    Deleted Project
  </span>
)}

        </td>

        <td>{log.item}</td>

        <td>{log.timestamp}</td>

      </tr>

    ))

  )}

</tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default ActivityLog;