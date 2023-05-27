// import React from 'react'

// import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DoctorResponds from "../../component/DoctorResponds/DoctorResponds";
import Layout from "../../component/Layout/Layout";
import PatientRequest from "../../component/PatientRequest/patientRequest";
// import styles from "./Request.module.scss";
import { AiOutlineReload } from "react-icons/ai";
import { getrequest } from "../../redux/reqresSlice/reqresSlice";

const Request = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.account.user);

  const handleClick = () => {
    dispatch(getrequest());
  };

  return (
    <Layout
      title={
        user.data && user.data.posts === "PATIENT"
          ? "Request For Doctor"
          : "Respond for Patient"
      }
      icon={<AiOutlineReload color="green" onClick={handleClick} size="15px" />}
    >
      {user.data && user.data.posts === "PATIENT" ? (
        <PatientRequest />
      ) : (
        <DoctorResponds />
      )}
    </Layout>
  );
};

export default Request;
