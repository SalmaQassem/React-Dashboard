import styles from "../styles/_AllSeasons.module.scss";
import StyledHeader from "../components/UI/MainHeader";
import { FaKaaba } from "react-icons/fa6";
import DateTimePicker from "../components/UI/DateTimePicker";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FaRegCalendarAlt, FaCheck } from "react-icons/fa";
import { FiAlertTriangle } from "react-icons/fi";
import { useState, useContext } from "react";
import UserContext from "../store/user-context";
import { getAuthToken } from "../util/auth";
import axios from "axios";
import { useLoaderData } from "react-router-dom";
import Table from "../components/UI/Table";
import NoData from "../components/UI/NoData";
import { PiFolderNotchOpenFill } from "react-icons/pi";
import { IoAddOutline } from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion";
import Modal from "../components/UI/Modal";

const AllSeasons = () => {
  const data = useLoaderData();
  const [tableData, setTableData] = useState(data);
  const [isNew, setIsNew] = useState(false);
  const [deleteModal, setDeleteModal] = useState({
    state: false,
    seasonId: null,
  });
  const [successModal, setsuccessModal] = useState({
    state: false,
  });
  const [t, i18n] = useTranslation("global");
  const userContext = useContext(UserContext);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const inputs = [
    {
      id: 0,
      type: "date",
      name: "startDate",
      placeholder: t("body.startDate"),
      icon: <FaRegCalendarAlt />,
      value: null,
      error: errors.startDate,
    },
    {
      id: 1,
      type: "date",
      name: "endDate",
      placeholder: t("body.endDate"),
      icon: <FaRegCalendarAlt />,
      value: null,
      error: errors.endDate,
    },
  ];
  const getDate = (inputDate) => {
    const offset = new Date().getTimezoneOffset();
    const date = new Date(Date.parse(inputDate) - offset * 60 * 1000)
      .toISOString()
      .replace("T", " ")
      .split(".")[0];
    return date;
  };
  const sendRequest = async (url, enteredData) => {
    const userToken = getAuthToken();
    let ret = null;
    try {
      const response = await axios.post(url, JSON.stringify(enteredData), {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      });
      ret = await response.data;
      return ret;
    } catch (error) {
      console.log(error.message);
    }
  };
  const closeHandler = (seasonId) => {
    setDeleteModal((prevState) => {
      return {
        ...prevState,
        state: true,
        seasonId: seasonId,
      };
    });
  };
  const submitDeleteHandler = async () => {
    const enteredData = {
      user_id: userContext.id,
    };
    const ret = sendRequest(
      `https://zadapp.mqawilk.com/api/close/session/${deleteModal.seasonId}`,
      enteredData
    );
    if (ret) {
      const arr = tableData.slice();
      const index = tableData.findIndex(
        (item) => item.id === deleteModal.seasonId
      );
      arr[index].stutes = "0";
      setTableData([...arr]);
    }
  };
  const tableHead = [
    { id: "0", text: t("body.tableIndex") },
    { id: "1", text: t("body.seasonName") },
    { id: "2", text: t("body.startDate") },
    { id: "3", text: t("body.endDate") },
    { id: "4", text: "" },
  ];
  const tableBody = tableData.map((item) => {
    const boolItem =
      item.stutes === "1"
        ? {
            button1: {
              handler: () => {
                closeHandler(item.id);
              },
              buttonName: "close",
              text: t("body.closeSeason"),
            },
          }
        : { state: t("body.closedSeason") };
    return {
      name: item.name,
      start_date: item.start_date,
      end_date: item.end_date,
      ...boolItem,
    };
  });
  const itemClass =
    i18n.language === "en"
      ? `${styles.inputItem} ${styles.en}`
      : styles.inputItem;

  const addNewSeason = () => {
    setIsNew(true);
  };
  const formSubmitHandler = async (formData) => {
    const enteredData = {
      name: userContext.first_name,
      user_id: userContext.id,
      start_date: getDate(formData.startDate),
      stutes: 1,
      end_date: getDate(formData.endDate),
    };
    const res = await sendRequest(
      "https://zadapp.mqawilk.com/api/open/session",
      enteredData
    );
    if (res) {
      const {
        id,
        name,
        user_id,
        start_date,
        stutes,
        end_date,
        created_at,
        updated_at,
      } = { ...res };
      setTableData((prev) => {
        return [
          ...prev,
          {
            id,
            name,
            user_id,
            start_date: start_date.split(" ")[0],
            stutes: String(stutes),
            end_date: end_date.split(" ")[0],
            created_at,
            updated_at,
          },
        ];
      });
      setValue("startDate", null);
      setValue("endDate", null);
      setIsNew(false);
    }
  };
  return (
    <>
      <AnimatePresence>
        {deleteModal.state && (
          <Modal
            head={t("body.close")}
            message={t("body.closeSeasonMsg")}
            deleteText={t("body.submit")}
            cancelText={t("body.cancel")}
            icon={<FiAlertTriangle />}
            state="delete"
            setOpened={setDeleteModal}
            submitDelete={submitDeleteHandler}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {successModal.state && (
          <Modal
            head={t("body.success")}
            message={t("body.submitDeleteContract")}
            icon={<FaCheck />}
            state="submitDelete"
            setOpened={setsuccessModal}
          />
        )}
      </AnimatePresence>
      <div className={styles.seasons}>
        <StyledHeader
          text={t("body.hajjSeasons")}
          icon={<FaKaaba />}
          class={styles.header}
        />
        <div className={styles.body}>
          <button
            type="button"
            className={styles.addNew}
            onClick={addNewSeason}
          >
            <div className={styles.icon}>
              <IoAddOutline />
            </div>
            <span>{t("body.openNewSeason")}</span>
          </button>
          <AnimatePresence>
            {isNew && (
              <motion.div
                className={styles.formWrapper}
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
                transition={{ type: "spring", duration: 0.5 }}
              >
                <form
                  onSubmit={handleSubmit(formSubmitHandler)}
                  className={styles.form}
                >
                  <div className={styles.inputs}>
                    {inputs.map((item) => {
                      return (
                        <div className={styles.input} key={item.id}>
                          <div
                            className={
                              item.error
                                ? `${itemClass} ${styles.invalid}`
                                : itemClass
                            }
                          >
                            <DateTimePicker
                              name={item.name}
                              placeholder={item.placeholder}
                              register={register}
                              setValue={setValue}
                              defaultValue={item.value}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <button type="submit" className={styles.submit}>
                    {t("body.openSeason")}
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
          {tableData.length > 0 ? (
            <div className={styles.seasonsTable}>
              <Table
                tableHead={tableHead}
                tableBody={tableBody}
                rowPerPage={5}
              />
            </div>
          ) : (
            <NoData
              message={t("body.noData")}
              icon={<PiFolderNotchOpenFill />}
              subMessage={t("body.noContracts")}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default AllSeasons;
// eslint-disable-next-line react-refresh/only-export-components
export async function loader() {
  let response = "";
  const token = getAuthToken();
  try {
    response = await fetch("https://zadapp.mqawilk.com/api/all/session", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(error.message);
  }

  return response;
}
