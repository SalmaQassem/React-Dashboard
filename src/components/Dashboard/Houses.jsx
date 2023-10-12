import styles from "../../styles/_Houses.module.scss";
//import image from "../../assets/images/room.png";
import { FaLocationDot } from "react-icons/fa6";
import { FiUserCheck } from "react-icons/fi";

const Houses = (props) => {
  return (
    <div className={styles.houses}>
      {props.houses.map((item) => {
        return (
          <div key={item.id} className={styles.card}>
            <div className={styles.image}>
              <img src={item.media} alt="room" />
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
                <span
                  className={styles.title}
                >{`${item.user.first_name} ${item.user.last_name}`}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Houses;
