import { useDataLayerValue } from "../../Data/dataLayer";
import Header from "../Header";
import SongRow from "../SongRow";
import { PlayCircleFilled, Favorite, MoreHoriz } from "@material-ui/icons";
import "./Body.css";

function Body({ spotify }) {
  const [{ discover_weekly }, dispatch] = useDataLayerValue();

  // Play the entire Discover Weekly playlist
  const playPlaylist = () => {
    spotify
      .play({
        context_uri: `spotify:playlist:37i9dQZEVXcI6FJRcXWE9m`,
      })
      .then(() => {
        spotify.getMyCurrentPlayingTrack().then((res) => {
          dispatch({
            type: "SET_ITEM",
            item: res.item,
          });
          dispatch({
            type: "SET_PLAYING",
            playing: true,
          });
        });
      });
  };

  // Play one specific song from the playlist
  const playSong = (id) => {
    spotify
      .play({
        uris: [`spotify:track:${id}`],
      })
      .then((res) => {
        spotify.getMyCurrentPlayingTrack().then((res) => {
          dispatch({
            type: "SET_ITEM",
            item: res.item,
          });
          dispatch({
            type: "SET_PLAYING",
            playing: true,
          });
        });
      });
  };

  return (
    <div className="body">
      {/* Searchbar, user name, user image */}
      <Header spotify={spotify} />
      <div className="body__info">
        <img src={discover_weekly?.images[0]?.url} alt="" />
        <div className="body__infoText">
          <strong>Playlist</strong>
          <h2>Discover Weekly</h2>
          <p>{discover_weekly?.description}</p>
        </div>
      </div>
      <div className="body__songs">
        <div className="body__icons">
          {/* Play playlist */}
          <PlayCircleFilled className="body__shuffle" onClick={playPlaylist} />
          <Favorite fontSize="large" />
          <MoreHoriz />
        </div>
        {/* List of songs */}
        {discover_weekly?.tracks.items.map((item) => (
          // Play song
          <SongRow playSong={playSong} track={item.track} key={item.track.id} />
        ))}
      </div>
    </div>
  );
}

export default Body;
