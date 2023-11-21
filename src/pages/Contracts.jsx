import styles from "../styles/_Contracts.module.scss";
import { useTranslation } from "react-i18next";
import { getAuthToken } from "../util/auth";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AnimatePresence } from "framer-motion";
import { FiAlertTriangle, FiFilter } from "react-icons/fi";
import { FaRegCalendarAlt, FaCheck } from "react-icons/fa";
import Modal from "../components/UI/Modal";
import axios from "axios";
import NoData from "../components/UI/NoData";
import { PiFolderNotchOpenFill } from "react-icons/pi";
import Table from "../components/UI/Table";
import DateInput from "../components/UI/DateInput";
import { useForm } from "react-hook-form";

const Contracts = () => {
  const data = useLoaderData();
  const [tableData, setTableData] = useState(data);
  const [t, i18n] = useTranslation("global");
  const [deleteModal, setDeleteModal] = useState({
    state: false,
    index: null,
    contractId: null,
  });
  const [successModal, setsuccessModal] = useState({
    state: false,
    first: 0,
  });
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();
  const editHandler = (contractId) => {
    navigate(`/dashboard/EditContract/${contractId}`);
  };
  const deleteHandler = async (contract, deleteIndex) => {
    setDeleteModal((prevState) => {
      return {
        ...prevState,
        state: true,
        index: deleteIndex,
        contractId: contract,
      };
    });
  };
  const tableHead = [
    { id: "0", text: t("body.tableIndex") },
    { id: "1", text: t("body.hajjPrice") },
    { id: "2", text: t("body.startDate") },
    { id: "3", text: t("body.endDate") },
    { id: "4", text: t("body.contractDate") },
    { id: "5", text: t("body.notes") },
    { id: "6", text: t("body.edit") },
    { id: "7", text: t("body.delete") },
  ];
  const tableBody = tableData.map((item) => {
    return {
      price_hajj: item.price_hajj,
      start_date: item.start_date,
      end_date: item.end_date,
      document_start: item.document_start,
      notes: item.notes,
      editButton: {
        handler: editHandler,
        icon: <AiOutlineEdit />,
        contract: item.id,
      },
      deleteButton: {
        handler: deleteHandler,
        class: styles.delete,
        icon: <RiDeleteBin6Line />,
        contract: item.id,
      },
    };
  });
  const changeStartDate = (date) => {
    setStartDate(date);
  };
  const changeEndDate = (date) => {
    setEndDate(date);
  };
  const dateInputs = [
    {
      id: 0,
      name: "startDate",
      type: "date",
      placeholder: t("body.from"),
      icon: <FaRegCalendarAlt />,
      value: startDate !== "" ? startDate : null,
      changeHandler: changeStartDate,
    },
    {
      id: 1,
      name: "endDate",
      type: "date",
      placeholder: t("body.to"),
      icon: <FaRegCalendarAlt />,
      value: endDate !== "" ? endDate : null,
      changeHandler: changeEndDate,
    },
  ];
  const submitDeleteHandler = async () => {
    setTableData((prevState) => {
      const newArr = prevState.filter((item) => {
        return item !== prevState[deleteModal.index];
      });
      return newArr;
    });

    const token = getAuthToken();
    try {
      const response = await axios.delete(
        "https://zadapp.mqawilk.com/api/document/delete/" +
          deleteModal.contractId,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.data;
      if (data.success) {
        setsuccessModal((prevState) => {
          return { ...prevState, state: true };
        });
        setTimeout(() => {
          navigate("/dashboard");
        }, 500);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const submitFilter = () => {
    const filteredData = data.filter((item) => {
      const itemDate = new Date(item.document_start);
      console.log(itemDate);
      return itemDate >= startDate && itemDate <= endDate;
    });
    setTableData(filteredData);
  };
  return (
    <>
      <AnimatePresence>
        {deleteModal.state && (
          <Modal
            head={t("body.delete")}
            message={t("body.deleteContract")}
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
      <div className={styles.contracts}>
        <form
          className={styles.filterForm}
          onSubmit={handleSubmit(submitFilter)}
        >
          <span className={styles.title}>{t("body.contractDate")}</span>
          <div className={styles.inputs}>
            {dateInputs.map((item) => {
              return (
                <div
                  key={item.id}
                  className={
                    i18n.language === "en"
                      ? `${styles.input} ${styles.en}`
                      : styles.input
                  }
                >
                  {item.type === "date" ? (
                    <DateInput
                      placeholder={item.placeholder}
                      name={item.name}
                      defaultValue={item.value}
                      onChange={item.changeHandler}
                    />
                  ) : (
                    <input
                      type={item.type}
                      id={item.id}
                      name={item.name}
                      placeholder={item.placeholder}
                    />
                  )}
                  <div className={styles.icon}>{item.icon}</div>
                </div>
              );
            })}
          </div>
          <button className={styles.filterBtn}>
            <span>{t("body.filter")}</span>
            <span className={styles.icon}>
              <FiFilter />
            </span>
          </button>
        </form>
        {tableData.length > 0 ? (
          <div className={styles.contractsTable}>
            <Table
              tableHead={tableHead}
              tableBody={tableBody}
              data={data}
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
    </>
  );
};

export default Contracts;

// eslint-disable-next-line react-refresh/only-export-components
export async function loader() {
  let response = "";
  const token = getAuthToken();
  try {
    response = await fetch("https://zadapp.mqawilk.com/api/document/index", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(error.message);
  }

  return response;
}
