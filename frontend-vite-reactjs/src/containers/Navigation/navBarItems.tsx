import { FaHome, FaBullhorn, FaEnvelope, FaMapMarkerAlt, FaBell, FaUser } from "react-icons/fa";

const navBarItems = [
  {
    title: "Home",
    link: "/",
    icon: <FaHome />,
  },
  {
    title: "Campaign",
    link: "/campaign",
    icon: <FaBullhorn />,
  },
  // {
  //     title: "About",
  //     link: "/about",
  // },
  // {
  //     title: "Services",
  //     link: "/Services",
  // },
  {
    title: "Scan QR",
    link: "/scan",
    // icon: <FaEnvelope />,
  },
  {
    title: "Map",
    link: "/map",
    icon: <FaMapMarkerAlt />,
  },
  {
    title: "Profile",
    link: "/profile",
    icon: <FaUser />,
  },
  // {
  //   title: "Subscription",
  //   link: "/subscription",
  //   icon: <FaBell />,
  // },
];

export default navBarItems;