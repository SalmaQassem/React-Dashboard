import styles from "../../styles/_Modal.module.scss";
import { motion } from "framer-motion";
import Overlay from "./Overlay";

const Modal = ({
  icon,
  head,
  message,
  deleteText,
  cancelText,
  setOpened,
  state,
  submitDelete,
}) => {
  const closeHandler = () => {
    setOpened((prevState) => {
      return { ...prevState, state: false };
    });
  };
  const deleteHandler = () => {
    submitDelete();
    setOpened((prevState) => {
      return { ...prevState, state: false };
    });
  };
  return (
    <>
      <Overlay />
      <motion.div
        className={styles.modal}
        transition={{ type: "spring", duration: 0.3 }}
        initial={{
          opacity: 0,
          left: "50%",
          top: "50%",
          x: "-50%",
          y: "20%",
        }}
        animate={{
          opacity: 1,
          left: "50%",
          top: "50%",
          x: "-50%",
          y: "-50%",
        }}
        exit={{ opacity: 0, left: "50%", top: "50%", x: "-50%", y: "20%" }}
      >
        <div
          className={
            state === "delete" || state === "error"
              ? `${styles.icon} ${styles.deleteIcon}`
              : styles.icon
          }
        >
          {icon}
        </div>
        <h1 className={styles.head}>{head}</h1>
        <p className={styles.message}>{message}</p>
        {state !== "add" && state !== "edit" && state !== "submitDelete" && (
          <div className={styles.buttons}>
            {state === "delete" && (
              <>
                <button className={styles.deleteButton} onClick={deleteHandler}>
                  {deleteText}
                </button>
                <button className={styles.cancelButton} onClick={closeHandler}>
                  {cancelText}
                </button>
              </>
            )}
          </div>
        )}
      </motion.div>
    </>
  );
};

export default Modal;
