import React from "react";
import { useDataLayerValue } from "../../Data/dataLayer";
import { Avatar } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import "./Header.css";

function Header() {
  const [{ user }] = useDataLayerValue();

  return (
    <div className="header">
      <div className="header__left">
        {/* Search bar in progress */}
        <Search />
        <input placeholder="Search for artists, songs, or albums" type="text" />
      </div>
      <div className="header__right">
        {/* User's name and image associated with their Spotify account */}
        <Avatar src={user?.images[0]?.url} alt={user?.display_name} />
        <h4>{user?.display_name}</h4>
      </div>
    </div>
  );
}

export default Header;
