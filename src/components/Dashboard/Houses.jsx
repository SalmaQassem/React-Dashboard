import styles from "../../styles/_Houses.module.scss";
import image from "../../assets/images/room.png";
import { FaLocationDot } from "react-icons/fa6";
import {FiUserCheck} from "react-icons/fi";

const houses = [
  {
    id: "0",
    house_name: "غرف شقق للإيجار",
    total_room: "5",
    street: "العزيزية السعودية",
    house_owner_name: "عبد العزيز سعود",
  },
  {
    id: "1",
    house_name: "غرف شقق للإيجار",
    total_room: "5",
    street: "العزيزية السعودية",
    house_owner_name: "عبد العزيز سعود",
  },
  {
    id: "2",
    house_name: "غرف شقق للإيجار",
    total_room: "5",
    street: "العزيزية السعودية",
    house_owner_name: "عبد العزيز سعود",
  },
  {
    id: "3",
    house_name: "غرف شقق للإيجار",
    total_room: "5",
    street: "العزيزية السعودية",
    house_owner_name: "عبد العزيز سعود",
  },
  {
    id: "4",
    house_name: "غرف شقق للإيجار",
    total_room: "5",
    street: "العزيزية السعودية",
    house_owner_name: "عبد العزيز سعود",
  },
  {
    id: "5",
    house_name: "غرف شقق للإيجار",
    total_room: "5",
    street: "العزيزية السعودية",
    house_owner_name: "عبد العزيز سعود",
  },
  {
    id: "6",
    house_name: "غرف شقق للإيجار",
    total_room: "5",
    street: "العزيزية السعودية",
    house_owner_name: "عبد العزيز سعود",
  },
  {
    id: "7",
    house_name: "غرف شقق للإيجار",
    total_room: "5",
    street: "العزيزية السعودية",
    house_owner_name: "عبد العزيز سعود",
  },
];
const Houses = () => {
  return (
    <div className={styles.houses}>
      {houses.map((item) => {
        return (
          <div key={item.id} className={styles.card}>
            <div className={styles.image}>
              <img src={image} alt="room" />
            </div>
            <div className={styles.text}>
              <h2>{item.house_name}</h2>
              <div className={`${styles.field} ${styles.rooms}`}>
                <span className={styles.data}>{item.total_room}</span>
                <p className={styles.title}>عدد الغرف لكل دور</p>
              </div>
              <div className={`${styles.field} ${styles.location}`}>
                <div className={styles.data}>
                  <FaLocationDot />
                </div>
                <span className={styles.title}>{item.street}</span>
              </div>
              <div className={`${styles.field} ${styles.owner}`}>
                <div className={styles.data}>
                  <FiUserCheck />
                </div>
                <span className={styles.title}>{item.house_owner_name}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Houses;
