// import React from 'react'
import { Link, useParams } from "react-router-dom";
import Layout from "../../component/Layout/Layout";
import { MdArrowBack } from "react-icons/md";
import styles from "./GetById.module.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteChatById,
  getChatById,
  postChatByID,
} from "../../redux/chatSlice/chatSlice";
import { AiOutlineSend } from "react-icons/ai";
import { RiCloseFill } from "react-icons/ri";
const Chat = () => {
  const [message, setMessage] = useState("");
  const [bool, setBool] = useState(false);
  const params = useParams();
  const id = params.id;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getChatById(params.id));
  }, [bool]);

  const data = useSelector((state) => state.chatSlice.data);
  const user = useSelector((state) => state.account);
  const datas = { id, message };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async () => {
    // e.preventDefault();
    if (message !== "") {
      dispatch(postChatByID(datas));
      setMessage("");
    }
    setBool(true);
  };

  const handleClose = async (id) => {
    dispatch(deleteChatById(id));
    setBool(true);
  };

  // const c1 = chatData.data.map((a) => a.post === user.user.data.posts);
  return (
    <Layout>
      <div className={styles.msgContainer}>
        <div className={styles.msgHeader}>
          <Link to="/request" type="div" className={styles.link}>
            <MdArrowBack size={30} className={styles.arrow} />
          </Link>
        </div>

        <div className={styles.msgBody}>
          <div className={styles.content}>
            {data.map((x) => (
              <div
                key={x.id}
                className={`${
                  x.post === user.user.data.posts ? styles.right : styles.left
                }`}
              >
                {x.post === user.user.data.posts && (
                  <RiCloseFill
                    className={styles.closeFill}
                    onClick={() => handleClose(x.id)}
                  />
                )}

                <p className={styles.msg}>{x.message}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.footer}>
          <input
            type="text"
            name="message"
            className={styles.textInput}
            value={message}
            onChange={handleChange}
          />

          <AiOutlineSend
            className={styles.aiSend}
            size="40px"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Chat;
