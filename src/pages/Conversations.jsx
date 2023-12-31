import styles from "../styles/_Messages.module.scss";
import { useTranslation } from "react-i18next";
import MainHeader from "../components/UI/MainHeader";
import { IoIosChatbubbles } from "react-icons/io";
import FilterList from "../components/Chat/FilterList";
import { getAuthToken } from "../util/auth";
import { useState, useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import LoadMoreButton from "../components/UI/LoadMoreButton";

const Conversations = () => {
  const [t, i18n] = useTranslation("global");
  const conversations = useLoaderData();
  const [filteredData, setFilteredData] = useState([]);
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  const loadHandler = () => {
    setIndex((prevIndex) => {
      return prevIndex + 6;
    });
  };
  const clickHandler = (e) => {
    navigate(`/dashboard/Chat/past/${e.currentTarget.id}`);
  };
  const getDate = (createDate, type) => {
    const date = new Date(createDate);
    const currentDay = new Date().getDate();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const time = `${hours}:${minutes}`;
    if (type === "time") {
      return time;
    } else {
      const monthes = [
        "jan",
        "feb",
        "mar",
        "apr",
        "may",
        "jun",
        "jul",
        "aug",
        "sep",
        "oct",
        "nov",
        "dec",
      ];
      const day = date.getDate();
      const month = monthes[date.getMonth()];
      const year = date.getFullYear();
      const fullDate = `${month} ${day}, ${year}`;
      if (currentDay === day) {
        return "";
      } else {
        return fullDate;
      }
    }
  };
  useEffect(() => {
    if (conversations.chats.length > 6) {
      const items = conversations.chats.slice(index, index + 6);
      setFilteredData((prevData) => {
        return [...prevData, ...items];
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  return (
    <div className={styles.messages}>
      <MainHeader text={t("body.messages")} icon={<IoIosChatbubbles />} />
      <div className={styles.body}>
        <FilterList />
        {conversations && conversations.chats.length > 0 && (
          <div className={styles.list}>
            {(conversations.chats.length > 6
              ? filteredData
              : conversations.chats
            ).map((item) => {
              return (
                <div
                  key={item.id}
                  id={item.id}
                  className={styles.listItem}
                  onClick={clickHandler}
                >
                  <div className={styles.text}>
                    <div className={styles.img}>
                      <img
                        src={`https://zadapp.mqawilk.com/public/images/${item.participants[0].image}`}
                        alt="user-img"
                      />
                    </div>
                    <div className={styles.info}>
                      <div className={styles.user}>
                        <p
                          className={styles.name}
                        >{`${item.participants[0].first_name} ${item.participants[0].last_name}`}</p>
                        <p>{item.last_message.body}</p>
                      </div>
                    </div>
                  </div>
                  <div className={styles.date}>
                    {getDate(item.created_at, "date") !== "" && (
                      <span>{getDate(item.updated_at, "date")}</span>
                    )}
                    <span>{getDate(item.updated_at, "time")}</span>
                  </div>
                </div>
              );
            })}
            {conversations.chats.length > 6 &&
              filteredData.length < conversations.chats.length && (
                <LoadMoreButton onClickHandler={loadHandler} />
              )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Conversations;

// eslint-disable-next-line react-refresh/only-export-components
export async function loader() {
  let response = "";
  const token = getAuthToken();
  try {
    response = await fetch("https://zadapp.mqawilk.com/api/frindes", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(error.message);
  }
  return response;
}
