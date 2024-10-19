import React from "react";
import "./index.css";
// import navbarItems from "../NavbarItems";
import navBarItems from "../navBarItems";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

interface SidebarProps {
  isopen: boolean;
  toggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isopen, toggle }) => {
  const opacityClasses = ["sidebar-container"];
  if (isopen) {
    opacityClasses.push("opacity-on");
  } else {
    opacityClasses.push("opacity-off");
  }

  return (
    <div className={opacityClasses.join(" ")} onClick={toggle}>
      <div className="icon">
        <FaTimes className="close-icon" onClick={toggle} />
      </div>
      <div className="sidebar-wrapper">
        <div className="sidebar-menu">
          {navBarItems.map((item, index) => (
            <Link to={item.link} key={index} className="sidebar-links">
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;