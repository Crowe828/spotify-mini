import { useEffect } from "react";
import { useDataLayerValue } from "../../Data/DataLayer";
import { Grid, Slider } from "@material-ui/core";
import {
  PlayCircleOutline,
  PauseCircleOutline,
  SkipPrevious,
  SkipNext,
  PlaylistPlay,
  Shuffle,
  Repeat,
  VolumeDown,
} from "@material-ui/icons";
import "./Footer.css";

function Footer({ spotify }) {
  const [{ item, playing }, dispatch] = useDataLayerValue();

  useEffect(() => {
    // res = response from Spotify
    spotify.getMyCurrentPlaybackState().then((res) => {
      dispatch({
        type: "SET_PLAYING",
        playing: res.is_playing,
      });
      dispatch({
        type: "SET_ITEM",
        item: res.item,
      });
    });
  }, [spotify, dispatch]);

  const handlePlayPause = () => {
    // Pause
    if (playing) {
      spotify.pause();
      dispatch({
        type: "SET_PLAYING",
        playing: false,
      });

      // Play
    } else {
      spotify.play();
      dispatch({
        type: "SET_PLAYING",
        playing: true,
      });
    }
  };

  // Skip following song
  const skipNext = () => {
    spotify.skipToNext();
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
  };

  // Go back to previous song
  const skipPrevious = () => {
    spotify.skipToPrevious();
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
  };

  return (
    <div className="footer">
      {/* Current song playing */}
      <div className="footer__left">
        <img
          className="footer__albumLogo"
          src={item?.album.images[0].url}
          alt={item?.name}
        />
        {/* If there is a song playing, show it's details */}
        {item ? (
          <div className="footer__songInfo">
            <h4>{item.name}</h4>
            <p>{item.artists.map((artist) => artist.name).join(", ")}</p>
          </div>
        ) : (
          // If not, show nothing is playing
          <div className="footer__songInfo">
            <h4>Nothing is playing</h4>
            <p>...</p>
          </div>
        )}
      </div>

      <div className="footer__center">
        {/* Shuffle button still in progress */}
        <Shuffle className="footer__green" />
        {/* Previous song */}
        <SkipPrevious onClick={skipPrevious} className="footer__icon" />
        {/* Play/pause */}
        {playing ? (
          <PauseCircleOutline
            onClick={handlePlayPause}
            fontSize="large"
            className="footer__icon"
          />
        ) : (
          <PlayCircleOutline
            onClick={handlePlayPause}
            fontSize="large"
            className="footer__icon"
          />
        )}

        {/* Go to next song */}
        <SkipNext onClick={skipNext} className="footer__icon" />

        {/* Repeat song still in progress */}
        <Repeat className="footer__green" />
      </div>
      <div className="footer__right">
        <Grid container spacing={2}>
          <Grid item>
            {/* Pull up the current playlist (in progress) */}
            <PlaylistPlay />
          </Grid>
          <Grid item>
            {/* Volume slider in progress */}
            <VolumeDown />
          </Grid>
          <Grid item xs>
            <Slider aria-labelledby="continuous-slider" />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Footer;
