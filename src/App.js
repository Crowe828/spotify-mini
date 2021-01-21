import { useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import { getTokenFromUrl } from "./spotify";
import { useDataLayerValue } from "../src/Data/dataLayer";
import Login from "../src/Components/Login";
import Player from "../src/Components/Player";

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

      // If they have a token set the user as the profile which appears on the screen
      spotify.getMe().then((user) => {
        dispatch({
          type: "SET_USER",
          user,
        });
      });

      spotify.getMySavedTracks().then((playlist) => {
        dispatch({
          type: "SET_SAVED_TRACKS",
          saved_tracks: playlist,
        });
      });

      // Display the user's playlists in the sidebar
      spotify.getUserPlaylists().then((playlists) => {
        dispatch({
          type: "SET_PLAYLISTS",
          playlists,
        });
      });

      // User's discover weekly playlist
      spotify.getPlaylist("37i9dQZEVXcI6FJRcXWE9m").then((playlist) => {
        dispatch({
          type: "SET_DISCOVER_WEEKLY",
          discover_weekly: playlist,
        });
      });

      // User's top artists
      spotify.getMyTopArtists().then((playlist) => {
        dispatch({ type: "SET_TOP_ARTISTS", top_artists: playlist });
      });

      // default dispatch for Spotify's API
      dispatch({
        type: "SET_SPOTIFY",
        spotify,
      });
    }
  }, [token, dispatch]);

  return (
    <div className="App">
      {/* If the user isn't logged in, show the login page. If logged in, show the player page */}
      {token ? <Player spotify={spotify} /> : <Login />}
    </div>
  );
}

export default App;
