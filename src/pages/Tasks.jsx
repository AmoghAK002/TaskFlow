import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  getProjects
} from "../api/projectApi";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask
} from "../api/taskApi";
import {
  generateTaskDescription
} from "../api/geminiApi";
import {

collection,

onSnapshot

}

from "firebase/firestore";

import {

db

}

from "../firebase";

import {

DragDropContext,

Droppable,

Draggable

}

from "@hello-pangea/dnd";

function Tasks() {

const {

user,

role,

tasks,

setTasks,

loading,

loadTasks

} = useContext(AuthContext);  

  const [taskTitle, setTaskTitle] = useState("");
const [priority, setPriority] = useState("Medium");
const [searchTerm, setSearchTerm] = useState("");
const [description, setDescription] =
  useState("");

const [dueDate, setDueDate] =
  useState("");
  const [assignedTo,
  setAssignedTo] =
  useState("");
const [projects, setProjects] =
  useState([]);

const [selectedProject,
  setSelectedProject] =
  useState("");

  const [projectFilter,
  setProjectFilter] =
  useState("");

 const loadProjects = () => {

const unsubscribe =

onSnapshot(

collection(

db,

"projects"

),

(snapshot)=>{

const data =

snapshot.docs.map(

(doc)=>({

id:

doc.id,

...doc.data()

})

);

setProjects(data);

},

(error)=>{

console.error(error);

}

);

return unsubscribe;

};

const onDragEnd = async (result) => {

  if (!result.destination) {

    return;

  }

  const taskId = Number(
    result.draggableId
  );

  const newStatus =
    result.destination.droppableId;

  const taskToUpdate =
    tasks.find(

      task =>

      String(task.id) ===

      result.draggableId

    );

  if (!taskToUpdate) {

    return;

  }

  const updatedTask = {

    ...taskToUpdate,

    status: newStatus

  };

  try {

    await updateTask(

      taskId,

      updatedTask

    );

  }

  catch (error) {

    console.error(error);

  }

};

  const handleAddTask = async () => {

if(role !== "admin"){

alert(
"Access Denied"
);

return;

}

 if (!taskTitle.trim()) {
  alert("Task title is required");
  return;
}

if (taskTitle.trim().length < 3) {
  alert("Task title must be at least 3 characters");
  return;
}

if (!selectedProject) {
  alert("Please select a project");
  return;
}

if (!assignedTo.trim()) {
  alert("Assigned To field is required");
  return;
}

const emailRegex =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(assignedTo)) {
  alert("Enter a valid email address");
  return;
}

if (!dueDate) {
  alert("Please select a due date");
  return;
}

  const newTask = {
  id: Date.now(),
  title: taskTitle,
  description,
  dueDate,
  assignedTo,
  priority,
  status: "Pending",
  projectName: selectedProject
};

  try {

    await createTask(newTask);

    await loadTasks();

    setTaskTitle("");
setDescription("");
setDueDate("");
setAssignedTo("");
setPriority("Medium");
setSelectedProject("");

  } catch (error) {
    console.error(error);
  }
};

  const handleGenerateAI =
  async () => {

    if (
      !taskTitle.trim()
    ) return;

    try {

      const response =
        await generateTaskDescription(
          taskTitle
        );

      setDescription(
        response.data.description
      );

    } catch (error) {

      console.error(error);

    }
};


  const handleDeleteTask = async (id) => {

if(role !== "admin"){

alert(
"Access Denied"
);

return;

}

  try {

    await deleteTask(id);

    await loadTasks();

  } catch (error) {
    console.error(error);
  }
};

  const handleCompleteTask = async (id) => {

  const taskToUpdate = tasks.find(
    task => task.id === id
  );

  const updatedTask = {
    ...taskToUpdate,
    status: "Completed"
  };

  try {

    await updateTask(
      id,
      updatedTask
    );

    await loadTasks();

  } catch (error) {
    console.error(error);
  }
};


  const handleStatusChange =
  async (
    id,
    newStatus
  ) => {

    const taskToUpdate =
      tasks.find(
        task =>
          task.id === id
      );

    const updatedTask = {
      ...taskToUpdate,
      status: newStatus
    };

    try {

      await updateTask(
        id,
        updatedTask
      );

      await loadTasks();

    } catch (error) {

      console.error(
        error
      );

    }
  };

  const handleEditTask = async (id) => {

if(role !== "admin"){

alert(
"Access Denied"
);

return;

}

  const taskToEdit = tasks.find(
    task => task.id === id
  );

  const newTitle = window.prompt(
    "Edit Task",
    taskToEdit.title
  );

  if (newTitle === null) return;

  const updatedTask = {
    ...taskToEdit,
    title:
      newTitle.trim() ||
      taskToEdit.title
  };

  try {

    await updateTask(
      id,
      updatedTask
    );

    await loadTasks();

  } catch (error) {
    console.error(error);
  }
};

