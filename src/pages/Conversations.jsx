import styles from "../styles/_Messages.module.scss";
import { useTranslation } from "react-i18next";
import MainHeader from "../components/UI/MainHeader";
import { IoIosChatbubbles } from "react-icons/io";
import FilterList from "../components/Chat/FilterList";
import { getAuthToken } from "../util/auth";
import { useLoaderData, useNavigate } from "react-router-dom";

const Conversations = () => {
  const [t, i18n] = useTranslation("global");
  const conversations = useLoaderData();
  console.log(conversations);
  const navigate = useNavigate();

  const clickHandler = (e) => {
    navigate(`/dashboard/Chat/past/${e.currentTarget.id}`);
  };

  return (
    <div className={styles.messages}>
      <MainHeader text={t("body.messages")} icon={<IoIosChatbubbles />} />
      <div className={styles.body}>
        <FilterList />
        <div className={styles.list}>
          {conversations &&
            conversations.chats.length > 0 &&
            conversations.chats.map((item, index) => {
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
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Conversations;

export async function loader({ request }) {
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
