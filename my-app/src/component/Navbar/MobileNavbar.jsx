// import React from 'react'

// import { useState } from "react";
import styles from "./MobileNavbar.module.scss";
import { FaTimes } from "react-icons/fa";
import { RiDashboardFill } from "react-icons/ri";
import NavUrl from "./NavUrl";
// import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { BiRefresh } from "react-icons/bi";
const MobileNavbar = ({ isOpened, setIsOpened }) => {
  // const { user } = useSelector((state) => state.account);

  return (
    <div className={`${styles.container} ${isOpened && styles.navActive}`}>
      <FaTimes
        className={styles.navControl}
        tabIndex={0}
        // aria-expanded={navActive}
        onClick={() => {
          setIsOpened(false);
        }}
      />
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

        <NavUrl
          url="request"
          title="Request"
          icon={<BiRefresh />}
          tabIndex={2}
        />

        {/* <NavUrl
          url={user.user.posts === "DOCTOR" ? "patient" : "doctor"}
          title={user.user.posts === "DOCTOR" ? "Patient" : "Doctor"}
          icon={<MdGroup />}
          tabIndex={2}
        /> */}
        {/* <NavUrl
          url={user.data.posts === "PATIENT" ? "patient" : "patient"}
          title={user.data.posts === "PATIENT" ? "Patient" : "Doctor"}
          icon={<MdGroup />}
          tabIndex={2}
        /> */}

        {/* <NavUrl
          url={"doctor"}
          title={"Doctor"}
          icon={<MdGroup />}
          tabIndex={2}
        /> */}
      </nav>
      <div
        className={styles.bg}
        // tabIndex={0}
        // aria-expanded={navActive}
        onClick={() => {
          setIsOpened(false);
        }}
      ></div>
    </div>
  );
};

MobileNavbar.propTypes = {
  isOpened: PropTypes.bool,
  setIsOpened: PropTypes.func,
};

export default MobileNavbar;
