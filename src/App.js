import { useEffect, useState } from "react";
import { getTokenFromUrl } from "./Spotify";
import Login from "../src/Components/Login";
import "./App.css";

function App() {
  const [token, setToken] = useState();

  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";
    const _token = hash.access_token;

    if (_token) {
      setToken(_token);
    }

    console.log("token", _token);
  }, []);

  return <div className="App">{token ? <h1>Logged in</h1> : <Login />}</div>;
}

export default App;