useEffect(() => {

const unsubscribe =

loadProjects();

return ()=>{

unsubscribe();

};

}, []);

useEffect(() => {

  console.log(
    "Projects:",
    projects
  );

}, [projects]);

  const filteredTasks =
  tasks.filter((task) => {

    const matchesSearch =
      task.title
        .toLowerCase()
        .includes(
          searchTerm
            .toLowerCase()
        );

    const matchesProject =
      projectFilter === ""
        ? true
        : task.projectName ===
          projectFilter;

    return (
      matchesSearch &&
      matchesProject
    );

  });

const todoTasks =
  filteredTasks.filter(
    task =>
      task.status ===
      "Pending"
  );

const progressTasks =
  filteredTasks.filter(
    task =>
      task.status ===
      "In Progress"
  );

const completedTasks =
  filteredTasks.filter(
    task =>
      task.status ===
      "Completed"
  );

if (loading) {
  return (
    <div className="text-center mt-5">
      <h3>Loading Tasks...</h3>
    </div>
  );
}

 return (

<DragDropContext

onDragEnd={onDragEnd}

>

<div className="container mt-4">

    <h1 className="display-4 fw-bold mb-2">
  📋 Task Management
</h1>

<p className="text-muted fs-5">
  Manage tasks across projects
</p>

    <h4 className="mb-3">
      Welcome {user}
    </h4>
{
  role === "admin" && (

    <div className="card shadow-lg border-0 p-4 mb-4">

      <label className="form-label fw-bold">
  Task Title
</label>

<input
  type="text"
  className="form-control mb-2"
  placeholder="Enter Task"
  value={taskTitle}
  onChange={(e) =>
    setTaskTitle(e.target.value)
  }
/>

     <label className="form-label fw-bold">
  Description
</label>

<textarea
  className="form-control mb-2"
  placeholder="Task Description"
  value={description}
  onChange={(e) =>
    setDescription(
      e.target.value
    )
  }
/>

<label className="form-label fw-bold">
  Due Date
</label>

<input
  type="date"
  className="form-control mb-2"
  value={dueDate}
  onChange={(e) =>
    setDueDate(
      e.target.value
    )
  }
/>
  <label className="form-label fw-bold">
  Priority
</label>

      <select
        className="form-select mb-2"
        value={priority}
        onChange={(e) =>
          setPriority(e.target.value)
        }
      >
        <option value="High">
          High
        </option>

        <option value="Medium">
          Medium
        </option>

        <option value="Low">
          Low
        </option>
      </select>
        <label className="form-label fw-bold">
  Assigned To
</label>

<input
  type="email"
  className="form-control mb-2"
  placeholder="Enter user email"
  value={assignedTo}
  onChange={(e) =>
    setAssignedTo(
      e.target.value
    )
  }
/>
      <label className="form-label fw-bold">
  Project
</label>
        <select
  className="form-select mb-2"
  value={selectedProject}
  onChange={(e) =>
    setSelectedProject(
      e.target.value
    )
  }
>

  <option value="">
    Select Project
  </option>

  {projects.map(
    (project) => (
      <option
        key={project.id}
        value={project.name}
      >
        {project.name}
      </option>
    )
  )}

</select>
      <div className="d-grid gap-2">

  <button
    className="btn btn-success"
    onClick={handleGenerateAI}
  >
    🤖 Generate with AI
  </button>

  <button
    className="btn btn-primary"
    onClick={handleAddTask}
  >
    ➕ Add Task
  </button>

</div>

    </div>
  )
}

    <input
      type="text"
      className="form-control mb-3"
      placeholder="Search Tasks"
      value={searchTerm}
      onChange={(e) =>
        setSearchTerm(e.target.value)
      }
    />

    <select
  className="form-select mb-3"
  value={projectFilter}
  onChange={(e) =>
    setProjectFilter(
      e.target.value
    )
  }
>

  <option value="">
    All Projects
  </option>

  {projects.map(
    (project) => (
      <option
        key={project.id}
        value={project.name}
      >
        {project.name}
      </option>
    )
  )}

</select>
<div className="row mb-4">

  <div className="col-md-3">

    <div className="card shadow text-center p-3">

      <h6>📋 Total</h6>

      <h3>{tasks.length}</h3>

    </div>

  </div>

  <div className="col-md-3">

    <div className="card shadow text-center p-3">

      <h6>⏳ Todo</h6>

      <h3>{todoTasks.length}</h3>

    </div>

  </div>

  <div className="col-md-3">

    <div className="card shadow text-center p-3">

      <h6>🚀 In Progress</h6>

      <h3>{progressTasks.length}</h3>

    </div>

  </div>

  <div className="col-md-3">

    <div className="card shadow text-center p-3">

      <h6>✅ Completed</h6>

      <h3>{completedTasks.length}</h3>

    </div>

  </div>

</div>
 <div className="row">

  {/* TODO COLUMN */}

  <div className="col-md-4">

<Droppable droppableId="Pending">

{(provided) => (

<div

className="card shadow p-3 border-warning"

ref={provided.innerRef}

{...provided.droppableProps}

>

<h3 className="text-center text-warning fw-bold">

TODO

</h3>

{

todoTasks.map(

(task, index) => (

<Draggable

key={String(task.id)}

draggableId={String(task.id)}

index={index}

>

{(provided) => (

<div

ref={provided.innerRef}

{...provided.draggableProps}

{...provided.dragHandleProps}

className="card shadow-sm border-warning p-3 mb-3 h-100"

>

<h6 className="fw-bold">

{task.title}

</h6>

<span

className={

task.status === "Completed"

? "badge bg-success mb-2"

: task.status === "In Progress"

? "badge bg-primary mb-2"

: "badge bg-warning text-dark mb-2"

}

>

{task.status}

</span>

<p className="small text-muted">

{task.description?.length > 80

? task.description.substring(0, 80) + "..."

: task.description}

</p>

<span

className={

task.priority === "High"

? "badge bg-danger mb-2"

: task.priority === "Medium"

? "badge bg-warning text-dark mb-2"

: "badge bg-success mb-2"

}

>

{task.priority}

</span>

<small className="text-muted d-block">

📁 {task.projectName}

</small>

<small className="text-primary d-block">

👤 {task.assignedTo}

</small>

<small

className={

task.dueDate &&

task.dueDate <

new Date()

.toISOString()

.split("T")[0]

&&

task.status !== "Completed"

? "text-danger fw-bold d-block"

: "text-secondary d-block"

}

>

📅 {task.dueDate}

</small>

<select

className="form-select mb-2"

value={task.status}

onChange={(e) =>

handleStatusChange(

task.id,

e.target.value

)

}

>

<option value="Pending">Todo</option>

<option value="In Progress">In Progress</option>

<option value="Completed">Done</option>

</select>

<div className="d-flex gap-2">

{role === "admin" && (

<button

className="btn btn-warning btn-sm"

onClick={() => handleEditTask(task.id)}

>

Edit

</button>

)}

{role === "admin" && (

<button

className="btn btn-danger btn-sm"

onClick={() => handleDeleteTask(task.id)}

>

Delete

</button>

)}

</div>

</div>

)}

</Draggable>

)

)

}

{provided.placeholder}

</div>

)}

</Droppable>

  </div>

  {/* IN PROGRESS COLUMN */}

  <div className="col-md-4">

    <div className="card shadow p-3 border-primary">

      <h3 className="text-center text-primary fw-bold">
        IN PROGRESS
      </h3>
      {
  progressTasks.length === 0 && (
    <p className="text-center text-muted">
      No tasks in progress
    </p>
  )
}

      {progressTasks.map((task) => (

        <div
          key={task.id}
          className="card shadow-sm border-primary p-3 mb-3 h-100"
        >

          <h6 className="fw-bold">
  {task.title}
</h6>
          <span
  className={
    task.status === "Completed"
      ? "badge bg-success mb-2"
      : task.status === "In Progress"
      ? "badge bg-primary mb-2"
      : "badge bg-warning text-dark mb-2"
  }
>
  {task.status}
</span>
        <p className="small text-muted">
  {task.description?.length > 80
    ? task.description.substring(0, 80) + "..."
    : task.description}
</p>
          <span
            className={
              task.priority === "High"
                ? "badge bg-danger mb-2"
                : task.priority === "Medium"
                ? "badge bg-warning text-dark mb-2"
                : "badge bg-success mb-2"
            }
          >
            {task.priority}
          </span>

          <small className="text-muted d-block">
  📁 {task.projectName}
</small>

<small className="text-primary d-block">
  👤 {task.assignedTo}
</small>

<small className="text-secondary d-block">
  📅 {task.dueDate}
</small>

          <select
            className="form-select mb-2"
            value={task.status}
            onChange={(e) =>
              handleStatusChange(
                task.id,
                e.target.value
              )
            }
          >
            <option value="Pending">
              Todo
            </option>

            <option value="In Progress">
              In Progress
            </option>

            <option value="Completed">
              Done
            </option>

          </select>

          <div className="d-flex gap-2">

            {
role === "admin" && (

<button
className="btn btn-warning btn-sm"
onClick={() =>
handleEditTask(task.id)
}
>
Edit
</button>

)
}

            {
role === "admin" && (

<button
className="btn btn-danger btn-sm"
onClick={() =>
handleDeleteTask(task.id)
}
>
Delete
</button>

)
}

          </div>

        </div>

      ))}

    </div>

  </div>

  {/* DONE COLUMN */}

  <div className="col-md-4">

    <div className="card shadow p-3 border-success">

      <h3 className="text-center text-success fw-bold">
        DONE
      </h3>
      {
  completedTasks.length === 0 && (
    <p className="text-center text-muted">
      No completed tasks yet
    </p>
  )
}

      {completedTasks.map((task) => (

        <div
          key={task.id}
          className="card shadow-sm border-success p-3 mb-3 h-100"
        >

          <h6 className="fw-bold">
  {task.title}
</h6>
<span
  className={
    task.status === "Completed"
      ? "badge bg-success mb-2"
      : task.status === "In Progress"
      ? "badge bg-primary mb-2"
      : "badge bg-warning text-dark mb-2"
  }
>
  {task.status}
</span>
<p className="small text-muted">
  
  {task.description?.length > 80
    ? task.description.substring(0, 80) + "..."
    : task.description}
</p>
          <span
            className={
              task.priority === "High"
                ? "badge bg-danger mb-2"
                : task.priority === "Medium"
                ? "badge bg-warning text-dark mb-2"
                : "badge bg-success mb-2"
            }
          >
            {task.priority}
          </span>

         <small className="text-muted d-block">
  📁 {task.projectName}
</small>

<small className="text-primary d-block">
  👤 {task.assignedTo}
</small>

<small className="text-secondary d-block">
  📅 {task.dueDate}
</small>

          <select
            className="form-select mb-2"
            value={task.status}
            onChange={(e) =>
              handleStatusChange(
                task.id,
                e.target.value
              )
            }
          >
            <option value="Pending">
              Todo
            </option>

            <option value="In Progress">
              In Progress
            </option>

            <option value="Completed">
              Done
            </option>

          </select>

          <div className="d-flex gap-2">

            {
role === "admin" && (

<button
className="btn btn-warning btn-sm"
onClick={() =>
handleEditTask(task.id)
}
>
Edit
</button>

)
}

            {
role === "admin" && (

<button
className="btn btn-danger btn-sm"
onClick={() =>
handleDeleteTask(task.id)
}
>
Delete
</button>

)
}

          </div>

        </div>

      ))}

    </div>

  </div>

</div>

  </div>

</DragDropContext>

);
}

export default Tasks;