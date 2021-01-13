import React from "react";
import { loginUrl } from "../../Spotify";
import "./style.css";

function Login() {
  return (
    <div className="login">
      <img
        src="https://music-b26f.kxcdn.com/wp-content/uploads/2017/06/635963274692858859903160895_spotify-logo-horizontal-black.jpg"
        alt="Spotify logo"
      />
      <a href={loginUrl}>Login with Spotify</a>
    </div>
  );
}

export default Login;