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

const dateTime = [
  { id: "0", value: "13:35", icon: <BsClockHistory /> },
  { id: "1", value: "30صفر1445", icon: <LuCalendarClock /> },
];

const buildings = [
  { id: "0", name: "عدد المنشأت", value: "583", icon: <BsHouseDoor /> },
  {
    id: "1",
    name: "عدد المنشأت الجديدة",
    value: "583",
    icon: <BsHouseCheck />,
  },
  { id: "2", name: "عدد المنشأت المؤجرة", value: "583", icon: <BsHouseLock /> },
];

const Dashboard = () => {
  return (
    <div className={styles.dashboard}>
      <div className={styles.info}>
        <div className={styles.dateTime}>
          {dateTime.map((item) => {
            return (
              <div key={item.id} className={styles.item}>
                <div className={styles.icon}>{item.icon}</div>
                <span>{item.value}</span>
              </div>
            );
          })}
        </div>
        <div className={styles.counters}>
          {buildings.map((item) => {
            return (
              <div key={item.id} className={styles.card}>
                <div className={styles.icon}>{item.icon}</div>
                <div className={styles.text}>
                  <p>{item.name}</p>
                  <span>{item.value}</span>
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
        <h1>أخر سكن أو فندق تم إضافته</h1>
        <Houses />
      </div>
    </div>
  );
};

export default Dashboard;
