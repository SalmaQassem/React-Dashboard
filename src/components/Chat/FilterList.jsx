import styles from "../../styles/_FiltersList.module.scss";
import { FaUserFriends } from "react-icons/fa";
import { PiChatsFill } from "react-icons/pi";
import { HiMiniUserGroup } from "react-icons/hi2";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

const FilterList = () => {
  const [t, i18n] = useTranslation("global");
  const filterList = [
    {
      id: "friends",
      url: "/dashboard/Messages",
      icon: <FaUserFriends />,
      name: t("body.friendsList"),
    },
    {
      id: "chats",
      url: "/dashboard/Conversations",
      icon: <PiChatsFill />,
      name: t("body.chats"),
    },
    {
      id: "groups",
      url: "Groups",
      icon: <HiMiniUserGroup />,
      name: t("body.groups"),
    },
  ];
  return (
    <ul className={styles.filtersList}>
      {filterList.map((item) => {
        return (
          <NavLink
            key={item.id}
            to={item.url}
            className={({ isActive }) =>
              isActive ? `${styles.item} ${styles.active}` : styles.item
            }
            end
          >
            <span>{item.name}</span>
            <span className={styles.icon}>{item.icon}</span>
          </NavLink>
        );
      })}
    </ul>
  );
};

export default FilterList;
