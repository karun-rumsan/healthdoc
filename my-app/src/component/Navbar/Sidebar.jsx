import { useState } from "react";
import styles from "./SideBar.module.scss";
import { FaTimes, FaBars } from "react-icons/fa";
import { RiDashboardFill } from "react-icons/ri";
import { BiRefresh } from "react-icons/bi";
// import { MdGroup } from "react-icons/md";
import NavUrl from "./NavUrl";
import PropTypes from "prop-types";
// import { useSelector } from "react-redux";

const Sidebar = () => {
  const [navActive, setNavActive] = useState(false);
  // const { user } = useSelector((state) => state.account);

  // alert(height);
  return (
    <div
      className={`${styles.navContainer} ${
        navActive ? styles.navBig : styles.navSmall
      } `}
    >
      <button
        className={styles.navControl}
        tabIndex={0}
        aria-expanded={navActive}
        onClick={() => {
          setNavActive(!navActive);
        }}
      >
        {navActive ? <FaTimes /> : <FaBars />}
      </button>

      <nav
        label="Main navigation menu"
        role="navigation"
        aria-label="Main navigation menu"
      >
        <NavUrl
          url="dashboard"
          title="Dashboard"
          icon={<RiDashboardFill />}
          tabIndex={1}
        />

        {/* <NavUrl
          url={user.user.posts === "PATIENT" ? "patient" : "doctor"}
          title={user.user.posts === "PATIENT" ? "Doctor" : "Patient"}
          icon={<MdGroup />}
          tabIndex={2}
        /> */}

        {/* <NavUrl
          url={user.data.posts === "PATIENT" ? "patient" : "patient"}
          title={user.data.posts === "PATIENT" ? "Patient" : "Doctor"}
          icon={<MdGroup />}
          tabIndex={2}
        /> */}
        <NavUrl
          url="request"
          title="Request"
          icon={<BiRefresh />}
          tabIndex={2}
        />
      </nav>
    </div>
  );
};

Sidebar.propTypes = {
  user: PropTypes.string,
};

export default Sidebar;
