import styles from "../../styles/_ThirdPage.module.scss";
import Map from "./Map";
import FormButton from "../UI/FormButton";
import { useState, useContext } from "react";
import BuildingContext from "../../store/building-context";
import UserContext from "../../store/user-context";
import { LiaHotelSolid } from "react-icons/lia";
import { getAuthToken } from "../../util/auth";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Modal from "../UI/Modal";
import { AnimatePresence } from "framer-motion";
import { FaCheck } from "react-icons/fa";
import axios from "axios";
import { FiAlertTriangle } from "react-icons/fi";

const ThirdPage = (props) => {
  const [t, i18n] = useTranslation("global");
  const context = useContext(BuildingContext);
  const userData = useContext(UserContext);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const sendData = async (data) => {
    if (!isSubmitting) {
      setIsSubmitting(true);
      const userToken = getAuthToken();
      try {
        const response = await axios.post(props.url, data, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${userToken}`,
          },
        });
        const res = await response.data;
        setIsSubmitting(false);
        if (props.state === "edit") {
          setIsModalOpened(true);
          setTimeout(() => {
            navigate("/dashboard");
          }, 500);
        } else {
          setIsModalOpened(true);
          setTimeout(() => {
            navigate(`/dashboard/Houses/${res.id}`);
          }, 1000);
        }
      } catch (error) {
        setIsSubmitting(false);
        setIsError(true);
        setTimeout(() => {
          setIsError(false);
        }, 1000);
      }
    }
  };

  const saveData = async () => {
    const formData = new FormData();
    formData.append("user_id", userData.id);
    for (let key of Object.keys(context)) {
      if (
        key !== "setFormData" &&
        key !== "setPage" &&
        key !== "page" &&
        key !== "id"
      ) {
        if (key === "media") {
          for (let i = 0; i < context[key].length; i++) {
            if (
              context[key][i].type === "application/pdf" ||
              context[key][i].type === "application/docx" ||
              context[key][i].type === "application/doc"
            ) {
              formData.append("attached_file[]", context[key][i]);
            } else {
              formData.append("media[]", context[key][i]);
            }
          }
        } else {
          formData.append(key, context[key]);
        }
      }
    }
    sendData(formData);
  };

  return (
    <>
      <AnimatePresence>
        {isModalOpened && (
          <Modal
            head={t("body.success")}
            message={
              props.state === "edit"
                ? t("body.editBuildingSuccess")
                : t("body.addBuildingSuccess")
            }
            buttonText={t("body.close")}
            icon={<FaCheck />}
            state={props.state}
            setOpened={setIsModalOpened}
          />
        )}
      </AnimatePresence>
      {isError && (
        <AnimatePresence>
          <Modal
            head={t("body.error")}
            message={t("body.addBuildingError")}
            icon={<FiAlertTriangle />}
            state="error"
          />
        </AnimatePresence>
      )}
      <div className={styles.map}>
        <p>{t("body.showOnMap")}</p>
        <div className={styles.mapItem}>
          <Map oldData={props.state === "edit" ? props.thirdPageData : null} />
        </div>
        <FormButton
          class={styles.save}
          type="button"
          icon={<LiaHotelSolid />}
          onClick={saveData}
        >
          {isSubmitting
            ? `${t("body.submitting")}...`
            : t("body.saveRegistration")}
        </FormButton>
      </div>
    </>
  );
};

export default ThirdPage;
