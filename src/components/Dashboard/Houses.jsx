import styles from "../../styles/_Houses.module.scss";
//import image from "../../assets/images/room.png";
import { FaLocationDot } from "react-icons/fa6";
import { FiUserCheck } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
const Houses = (props) => {
  const [t, i18n] = useTranslation("global");
  const navigate = useNavigate();
  const handleClick = (e) => {
    navigate(`Houses/${e.currentTarget.id}`);
  };
  return (
    <div className={styles.houses}>
      {props.houses.map((item) => {
        return (
          <div
            key={item.id}
            className={styles.card}
            id={item.id}
            onClick={handleClick}
          >
            <div className={styles.image}>
              <img
                src={item.media.length > 0 ? item.media[0].original_url : ""}
                alt="room"
              />
            </div>
            <div className={styles.text}>
              <h2>{item.house_name}</h2>
              <div className={`${styles.field} ${styles.rooms}`}>
                <span className={styles.data}>{item.total_room}</span>
                <p className={styles.title}>{t("body.floorRooms")}</p>
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
