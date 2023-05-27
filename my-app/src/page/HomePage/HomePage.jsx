import { useState } from "react";
import FormComponent from "./FormComponent";
// import RegisterForm from "./RegisterForm";
import styles from "./Home.module.scss";

// const Form = (props) => {
//   console.log(option);
//   const { option } = props;
//   return (

//   );
// };

const HomePage = () => {
  const [option, setOption] = useState(true);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <header>
          <div
            className={`${styles.headerHeadings} ${
              option ? styles.signIn : styles.signUp
            }`}
          >
            <span>Sign in to your account</span>
            <span>Create an account</span>
          </div>
        </header>
        <ul className={styles.options}>
          <li
            className={option ? styles.active : ""}
            onClick={() => setOption(true)}
          >
            Sign in
          </li>
          <li
            className={!option ? styles.active : ""}
            onClick={() => setOption(false)}
          >
            Sign up
          </li>
        </ul>
        <FormComponent option={option} />
      </div>
    </div>
  );
};

export default HomePage;
