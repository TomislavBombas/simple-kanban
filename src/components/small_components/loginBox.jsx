import { React, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";

// This is just a login panel component
// No validation is done here and all
// data is passed to the parent component
// via callback function

export function LoginBox(props) {
  const [username, setUserName] = useState([]);
  const [password, setPassword] = useState();

  const handleSubmit = (e) => {
    console.log(e);
    e.preventDefault();
    if (username != undefined && password != undefined) {
      props.callback({
        username,
        password,
      });
    }
  };

  return (
    <div className="center-children container">
      <div id="kanban-login" className="dialog-box card padding-20">
        <form onSubmit={handleSubmit}>
          <div className="input-group mb-3">
            <span className="input-group-text">
              <FontAwesomeIcon icon={faUser} />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">
              <FontAwesomeIcon icon={faLock} />
            </span>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
        <p>Log in with your username and password</p>
      </div>
    </div>
  );
}
