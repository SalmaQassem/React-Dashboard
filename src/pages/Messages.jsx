import styles from "../styles/_Messages.module.scss";
import { useTranslation } from "react-i18next";
import MainHeader from "../components/UI/MainHeader";
import { IoIosChatbubbles } from "react-icons/io";
import FilterList from "../components/Chat/FilterList";
import { getAuthToken } from "../util/auth";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import LoadMoreButton from "../components/UI/LoadMoreButton";

const Messages = () => {
  const [t, i18n] = useTranslation("global");
  const friends = useLoaderData();
  const [filteredData, setFilteredData] = useState([]);
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  const loadHandler = () => {
    setIndex((prevIndex) => {
      return prevIndex + 6;
    });
  };
  const clickHandler = (e) => {
    navigate(`/dashboard/Chat/new/${e.currentTarget.id}`);
  };
  useEffect(() => {
    if (friends.length > 6) {
      const items = friends.slice(index, index + 6);
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
        {friends && friends.length > 0 && (
          <div className={styles.list}>
            {(friends.length > 6 ? filteredData : friends).map((item) => {
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
            {friends.length > 6 && filteredData.length < friends.length && (
              <LoadMoreButton onClickHandler={loadHandler} />
            )}
          </div>
        )}
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
