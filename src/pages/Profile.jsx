import { useContext } from "react";

import { AuthContext }

from "../context/AuthContext";

function Profile() {

const {

user,

role,

tasks

}

= useContext(AuthContext);


const totalTasks =

tasks.length;


const completedTasks =

tasks.filter(

task =>

task.status ===

"Completed"

).length;


const highPriorityTasks =

tasks.filter(

task =>

task.priority ===

"High"

).length;


const today =

new Date()

.toISOString()

.split("T")[0];


const dueTodayTasks =

tasks.filter(

task =>

task.dueDate ===

today

).length;


const completionRate =

totalTasks > 0

?

(

completedTasks /

totalTasks

) * 100

:

0;


return (

<div className="container mt-4">

<h1 className="display-4 fw-bold mb-4">

👤 Profile

</h1>


<div className="card shadow-lg border-0 p-4 mb-4">

<h3>

{user}

</h3>

<p className="text-muted">

Logged in user

</p>

<hr/>

<h5>

📧 Email

</h5>

<p>

{user}

</p>


<h5>

🔐 Role

</h5>

<p>

{role}

</p>

</div>


<div className="row">

<div className="col-md-3 mb-3">

<div className="card shadow text-center p-3">

<h6>

📋 Total Tasks

</h6>

<h2>

{totalTasks}

</h2>

</div>

</div>


<div className="col-md-3 mb-3">

<div className="card shadow text-center p-3">

<h6>

✅ Completed

</h6>

<h2>

{completedTasks}

</h2>

</div>

</div>


<div className="col-md-3 mb-3">

<div className="card shadow text-center p-3">

<h6>

🔥 High Priority

</h6>

<h2>

{highPriorityTasks}

</h2>

</div>

</div>


<div className="col-md-3 mb-3">

<div className="card shadow text-center p-3">

<h6>

📅 Due Today

</h6>

<h2>

{dueTodayTasks}

</h2>

</div>

</div>

</div>


<div className="card shadow-lg border-0 p-4 mt-3">

<h5>

📈 Completion Rate

</h5>


<h2>

{completionRate.toFixed(0)}%

</h2>


<div

className="progress"

style={{height:"25px"}}

>

<div

className="progress-bar bg-success"

style={{

width:

`${completionRate}%`

}}

>

{completionRate.toFixed(0)}%

</div>

</div>

</div>

</div>

);

}

export default Profile;