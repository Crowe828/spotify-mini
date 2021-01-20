import SidebarOption from "../SidebarOption";
import { useDataLayerValue } from "../../Data/dataLayer";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import { LibraryMusic } from "@material-ui/icons";
import "./Sidebar.css";

function Sidebar() {
  const [{ playlists }] = useDataLayerValue();

  return (
    <div className="sidebar">
      <img
        className="sidebar__logo"
        src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
        alt="Spotify logo"
      />

      {/* Buttons for User's homepage, search, and library */}
      <SidebarOption title="Home" Icon={HomeIcon} />
      <SidebarOption title="Search" Icon={SearchIcon} />
      <SidebarOption title="Your Library" Icon={LibraryMusic} />
      <br />
      {/* User's playlists */}
      <strong className="sidebar__title">Playlists</strong>
      <hr />
      {playlists?.items?.map((playlist) => (
        <SidebarOption title={playlist.name} key={playlist.id} />
      ))}
    </div>
  );
}

export default Sidebar;
