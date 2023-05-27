// import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./SideBar.module.scss";

const NavUrl = ({ url, icon, title, tabIndex }) => {
  return (
    <li className={`${styles.navLink}  `} tabIndex={tabIndex}>
      <NavLink
        to={`/${url}`}
        className={({ isActive }) => (isActive ? styles.active : undefined)}
        title={title}
      >
        {icon}
        <span className={styles.description}>{title}</span>
      </NavLink>
    </li>
  );
};

NavUrl.propTypes = {
  icon: PropTypes.any,
  url: PropTypes.string,
  tabIndex: PropTypes.number,
  title: PropTypes.string,
};

export default NavUrl;
