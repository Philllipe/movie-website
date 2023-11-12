import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const URL = `https://localhost:8000/user/register`;
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const register = (email, password) => {
    return fetch(URL, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((res) =>
        res.json().then((res) => {
          if (res.error === true) {
            setError(true);
          } else {
            setError(false);
            navigate("/login?register=true");
          }
        })
      )
      .catch((error) => alert("Error:", error));
  };

  return (
    <div className="form">
      <h1>Register</h1>

      <div className="container" style={{ maxWidth: 600 }}>
        {error === true && (
          <div class="alert alert-danger" role="alert">
            User Already Exists!
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

          <button
            class="btn btn-primary me-2"
            onClick={() => {
              if (
                document.getElementById("exampleInputEmail1").value === "" ||
                document.getElementById("exampleInputPassword1").value === ""
              ) {
                alert("Please fill out all fields");
              } // check if the email is valid
              else if (
                document
                  .getElementById("exampleInputEmail1")
                  .value.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/) === null
              ) {
                alert(
                  "Please enter a valid email address with @ and a valid domain (e.g. example@example.com) "
                );
              } else {
                register(
                  document.getElementById("exampleInputEmail1").value,
                  document.getElementById("exampleInputPassword1").value
                );
              }
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
