import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

function Navbar() {

  const { user, setUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleLogout = async () => {

    try {

      await signOut(auth);

      setUser(null);

      navigate("/");

    } catch (error) {

      console.error(error);

    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
      <div className="container-fluid px-4">

        <Link
          className="navbar-brand fw-bold fs-5"
          to="/dashboard"
        >
          🚀 TaskFlow 
        </Link>

        <div className="navbar-nav me-auto gap-2">

          {user ? (

            <>

              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "nav-link fw-semibold text-warning"
                    : "nav-link fw-semibold"
                }
                to="/dashboard"
              >
                📊 Dashboard
              </NavLink>

              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "nav-link fw-semibold text-warning"
                    : "nav-link fw-semibold"
                }
                to="/projects"
              >
                📁 Projects
              </NavLink>

              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "nav-link fw-semibold text-warning"
                    : "nav-link fw-semibold"
                }
                to="/tasks"
              >
                📋 Tasks
              </NavLink>

              <NavLink
                className={({ isActive }) =>
                  isActive                    ? "nav-link fw-semibold text-warning"
                    : "nav-link fw-semibold"
                }
                to="/activity-log"  
              >
                📝 Activity Log
              </NavLink>

            </>

          ) : (

            <>

              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "nav-link fw-semibold text-warning"
                    : "nav-link"
                }
                to="/"
              >
                Login
              </NavLink>

              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "nav-link fw-semibold text-warning"
                    : "nav-link"
                }
                to="/register"
              >
                Register
              </NavLink>

            </>

          )}

        </div>

        <div className="d-flex align-items-center gap-3">

          <button
            className="btn btn-outline-light btn-sm"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>

          {user && (

            <>

              <span className="badge bg-primary fs-6 py-2 px-3">
                👤 {user}
              </span>

              <button
                className="btn btn-danger btn-sm"
                onClick={handleLogout}
              >
                Logout
              </button>

            </>

          )}

        </div>

      </div>
    </nav>
  );
}

export default Navbar;