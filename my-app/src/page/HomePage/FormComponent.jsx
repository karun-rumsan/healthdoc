// import React from "react";
import styles from "./Home.module.scss";
import PropTypes from "prop-types";
import { useState } from "react";
import {
  loginAccount,
  regAccount,
} from "../../redux/accountSlice/accountSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { useLoginDaveMutation } from "../../features/api";

const FormComponent = ({ option }) => {
  const [values, setValues] = useState({
    email: "",
    fullName: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  //   const [regAccount, { data, isLoading }] = useRegAccountMutation();

  //   const [loginDave] = useLoginDaveMutation();

  //   const [loginAccount] = useLoginAccountMutation();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const { email, password, fullName, role } = values;
  const login = {
    email,
    password,
  };

  const reg = {
    email,
    password,
    fullName,
    role,
  };

  const { error } = useSelector((state) => state.account);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (option) {
      dispatch(loginAccount({ login, navigate }));
      // dispatch(authenticatedUser());
    } else {
      dispatch(regAccount({ reg, window }));
      // dispatch(authenticatedUser());
    }
  };
  console.log(error);
  return (
    <>
      <form className={styles.accountForm} onSubmit={handleSubmit}>
        <div
          className={`${styles.accountFormFields}
      ${option ? styles.signIn : styles.signUp}`}
        >
          <input
            id="email"
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            placeholder="E-mail"
            required
          />

          <input
            id="password"
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          <input
            id="fullName"
            name="fullName"
            type="text"
            value={values.fullName}
            onChange={handleChange}
            placeholder="FullName"
            //   required={option === 2 ? true : false}
            disabled={!option ? false : true}
          />

          <select
            id="role"
            name="role"
            value={values.role}
            onChange={handleChange}
            disabled={option ? true : false}
          >
            <option defaultValue="Select Your Role">
              Please select your Role
            </option>
            <option value="DOCTOR">Doctor</option>
            <option value="PATIENT">Patient</option>
          </select>
        </div>
        <button className={styles.btnSubmitForm} type="submit">
          {`${option ? "Sign in" : "Sign up"}`}
        </button>
      </form>
      {error && (
        <p style={{ color: "red", paddingTop: "10" }}> {error.message}</p>
      )}
    </>
  );
};

FormComponent.propTypes = {
  option: PropTypes.bool, // use the PropTypes object to define valid prop types
};

export default FormComponent;
