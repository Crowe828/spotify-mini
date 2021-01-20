export const initialState = {
  spotify: null,
  token: null,
  user: null,
  playlists: [],
  discover_weekly: null,
  top_artists: null,
  playing: false,
  item: null,
};

const reducer = (state, action) => {
  console.log(action);

  // Action -> type, [payload]
  switch (action.type) {
    case "SET_SPOTIFY":
      return {
        ...state,
        spotify: action.spotify,
      };
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "SET_TOKEN":
      return {
        ...state,
        token: action.token,
      };
    case "SET_PLAYLISTS":
      return {
        ...state,
        playlists: action.playlists,
      };
    case "SET_DISCOVER_WEEKLY":
      return {
        ...state,
        discover_weekly: action.discover_weekly,
      };
    case "SET_TOP_ARTISTS":
      return {
        ...state,
        top_artists: action.top_artists,
      };
    case "SET_PLAYING":
      return {
        ...state,
        playing: action.playing,
      };
    case "SET_ITEM":
      return {
        ...state,
        item: action.item,
      };

    default:
      return state;
  }
};

export default reducer;
