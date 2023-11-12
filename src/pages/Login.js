import "../styles.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Login() {
  const navigate = useNavigate();
  const URL = `https://localhost:8000/user/login`;
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const logout = searchParams.get("logout");
  const register = searchParams.get("register");
  const redirect = searchParams.get("redirect");

  const login = async (email, password, url) => {
    const response = await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password }),
    }).catch((error) => alert("Error:", error));

    const data = await response.json();

    if (data.error === true) {
      setError(true);
    } else {
      localStorage.setItem("token", data.bearerToken.token);
      localStorage.setItem("tokenRefresh", data.refreshToken.token);
      console.log(localStorage.getItem("tokenRefresh"));
      localStorage.setItem("email", email);
      navigate(url);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="form">
      <h1>Login</h1>

      <div className="container" style={{ maxWidth: 600 }}>
        {logout === "true" && (
          <div class="alert alert-warning" role="alert">
            Successfully Logged Out!
          </div>
        )}
        {register === "true" && (
          <div class="alert alert-success" role="alert">
            User Created! Please Login.
          </div>
        )}
        {error === true && (
          <div class="alert alert-danger" role="alert">
            Invalid Email or Password!
          </div>
        )}
        {redirect === "true" && (
          <div class="alert alert-danger" role="alert">
            Login Session Expired! Please Login.
          </div>
        )}
        {redirect === "false" && (
          <div class="alert alert-warning" role="alert">
            Please Login To Access This Page!
          </div>
        )}
        <form
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Email address
            </label>
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">
              Password
            </label>
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
            />
          </div>

          {redirect !== "false" && (
            <button
              class="btn btn-primary me-2"
              // login function
              onClick={() => {
                const email =
                  document.getElementById("exampleInputEmail1").value;
                const password = document.getElementById(
                  "exampleInputPassword1"
                ).value;
                if (email === "" || password === "") {
                  setError(true);
                  return;
                }
                login(email, password, "/");
              }}
            >
              Submit
            </button>
          )}

          {redirect === "false" && (
            <button
              class="btn btn-primary me-2"
              // login function
              onClick={() => {
                const email =
                  document.getElementById("exampleInputEmail1").value;
                const password = document.getElementById(
                  "exampleInputPassword1"
                ).value;
                if (email === "" || password === "") {
                  setError(true);
                  return;
                }
                login(email, password, -1);
              }}
            >
              Submit
            </button>
          )}

          <button class="btn btn-success" onClick={() => navigate("/register")}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
