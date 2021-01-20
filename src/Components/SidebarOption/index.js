import "./SidebarOption.css";

function SidebarOption({ title, Icon }) {
  return (
    // Dynamicallly creating each option in the sidebar
    <div className="sidebarOption">
      {Icon && <Icon className="sidebarOption__icon" />}
      {Icon ? <h4>{title}</h4> : <p>{title}</p>}
    </div>
  );
}

export default SidebarOption;
