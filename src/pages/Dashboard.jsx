import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


function Dashboard() {

  const { tasks, user } = useContext(AuthContext);

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    task => task.status === "Completed"
  ).length;

  const pendingTasks = tasks.filter(
    task => task.status === "Pending"
  ).length;

  const highPriorityTasks = tasks.filter(
    task => task.priority === "High"
  ).length;

  const completionRate =
    totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const today = new Date().toISOString().split("T")[0];

  const dueTodayTasks = tasks.filter(
    task => task.dueDate === today
  ).length;

  const overdueTasks = tasks.filter(
    task =>
      task.dueDate &&
      task.dueDate < today &&
      task.status !== "Completed"
  ).length;


  return (
    <div className="container mt-4">

      <style>{`
        .dashboard-card {
          transition: 0.3s;
        }
        .dashboard-card:hover {
          transform: translateY(-5px);
        }
      `}</style>

      <h1 className="display-4 fw-bold">
        📊 Dashboard
      </h1>

      <p className="text-muted fs-5 mb-4">
        Monitor tasks, priorities and project progress
      </p>

      <div className="alert alert-primary shadow-sm">
        🎯 You currently have
        <strong> {pendingTasks} pending</strong> tasks and
        <strong> {highPriorityTasks} high priority</strong> tasks.
      </div>


      <div className="row mb-3">

        <div className="col-md-4 mb-3">
          <div className="card shadow-lg border-0 p-4 h-100 bg-primary text-white dashboard-card">
            <h5>📋 Total Tasks</h5>
            <h2 className="fw-bold">{totalTasks}</h2>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card shadow-lg border-0 p-4 h-100 bg-success text-white dashboard-card">
            <h5>✅ Completed</h5>
            <h2 className="fw-bold">{completedTasks}</h2>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card shadow-lg border-0 p-4 h-100 bg-warning text-dark dashboard-card">
            <h5>⏳ Pending</h5>
            <h2 className="fw-bold">{pendingTasks}</h2>
          </div>
        </div>

      </div>

      <div className="row mb-3">

        <div className="col-md-4 mb-3">
          <div className="card shadow-lg border-0 p-4 h-100 bg-info text-white dashboard-card">
            <h5>📅 Due Today</h5>
            <h2 className="fw-bold">{dueTodayTasks}</h2>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card shadow-lg border-0 p-4 h-100 bg-secondary text-white dashboard-card">
            <h5>🔥 High Priority</h5>
            <h2 className="fw-bold">{highPriorityTasks}</h2>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card shadow-lg border-0 p-4 h-100 bg-danger text-white dashboard-card">
            <h5>⚠️ Overdue</h5>
            <h2 className="fw-bold">{overdueTasks}</h2>
          </div>
        </div>

      </div>

      <div className="row mb-4">
        <div className="col-md-12">
          <div className="card shadow-lg border-0 p-4 dashboard-card">

            <h5>📈 Completion Rate</h5>

            <h2 className="fw-bold">
              {completionRate.toFixed(0)}%
            </h2>

            <div className="progress mt-3" style={{ height: "25px" }}>
              <div
                className="progress-bar bg-success"
                style={{ width: `${completionRate}%` }}
              >
                {completionRate.toFixed(0)}%
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="card shadow-lg border-0 mt-2">
        <div className="card-body">

          <h4 className="mb-3">🚀 Recent Tasks</h4>

          {tasks.length === 0 ? (
            <p className="text-muted">No tasks available.</p>
          ) : (
            <table className="table table-hover align-middle">

              <thead className="table-light">
                <tr>
                  <th>Task</th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th>Due Date</th>
                </tr>
              </thead>

              <tbody>
                {tasks.slice(0, 5).map(task => (
                  <tr key={task.id}>

                    <td className="fw-bold">{task.title}</td>

                    <td>
                      <span
                        className={
                          task.status === "Completed"
                            ? "badge bg-success"
                            : task.status === "In Progress"
                            ? "badge bg-primary"
                            : "badge bg-warning text-dark"
                        }
                      >
                        {task.status}
                      </span>
                    </td>

                    <td>
                      <span
                        className={
                          task.priority === "High"
                            ? "badge bg-danger"
                            : task.priority === "Medium"
                            ? "badge bg-warning text-dark"
                            : "badge bg-success"
                        }
                      >
                        {task.priority}
                      </span>
                    </td>

                    <td className="text-muted small">
                      📅 {task.dueDate || "—"}
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          )}

        </div>
      </div>

    </div>
  );
}

export default Dashboard;