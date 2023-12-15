import styles from "../../styles/_DropBox.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaRegUser } from "react-icons/fa6";
import { AiOutlineMessage } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { motion } from "framer-motion";
import { getAuthToken } from "../../util/auth";
import Cookies from "js-cookie";
import UserInfo from "./UserInfo";
import axios from "axios";

const DropBox = ({ setShown }) => {
  const [t, i18n] = useTranslation("global");
  const navigate = useNavigate();
  const links = [
    {
      id: "0",
      type: "link",
      url: "/dashboard/Profile",
      name: t("body.profile"),
      icon: <FaRegUser />,
    },
    {
      id: "1",
      type: "link",
      url: "/dashboard/Messages",
      name: t("body.messages"),
      icon: <AiOutlineMessage />,
    },
    {
      id: "2",
      type: "button",
      url: "/Logout",
      name: t("body.logOut"),
      icon: <BiLogOut />,
    },
  ];
  const clickHandler = () => {
    setShown();
  };
  const logOutHandler = async () => {
    clickHandler();
    const accessToken = getAuthToken();
    const enteredData = {
      token: accessToken,
    };
    try {
      const response = await axios.post(
        "https://zadapp.mqawilk.com/api/logout",
        enteredData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = await response.data;
      if (data && data.message) {
        sessionStorage.removeItem("houseId");
        sessionStorage.removeItem("userId");
        Cookies.remove("token");
        Cookies.remove("userData");
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <motion.div
      className={
        i18n.language === "en"
          ? `${styles.dropBoxContainer} ${styles.en}`
          : styles.dropBoxContainer
      }
      initial={{ height: 0 }}
      animate={{ height: "auto" }}
      exit={{ height: 0 }}
      transition={{ type: "spring", duration: 0.5 }}
    >
      <ul className={styles.dropBox}>
        <UserInfo extraClass={styles.userInfo} />
        {links.map((link) => {
          return link.type === "link" ? (
            <Link
              key={link.id}
              to={link.url}
              className={styles.item}
              onClick={clickHandler}
            >
              <span className={styles.icon}>{link.icon}</span>
              <span>{link.name}</span>
            </Link>
          ) : (
            <button
              key={link.id}
              className={styles.item}
              onClick={logOutHandler}
            >
              <span className={styles.icon}>{link.icon}</span>
              <span>{link.name}</span>
            </button>
          );
        })}
      </ul>
    </motion.div>
  );
};

export default DropBox;
