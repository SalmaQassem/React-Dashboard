import styles from "../styles/_Dashboard.module.scss";
import {
  BsClockHistory,
  BsHouseLock,
  BsHouseCheck,
  BsHouseDoor,
} from "react-icons/bs";
import { LuCalendarClock } from "react-icons/lu";
import Chart from "../components/Dashboard/Chart";
import Houses from "../components/Dashboard/Houses";
import { useLoaderData } from "react-router-dom";
import { getAuthToken } from "../util/auth";
import { useTranslation } from "react-i18next";

const Dashboard = () => {
  const [t, i18n] = useTranslation("global");
  const buildings = [
    { name: t("body.buildingCount"), icon: <BsHouseDoor /> },
    { name: t("body.newBuildings"), icon: <BsHouseCheck /> },
    { name: t("body.rentedBuildings"), icon: <BsHouseLock /> },
  ];
  const data = useLoaderData();
  console.log(data);
  const date = new Date(data.data[0]);
  const minute = String(date.getUTCMinutes()).padStart(2, "0");
  const hour = String(date.getUTCHours()).padStart(2, "0");
  const time = `${hour}:${minute}`;

  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const text = `${month + 1}-${day}-${year}`;

  return (
    <div className={styles.dashboard}>
      <div className={styles.info}>
        <div className={styles.dateTime}>
          {data.data.map((item, index) => {
            return (
              <div key={index} className={styles.item}>
                <div className={styles.icon}>
                  {index === 0 ? <BsClockHistory /> : <LuCalendarClock />}
                </div>
                {index === 0 ? (
                  <div className={styles.date}>
                    <span>{text}</span>
                    <span>{time}</span>
                  </div>
                ) : (
                  <span>{item}</span>
                )}
              </div>
            );
          })}
        </div>
        <div className={styles.counters}>
          {data.newContenr.length > 0 && data.newContenr.map((item, index) => {
            return (
              <div key={index} className={styles.card}>
                <div className={styles.icon}>{buildings[index].icon}</div>
                <div className={styles.text}>
                  <p>{buildings[index].name}</p>
                  <span>{item}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.chart}>
        <Chart />
      </div>
      <div className={styles.houses}>
        <h1>{t("body.lastAddedBuildings")}</h1>
        <Houses houses={data.allhoues} />
      </div>
    </div>
  );
};

export default Dashboard;

export async function loader() {
  let response;
  const token = getAuthToken();
  try {
    response = await fetch("https://zadapp.mqawilk.com/api/review", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(error.message);
  }

  return response;
}
