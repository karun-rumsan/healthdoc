// import React from 'react'
import styles from "./Layout.module.scss";
import PropTypes from "prop-types";
import Sidebar from "../Navbar/Sidebar";
import MobileNavbar from "../Navbar/MobileNavbar";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { BiLogInCircle } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { exist } from "../../api/api";
import { unauthenticatedUser } from "../../redux/accountSlice/accountSlice";
const Layout = ({ children, title, icon }) => {
  const [isOpened, setIsOpened] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { pathname } = location;
  const handleLogOut = async () => {
    await exist();
    navigate("/");
    dispatch(unauthenticatedUser());
  };
  return (
    <div className={styles.container}>
      <Sidebar />
      <MobileNavbar isOpened={isOpened} setIsOpened={setIsOpened} />
      <div className={styles.subContainer}>
        <div className={styles.top}>
          {/* <button onClick={() => setIsOpened(!isOpened)}>sad</button> */}
          <div className={styles.left}>
            <FaBars
              onClick={() => setIsOpened(!isOpened)}
              className={styles.faBars}
            />
            <span className={styles.title}>{title}</span>
          </div>
          <div className={styles.right}>
            {pathname === "/request" && (
              <button className={styles.refresh}>{icon}</button>
            )}
            <BiLogInCircle onClick={handleLogOut} className={styles.logout} />
          </div>
        </div>
        <div className={styles.main}>{children}</div>
      </div>
    </div>
  );
};

Layout.propTypes = {
  title: PropTypes.string,
  user: PropTypes.string,
  children: PropTypes.node,
  icon: PropTypes.element,
};

export default Layout;
