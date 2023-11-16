import styles from "../styles/_Messages.module.scss";
import { useTranslation } from "react-i18next";
import MainHeader from "../components/UI/MainHeader";
import { IoIosChatbubbles } from "react-icons/io";
import FilterList from "../components/Chat/FilterList";
import { getAuthToken } from "../util/auth";
import { useLoaderData, useNavigate } from "react-router-dom";

const Messages = () => {
  const [t, i18n] = useTranslation("global");
  const friends = useLoaderData();
  const navigate = useNavigate();

  const clickHandler = (e) => {
    navigate(`/dashboard/Chat/new/${e.currentTarget.id}`);
  };

  return (
    <div className={styles.messages}>
      <MainHeader text={t("body.messages")} icon={<IoIosChatbubbles />} />
      <div className={styles.body}>
        <FilterList />
        <div className={styles.list}>
          {friends &&
            friends.length > 0 &&
            friends.map((item) => {
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
                        src={`https://zadapp.mqawilk.com/public/images/${item.image}`}
                        alt="user-img"
                      />
                    </div>
                    <div className={styles.info}>
                      <div className={styles.user}>
                        <p
                          className={styles.name}
                        >{`${item.first_name} ${item.last_name}`}</p>
                        <p>{item.email}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Messages;

// eslint-disable-next-line react-refresh/only-export-components
export async function loader() {
  let response = "";
  const token = getAuthToken();
  try {
    response = await fetch("https://zadapp.mqawilk.com/api/allMyfrinds", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(error.message);
  }
  return response;
}
