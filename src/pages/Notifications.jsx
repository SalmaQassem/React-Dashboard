import { useLoaderData } from "react-router-dom";
import styles from "../styles/_Notifications.module.scss";
import { getAuthToken } from "../util/auth";
import MainHeader from "../components/UI/MainHeader";
import { useTranslation } from "react-i18next";
import { HiOutlineBellAlert } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import NoData from "../components/UI/NoData";
import { IoNotificationsOffSharp } from "react-icons/io5";
import { FiArrowDown } from "react-icons/fi";
import { useEffect, useState } from "react";

const Notifications = () => {
  const data = useLoaderData();
  const [filteredData, setFilteredData] = useState([]);
  const [index, setIndex] = useState(0);
  const [t, i18n] = useTranslation("global");
  const navigate = useNavigate();

  const loadHandler = (e) => {
    e.stopPropagation();
    setIndex((prevIndex) => {
      return prevIndex + 10;
    });
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
      }
      return fullDate;
    }
  };

  const clickHandler = (e) => {
    navigate(`/dashboard/Houses/${e.currentTarget.id}`);
  };

  useEffect(() => {
    if (data.length > 10) {
      const items = data.slice(index, index + 10);
      setFilteredData((prevData) => {
        return [...prevData, ...items];
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  return (
    <div className={styles.notification}>
      <MainHeader
        text={t("body.notifications")}
        icon={<HiOutlineBellAlert />}
      />
      <div className={styles.body}>
        {data && data.length > 0 ? (
          <div className={styles.list}>
            {(data.length > 10 ? filteredData : data).map((item) => {
              return (
                <div
                  key={item.id}
                  id={item.id}
                  className={styles.listItem}
                  onClick={clickHandler}
                >
                  <div className={styles.text}>
                    <span className={styles.dot} />
                    <div className={styles.img}>
                      <img
                        src={`https://zadapp.mqawilk.com/public/images/${item.user.image}`}
                        alt="user-img"
                      />
                    </div>
                    <div className={styles.info}>
                      <p
                        className={styles.name}
                      >{`${item.user.first_name} ${item.user.last_name}`}</p>
                      <p className={styles.action}>{t("body.addedBuilding")}</p>
                    </div>
                  </div>
                  <div className={styles.date}>
                    {getDate(item.created_at, "date") !== "" && (
                      <span>{getDate(item.created_at, "date")}</span>
                    )}
                    <span>{getDate(item.created_at, "time")}</span>
                  </div>
                </div>
              );
            })}
            {data.length > 10 && filteredData.length < data.length && (
              <button
                className={styles.loadButton}
                type="text"
                onClick={loadHandler}
              >
                <span>{t("body.loadMore")}</span>
                <div className={styles.icon}>
                  <FiArrowDown />
                </div>
              </button>
            )}
          </div>
        ) : (
          <NoData
            message={t("body.noData")}
            icon={<IoNotificationsOffSharp />}
            subMessage={t("body.noNotificatons")}
          />
        )}
      </div>
    </div>
  );
};

export default Notifications;

// eslint-disable-next-line react-refresh/only-export-components
export async function loader() {
  let response = "";
  const token = getAuthToken();
  try {
    response = await fetch(
      "https://zadapp.mqawilk.com/api/houes/notification",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.log(error.message);
  }

  return response;
}
