import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getForUser } from "../../redux/accountSlice/accountSlice";
import { reqPatitent } from "../../redux/reqresSlice/reqresSlice";
import styles from "./PatientRequest.module.scss";
import { getrequest } from "../../redux/reqresSlice/reqresSlice";
import { BiUnlink } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { BiRightArrowAlt } from "react-icons/bi";
const PatientRequest = () => {
  const dispatch = useDispatch();
  const { doc } = useSelector((state) => state.account);
  const navigate = useNavigate();
  const [values, setValues] = useState({
    docId: "",
    age: "",
    cause: "",
    appointment: "",
  });
  const [filterValues, setFilterValues] = useState("");

  const [query, setQuery] = useState("");
  const [bool, setBool] = useState(false);
  useEffect(() => {
    dispatch(getForUser());
    // dispatch(myAccount());
  }, [dispatch, bool]);

  useEffect(() => {
    dispatch(getrequest());
  }, [bool, dispatch]);

  useEffect(() => {
    if (values.docId) {
      const laf = doc.find((docName) => values.docId === docName.id);
      setFilterValues(laf);
    }
  }, [doc, values.docId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const sendrequest = {
    id: filterValues.id,
    doctorName: filterValues.fullName,
    age: Number(values.age),
    cause: values.cause,
    appointment: values.appointment,
  };

  const handleSend = () => {
    setBool(false);
    dispatch(reqPatitent(sendrequest));
    setTimeout(() => {
      setBool(true);
    }, 10);
    // setQuars(sendrequest);
    setFilterValues("");
    setValues({});
  };

  const handleLink = (id) => {
    navigate(`/request/${id}`);
  };

  const reqresdata = useSelector((state) => state.reqres.data);

  return (
    <Fragment>
      <div className={styles.div}>
        <div className={styles.container}>
          <div className={styles.left}>
            <select
              value={values.docId}
              name="docId"
              onChange={handleChange}
              className={styles.select}
            >
              <option value=""> Please select your Doc</option>
              {doc &&
                doc.map((doc) => (
                  <option key={doc.id} value={doc.id} className={styles.option}>
                    {doc.fullName}
                  </option>
                ))}
            </select>

            <input
              type="text"
              name="cause"
              placeholder="Please enter your problem"
              value={values.cause}
              onChange={handleChange}
            />
          </div>

          <div className={styles.right}>
            <input
              type="number"
              name="age"
              placeholder="Please enter your age"
              value={values.age}
              onChange={handleChange}
            />
            <input
              type="Date"
              placeholder="Enter for the appointment"
              name="appointment"
              value={values.appointment}
              onChange={handleChange}
            />

            <button onClick={handleSend} className={styles.btn}>
              Send Request
            </button>
          </div>
        </div>
      </div>
      <div
        style={{ borderBottom: "2px solid black", marginBottom: "1rem" }}
      ></div>
      <div className={styles.tableContainer}>
        <div
          style={{
            display: "flex",
            height: "3rem",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <input
            type="search"
            style={{ width: "320px" }}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by Doctor Name"
          />
          <h2 style={{ textAlign: "center" }}>summary</h2>
        </div>
        <table>
          <thead>
            <tr>
              <th scope="cols">S.N</th>
              <th scope="cols">Appointment</th>
              <th scope="cols">Doctor Name</th>
              <th scope="cols">Age</th>
              <th scope="cols">Problem</th>
              <th scope="cols">Response</th>
            </tr>
          </thead>
          <tbody>
            {reqresdata &&
              reqresdata
                .filter((post) => {
                  if (query === "") {
                    return post;
                  } else if (post.doctorName.includes(query)) {
                    return post;
                  }
                })
                .map((data, index) => (
                  <tr key={data.id}>
                    <td scope="row" aria-label="Serial Number">
                      {(index = index + 1)}
                    </td>
                    <td scope="row" aria-label="Appointment">
                      {data.appointment}
                    </td>
                    <td scope="row" aria-label="Doctor Name">
                      {data.doctorName}
                      <small>
                        <br />
                        {`PaitentID:${data.patientId}`}
                      </small>
                    </td>
                    <td scope="row" aria-label="Age">
                      {data.age}
                    </td>
                    <td scope="row" aria-label="Problem">
                      {data.cause}
                    </td>
                    <td scope="row" aria-label="Response">
                      <div>
                        {data.patientRequest === false ? (
                          <BiUnlink
                            color="#FC2947"
                            className={styles.btn2}
                            style={{ cursor: "none" }}
                          />
                        ) : (
                          <BiRightArrowAlt
                            color="#31E1F7"
                            className={styles.btn2}
                            onClick={() => handleLink(data.id)}
                          />
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

export default PatientRequest;
