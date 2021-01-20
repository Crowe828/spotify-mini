import { useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import { getTokenFromUrl } from "./spotify";
import { useDataLayerValue } from "../src/Data/DataLayer";
import Login from "../src/Components/Login";
import Player from "../src/Components/Player";
import "./App.css";

const spotify = new SpotifyWebApi();

function App() {
  const [{ token }, dispatch] = useDataLayerValue();
  // Run code based on the users token
  useEffect(() => {
    // Set token
    const hash = getTokenFromUrl();
    window.location.hash = "";
    const _token = hash.access_token;

    if (_token) {
      spotify.setAccessToken(_token);
      dispatch({
        type: "SET_TOKEN",
        token: _token,
      });

      spotify.getMe().then((user) => {
        dispatch({
          type: "SET_USER",
          user,
        });
      });

      spotify.getUserPlaylists().then((playlists) => {
        dispatch({
          type: "SET_PLAYLISTS",
          playlists,
        });
      });

      spotify.getPlaylist("37i9dQZEVXcI6FJRcXWE9m").then((playlist) => {
        dispatch({
          type: "SET_DISCOVER_WEEKLY",
          discover_weekly: playlist,
        });
      });

      spotify.getMyTopArtists().then((playlist) => {
        dispatch({ type: "SET_TOP_ARTISTS", top_artists: playlist });
      });

      dispatch({
        type: "SET_SPOTIFY",
        spotify,
      });
    }
  }, [token, dispatch]);

  return (
    // BEM
    <div className="App">
      {token ? <Player spotify={spotify} /> : <Login />}
    </div>
  );
}

export default App;
