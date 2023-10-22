import { useLoaderData } from "react-router-dom";
import styles from "../styles/_Notifications.module.scss";
import { getAuthToken } from "../util/auth";
import MainHeader from "../components/UI/MainHeader";
import { useTranslation } from "react-i18next";
import { HiOutlineBellAlert } from "react-icons/hi2";
import user from "../assets/images/Ellipse.png";
import { useNavigate } from "react-router-dom";

const Notifications = () => {
  const data = useLoaderData();
  const [t, i18n] = useTranslation("global");
  const navigate = useNavigate();
  const clickHandler = (e) => {
    navigate(`/dashboard/Houses/${e.currentTarget.id}`);
  };
  return (
    <div className={styles.notification}>
      <MainHeader
        text={t("body.notifications")}
        icon={<HiOutlineBellAlert />}
      />
      <div className={styles.body}>
        <div className={styles.list}>
          {data.map((item) => {
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
                    <img src={user} alt="user-img" />
                  </div>
                  <div className={styles.info}>
                    <div className={styles.user}>
                      <p
                        className={styles.name}
                      >{`${item.user.first_name} ${item.user.last_name}`}</p>
                    </div>
                    <p className={styles.action}>{t("body.addedBuilding")}</p>
                  </div>
                </div>
                <div className={styles.date}>{`${new Date(
                  item.created_at
                ).getHours(0,0,0,0)}:${new Date(item.created_at).getSeconds()}`}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Notifications;

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
