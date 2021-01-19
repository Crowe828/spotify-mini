import React from "react";
import { loginUrl } from "../../spotify";
import "./style.css";

function Login() {
  return (
    <div className="login">
      {/* Logo */}
      <img
        src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
        alt="Spotify logo"
      />
      {/* Login button */}
      <a href={loginUrl}>Login with Spotify</a>
    </div>
  );
}

export default Login;
