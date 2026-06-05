import {
  useState,
  useContext
} from "react";

import {
  useNavigate
} from "react-router-dom";

import {
  signInWithEmailAndPassword,
  signInWithPopup
} from "firebase/auth";

import {
  auth,
  googleProvider
} from "../firebase";

import {
  AuthContext
} from "../context/AuthContext";

import { Link } from "react-router-dom";

function Login() {

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const { setUser } =
    useContext(AuthContext);

  const navigate =
    useNavigate();

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        const userCredential =
          await signInWithEmailAndPassword(
            auth,
            email,
            password
          );

        setUser(
          userCredential.user.email
        );

        navigate(
          "/dashboard"
        );

      } catch (error) {

        alert(
          error.message
        );

      }
    };

  const handleGoogleLogin =
    async () => {

      try {

        const result =
          await signInWithPopup(
            auth,
            googleProvider
          );

        setUser(
          result.user.email
        );

        navigate(
          "/dashboard"
        );

      } catch (error) {

        alert(
          error.message
        );

      }
    };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100 bg-light"
    >

      <div className="col-md-4">

        <div className="card shadow-lg border-0 rounded-3 p-4">

          <h1 className="fw-bold text-center">
            🚀 TaskFlow AI
          </h1>

          <p className="text-muted text-center">
            Sign in to continue
          </p>

      <form
        onSubmit={handleSubmit}
      >
<label className="form-label fw-bold">
  Email
</label>
        <input
          type="email"
          placeholder="Email"
          className="form-control mb-3"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
        />
<label className="form-label fw-bold">
  Password
</label>
        <input
          type="password"
          placeholder="Password"
          className="form-control mb-3"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
        />

       <div className="d-grid gap-2">

  <button
    className="btn btn-primary w-100"
    type="submit"
  >
    Login
  </button>

  <hr />

  <button
    type="button"
    className="btn btn-danger w-100"
    onClick={handleGoogleLogin}
  >
    Continue with Google
  </button>

</div>
          <p className="text-center mt-3">

  Don't have an account?
        
  <Link
    to="/register"
    className="ms-1"
  >
    Register
  </Link>

</p>
  <p className="text-center text-muted small mt-4">
  Manage projects, tasks and teams with AI assistance
</p>  
      </form>

        </div>

      </div>

    </div>
  );
}

export default Login;