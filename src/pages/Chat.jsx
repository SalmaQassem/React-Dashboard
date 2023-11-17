import styles from "../styles/_Chat.module.scss";
import StyledContainer from "../components/UI/StyledContainer";
import { useLoaderData, useParams } from "react-router-dom";
import { getAuthToken } from "../util/auth";
import { RiDeleteBin6Line } from "react-icons/ri";
import { PiBookmarkSimpleBold } from "react-icons/pi";
import { IoSend } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import Pusher from "pusher-js";
import { useState, useContext } from "react";
import UserContext from "../store/user-context";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState(null);
  const context = useContext(UserContext);
  let allMessages = [];
  const params = useParams();
  const adminId = context.id;
  const adminImg = context.image;
  const data = useLoaderData();

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
  const [t, i18n] = useTranslation("global");
  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    Pusher.logToConsole = true;

    const pusher = new Pusher(import.meta.env.VITE_APP_KEY, {
      cluster: import.meta.env.VITE_CLUSTER_KEY,
      /*channelAuthorization: {
        //endpoint: "https://zadapp.mqawilk.com/api/broadcasting/auth",
      },*/
    });

    const channel = pusher.subscribe(
      `${import.meta.env.VITE_CHANEEL_NAME}.${adminId}`
    );

    channel.bind(import.meta.env.VITE_EVENT_NAME, (data) => {
      console.log(data);
      //allMessages.push(data);
      setMessages((prev) => {
        return [...prev, data];
      });
    });
  }, []);

  const formSubmitHandler = async (formData) => {
    console.log(formData.sentMessage);
    const enteredData = {
      user_id: params.mode === "past" ? data.chats.participants[0].id : data.id,
      //message: message,
      message: formData.sentMessage,
    };
    const token = getAuthToken();
    try {
      const response = await fetch("https://zadapp.mqawilk.com/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(enteredData),
      });
    } catch (error) {
      console.log(error.message);
    }
  };
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
        <div className={styles.data}>
          <div className={styles.messages}>
            {messages.length > 0 &&
              messages.map((msg, index) => {
                return (
                  <div
                    key={index}
                    /*className={
                        msg.user_id === adminId
                          ? `${styles.message} ${styles.right}`
                          : `${styles.message} ${styles.left}`
                      }*/
                  >
                    {/*<div className={styles.img}>
                        <img
                          src={
                            msg.user_id === adminId
                              ? `https://zadapp.mqawilk.com/public/images/${adminImg}`
                              : `https://zadapp.mqawilk.com/public/images/${image}`
                          }
                        />
                        </div>*/}
                    <span>{msg.body}</span>
                  </div>
                );
              })}
            {data.message &&
              data.message.length > 0 &&
              data.message.map((msg, index) => {
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
                    <span>{msg.body}</span>
                  </div>
                );
              })}
          </div>
          <form
            onSubmit={handleSubmit(formSubmitHandler)}
            className={styles.sendBox}
          >
            <textarea
              className={styles.text}
              placeholder={t("body.writeHere")}
              {...register("sentMessage")}
            />
            <button type="submit" className={styles.submit}>
              <div className={styles.icon}>
                <IoSend />
              </div>
              <span>{t("body.send")}</span>
            </button>
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
