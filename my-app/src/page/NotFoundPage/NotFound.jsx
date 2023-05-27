// import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Layout from "../../component/Layout/Layout";
import styles from "./NotFound.module.scss";
const NotFound = () => {
  const { isAuth } = useSelector((state) => state.account);

  return (
    <>
      {isAuth ? (
        <Layout>
          <div className={styles.container}>
            <h1>404 Not Found</h1>
            <p>
              The page you requested could not be found. Please check the URL
              and try again.
            </p>

            <div className={styles.navLink}>
              <NavLink to="/dashboard">Go to Dashboard</NavLink>
            </div>
          </div>
        </Layout>
      ) : (
        <div className={styles.container}>
          <h1>404 Not Found</h1>
          <p>
            The page you requested could not be found. Please check the URL and
            try again.
          </p>

          <div className={styles.navLink}>
            <NavLink to="/">Go to Login Page</NavLink>
          </div>
        </div>
      )}
    </>
  );
};

export default NotFound;
