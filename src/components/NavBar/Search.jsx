import styles from "../../styles/_Search.module.scss";
import { useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineSearch } from "react-icons/hi";
import { getAuthToken } from "../../util/auth";
import ModeContext from "../../store/mode-context";
import { useTranslation } from "react-i18next";

const Search = () => {
  const searchRef = useRef();
  const navigate = useNavigate();
  const modeContext = useContext(ModeContext);
  const modeType = modeContext.mode === "dark" ? styles.dark : "";
  const [t, i18n] = useTranslation("global");

  const searchHandler = async () => {
    if (searchRef.current.value.trim() !== "") {
      const enteredData = searchRef.current.value.trim();
      const token = getAuthToken();
      let response;
      try {
        response = await fetch("https://zadapp.mqawilk.com/api/house/search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(enteredData),
        });
        const data = await response.json();
        const id = data.id;
        navigate(`Houses/${id}`);
        searchRef.current.value = "";
      } catch (error) {
        console.log(error.message);
      }
    }
  };
  
  return (
    <div className={styles.search}>
      <div className={`${styles.input} ${modeType}`}>
        <input placeholder={t("body.search")} ref={searchRef} />
        <div className={styles.searchIcon} onClick={searchHandler}>
          <HiOutlineSearch />
        </div>
      </div>
    </div>
  );
};

export default Search;
