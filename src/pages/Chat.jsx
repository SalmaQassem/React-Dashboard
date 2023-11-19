import styles from "../styles/_Chat.module.scss";
import TextareaAutosize from "react-textarea-autosize";
import { useLoaderData, useParams } from "react-router-dom";
import { getAuthToken } from "../util/auth";
import { RiDeleteBin6Line, RiAttachment2 } from "react-icons/ri";
import { PiBookmarkSimpleBold } from "react-icons/pi";
import { IoIosSend } from "react-icons/io";
import { IoImageOutline } from "react-icons/io5";
import { MdOutlineLibraryAdd } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { useEffect, useRef } from "react";
import Pusher from "pusher-js";
import { useState, useContext } from "react";
import UserContext from "../store/user-context";
import axios from "axios";

const Chat = () => {
  const data = useLoaderData();
  const [t, i18n] = useTranslation("global");
  const [messages, setMessages] = useState(
    data.message && data.message.length > 0 ? [...data.message] : []
  );
  const inputRef = useRef(null);
  const context = useContext(UserContext);
  const params = useParams();
  const adminId = context.id;
  const adminImg = context.image;

  const image =
    params.mode === "past"
      ? data.chats.participants[0].image
      : params.mode === "new" && data.image;
  const firstName =
    params.mode === "past"
      ? data.chats.participants[0].first_name
      : params.mode === "new" && data.first_name;
  const lastName =
    params.mode === "past"
      ? data.chats.participants[0].last_name
      : params.mode === "new" && data.last_name;
  const email =
    params.mode === "past"
      ? data.chats.participants[0].email
      : params.mode === "new" && data.email;

  const getTime = (createDate) => {
    const date = new Date(createDate);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const time = `${hours}:${minutes}`;
    return time;
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    const enteredData = {
      user_id: params.mode === "past" ? data.chats.participants[0].id : data.id,
      message: inputRef.current.value,
    };
    inputRef.current.value = "";
    const token = getAuthToken();
    try {
      const response = await axios.post(
        "https://zadapp.mqawilk.com/api/messages",
        JSON.stringify(enteredData),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const retData = await response.data;
      if (retData) {
        setMessages((prev) => {
          return [...prev, retData];
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    Pusher.logToConsole = true;

    const pusher = new Pusher(import.meta.env.VITE_APP_KEY, {
      cluster: import.meta.env.VITE_CLUSTER_KEY,
    });

    const channel = pusher.subscribe(
      `${import.meta.env.VITE_CHANEEL_NAME}.${adminId}`
    );

    channel.bind(import.meta.env.VITE_EVENT_NAME, (data) => {
      console.log(data.message);
      setMessages((prev) => {
        return [...prev, data.message];
      });
    });
  }, []);

  return (
    <div className={styles.chat}>
      <div className={styles.head}>
        <div className={styles.content}>
          <div className={styles.user}>
            <div className={styles.img}>
              <img src={`https://zadapp.mqawilk.com/public/images/${image}`} />
            </div>
            <div className={styles.text}>
              <p>{`${firstName} ${lastName}`}</p>
              <p>{email}</p>
            </div>
          </div>
          <div className={styles.tools}>
            <div className={styles.icon}>
              <RiDeleteBin6Line />
            </div>
            <div className={styles.icon}>
              <PiBookmarkSimpleBold />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.messages}>
          {messages &&
            messages.length > 0 &&
            messages.map((msg, index) => {
              return (
                <div
                  key={index}
                  className={
                    msg.user_id === adminId
                      ? `${styles.message} ${styles.right}`
                      : `${styles.message} ${styles.left}`
                  }
                >
                  <div className={styles.img}>
                    <img
                      src={
                        msg.user_id === adminId
                          ? `https://zadapp.mqawilk.com/public/images/${adminImg}`
                          : `https://zadapp.mqawilk.com/public/images/${image}`
                      }
                    />
                  </div>
                  <div className={styles.msgText}>
                    <span>{msg.body}</span>
                    <span className={styles.time}>
                      {getTime(msg.created_at)}
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
        <div className={styles.sendBox}>
          <form className={styles.sendForm}>
            <button
              type="submit"
              className={styles.submit}
              onClick={formSubmitHandler}
            >
              <IoIosSend />
            </button>
            <div className={styles.textWrapper}>
              <TextareaAutosize
                className={styles.text}
                maxRows={4}
                minRows={1}
                placeholder={t("body.writeHere")}
                ref={inputRef}
              />
              <div className={styles.attachments}>
                <button type="button" className={styles.attachment}>
                  <RiAttachment2 />
                </button>
                <button type="button" className={styles.attachment}>
                  <MdOutlineLibraryAdd />
                </button>
                <button type="button" className={styles.attachment}>
                  <IoImageOutline />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;

// eslint-disable-next-line react-refresh/only-export-components
export async function loader({ params }) {
  const id = params.userId;
  const mode = params.mode;
  let url = "";
  if (mode === "new") {
    url = `https://zadapp.mqawilk.com/api/show/myFrind/${id}`;
  } else if (mode === "past") {
    url = `https://zadapp.mqawilk.com/api/getConversation/${id}`;
  }
  const token = getAuthToken();
  let response = "";
  try {
    response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(error.message);
  }
  return response;
}
