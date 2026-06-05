import {
  useState,
  useEffect
} from "react";

import {
  getProjects,
  createProject,
  deleteProject
} from "../api/projectApi";

function Projects() {

  const [projects, setProjects] =
    useState([]);

  const [projectName,
    setProjectName] =
    useState("");

  const loadProjects =
    async () => {

      try {

        const response =
          await getProjects();

        setProjects(
          response.data
        );

      } catch (error) {

        console.error(
          error
        );

      }
    };

  useEffect(() => {

    loadProjects();

  }, []);

  const handleAddProject =
    async () => {

      if (
        !projectName.trim()
      ) {
        alert("Enter project name");
        return;
      }

      const newProject = {
        id: Date.now(),
        name: projectName
      };

      try {

        await createProject(
          newProject
        );

        await loadProjects();

        setProjectName("");

      } catch (error) {

        console.error(
          error
        );

      }
    };

  const handleDeleteProject =
    async (id) => {

      try {

        await deleteProject(
          id
        );

        await loadProjects();

      } catch (error) {

        console.error(
          error
        );

      }
    };

  return (
    <div
      className="container mt-4"
    >

      <h1 className="display-4 fw-bold mb-2">
  📁 Projects ({projects.length})
</h1>

<p className="text-muted mb-4">
  Organize and manage all your project workspaces
</p>

<div className="card shadow-lg border-0 text-center p-4 mb-4">
  <h6 className="text-muted">
    Total Projects
  </h6>
  <h2 className="fw-bold">
    {projects.length}
  </h2>
</div>

      <div className="card shadow-lg border-0 p-4 mb-4">

  <h5 className="mb-3">
    Create New Project
  </h5>

  <input
    type="text"
    className="form-control mb-3"
    placeholder="Enter Project Name"
    value={projectName}
    onChange={(e) =>
      setProjectName(
        e.target.value
      )
    }
  />

  <button
    className="btn btn-primary w-100"
    onClick={
      handleAddProject
    }
  >
    ➕ Add Project
  </button>

</div>

      <div className="row">

  {
  projects.length === 0 && (
    <div className="alert alert-info">
      No projects created yet.
    </div>
  )
}

  {projects.map(
    (project) => (

      <div
        key={project.id}
        className="col-md-4 mb-4"
      >

        <div
          className="
          card
          shadow-lg
          border-0
          p-4
          h-100
          "
        >

          <h4 className="fw-bold">
            📁 {project.name}
          </h4>

          <p className="text-muted small">
            Created and ready for task management
          </p>

          <button
            className="
            btn
            btn-outline-danger
            mt-auto
            "
            onClick={() => {
  if (
    window.confirm(
      "Delete this project?"
    )
  ) {
    handleDeleteProject(
      project.id
    );
  }
}}
          >
            Delete Project
          </button>

        </div>

      </div>

    )
  )}

</div>

    </div>
  );
}

export default Projects;