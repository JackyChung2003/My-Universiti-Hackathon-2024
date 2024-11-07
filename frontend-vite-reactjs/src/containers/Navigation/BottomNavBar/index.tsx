import React from "react";
import "./index.css";
import navBarItems from "../navBarItems";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
// import { FaCamera } from "react-icons/fa"; 
import { LuScan } from "react-icons/lu";

interface BottomNavBarProps {
  toggle: () => void;
}

const BottomNavBar: React.FC<BottomNavBarProps> = ({ toggle }) => {
  const visibilityClasses = ["bottom-nav-container"];
//   if (isopen) {
//     visibilityClasses.push("visible");
//   } else {
//     visibilityClasses.push("hidden");
//   }

  return (
    <div className="bottom-nav-container">
    {/* <div className={visibilityClasses.join(" ")} onClick={toggle}> */}
      {/* <div className="icon">
        <FaTimes className="close-icon" onClick={toggle} />
      </div> */}
      <div className="bottom-nav-wrapper">
        {navBarItems.slice(0, 2).map((item, index) => (
            <Link to={item.link} key={index} className="bottom-nav-links" onClick={toggle}>
              <div className="nav-item">
                <span className="nav-icon">{item.icon}</span>
                {/* <span>{item.title}</span> */}
              </div>
            </Link>
          ))}
        {/* <div className="bottom-nav-menu">
          {navBarItems.map((item, index) => (
            <Link to={item.link} key={index} className="bottom-nav-links">
              <div className="nav-item">
                {item.icon}
              </div>
            </Link>
          ))}
        </div> */}
        {/* Centered Scan Icon */}
        <div className="scan-icon-container">
            <Link to="/scan" className="scan-icon-link">
              <LuScan className="scan-icon" />
            </Link>
          </div>

          {navBarItems.slice(2,5).map((item, index) => (
            <Link to={item.link} key={index} className="bottom-nav-links" onClick={toggle}>
              <div className="nav-item">
                <span className="nav-icon">{item.icon}</span>
                {/* <span>{item.title}</span> */}
              </div>
            </Link>
          ))}

        
      </div>
    </div>
  );
};

export default BottomNavBar;
