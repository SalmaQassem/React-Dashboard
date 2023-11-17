import styles from "../../styles/_LoadMoreButton.module.scss";
import { FiArrowDown } from "react-icons/fi";
import { useTranslation } from "react-i18next";

const LoadMoreButton = (props) => {
  const [t, i18n] = useTranslation("global");
  
  const loadHandler = (e) => {
    e.stopPropagation();
    props.onClickHandler();
  };

  return (
    <button className={styles.loadButton} type="text" onClick={loadHandler}>
      <span>{t("body.loadMore")}</span>
      <div className={styles.icon}>
        <FiArrowDown />
      </div>
    </button>
  );
};
export default LoadMoreButton;
