import { useState } from "react";

import {
  useNavigate,
  Link
} from "react-router-dom";

import {
  createUserWithEmailAndPassword
} from "firebase/auth";

import { auth } from "../firebase";

function Register() {

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {

    e.preventDefault();

    try {

      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      alert(
        "Registration Successful"
      );

      navigate("/");

    } catch (error) {

      alert(error.message);

    }
  };

  return (
  <div
    className="d-flex justify-content-center align-items-center vh-100 bg-light"
  >

    <div className="col-md-4">

      <div className="card shadow-lg border-0 rounded-3 p-4">

        <h1 className="fw-bold text-center">
          🚀 Create Account
        </h1>

        <p className="text-muted text-center">
          Join TaskFlow AI
        </p>

        <hr />

        <form
          onSubmit={handleRegister}
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
            className="form-control mb-1"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
          />

          <small className="text-muted">
            Password should be at least 6 characters
          </small>

          <button
            className="btn btn-success w-100 mt-3"
            type="submit"
          >
            Create Account
          </button>

          <p className="text-center mt-3">

            Already have an account?

            <Link
              to="/"
              className="ms-1"
            >
              Login
            </Link>

          </p>

        </form>

      </div>

    </div>

  </div>
);
}

export default Register;