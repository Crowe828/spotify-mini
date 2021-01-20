import { useEffect } from "react";
import { useDataLayerValue } from "../../Data/DataLayer";
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
import { Grid, Slider } from "@material-ui/core";
import "./style.css";

function Footer({ spotify }) {
  const [{ token, item, playing }, dispatch] = useDataLayerValue();

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
  }, [spotify]);

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
        {item ? (
          <div className="footer__songInfo">
            <h4>{item.name}</h4>
            <p>{item.artists.map((artist) => artist.name).join(", ")}</p>
          </div>
        ) : (
          <div className="footer__songInfo">
            <h4>Nothing is playing</h4>
            <p>...</p>
          </div>
        )}
      </div>

      <div className="footer__center">
        <Shuffle className="footer__green" />
        <SkipPrevious onClick={skipPrevious} className="footer__icon" />
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

        <SkipNext onClick={skipNext} className="footer__icon" />

        <Repeat className="footer__green" />
      </div>
      <div className="footer__right">
        <Grid container spacing={2}>
          <Grid item>
            <PlaylistPlay />
          </Grid>
          <Grid item>
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
