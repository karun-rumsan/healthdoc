import { useEffect, useState } from "react";
import { BiRightArrowAlt } from "react-icons/bi";
import { HiOutlinePlusSm } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { doctorResponse } from "../../api/api";
import { getrequest } from "../../redux/reqresSlice/reqresSlice";
import styles from "./DoctorResponse.module.scss";
const DoctorResponds = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [tx, setTx] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getrequest());
  }, [dispatch, tx]);
  const reqresData = useSelector((state) => state.reqres.data);

  const handleClick = async (id) => {
    await doctorResponse(id);
    setTx(id);
  };

  const handleLink = (id) => {
    navigate(`/request/${id}`);
  };

  return (
    <div className={styles.Container}>
      <div
        style={{
          display: "flex",
          height: "3rem",
          alignItems: "center",
          marginLeft: "30px",
          paddingTop: "50px",
          marginBottom: "30px",
          justifyContent: "space-between",
        }}
      >
        <input
          type="search"
          value={query}
          style={{ width: "320px" }}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by Patient Name"
        />
      </div>
      <div className={styles.tableContainer}>
        <table>
          <caption>Patient Request</caption>
          <thead>
            <tr>
              <th scope="cols">S.N</th>
              <th scope="cols">Appointment</th>
              <th scope="cols">Patient Name</th>
              <th scope="cols">Age</th>
              <th scope="cols">Problem</th>
              <th scope="cols">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reqresData &&
              reqresData
                .filter((post) => {
                  if (query === "") {
                    return post;
                  } else if (post.patientName.includes(query)) {
                    return post;
                  }
                })
                .map((data, index) => (
                  <tr key={data.id}>
                    <td scope="row" aria-label="Serial Number">
                      {(index = index + 1)}
                    </td>
                    <td scope="row" aria-label="Patient ID">
                      {data.appointment}
                    </td>
                    <td scope="row" aria-label="Patient Name">
                      {data.patientName}
                    </td>
                    <td scope="row" aria-label="Patient Name">
                      {data.age}
                    </td>
                    <td scope="row" aria-label="Patient Name">
                      {data.cause}
                    </td>
                    <td scope="row" aria-label="Actions">
                      {/* <button
                        disabled={data.patientRequest === true}
                        className={styles.btn}
                        onClick={() => handleClick(data.id)}
                      >
                        Yes
                      </button> */}

                      <div>
                        {data.patientRequest === false ? (
                          <HiOutlinePlusSm
                            color="#379237"
                            className={styles.btn}
                            onClick={() => handleClick(data.id)}
                          />
                        ) : (
                          <BiRightArrowAlt
                            color="#31E1F7"
                            className={styles.btn}
                            onClick={() => handleLink(data.id)}
                            // redirect={`/request/${data.id}`}
                          />
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorResponds;
