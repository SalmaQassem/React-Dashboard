import styles from "../styles/_Contracts.module.scss";
import StyledHeader from "../components/UI/MainHeader";
import { useTranslation } from "react-i18next";
import { AiOutlineFileDone, AiOutlineEdit } from "react-icons/ai";
import { getAuthToken } from "../util/auth";
import { useLoaderData, useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { useState } from "react";

const Contracts = () => {
  const data = useLoaderData();
  const [tableData, setTableData] = useState(data);
  const [t, i18n] = useTranslation("global");
  const navigate = useNavigate();
  const tableHead = [
    { id: "0", text: "م" },
    { id: "1", text: t("body.hajjPrice") },
    { id: "2", text: t("body.startDate") },
    { id: "3", text: t("body.endDate") },
    { id: "4", text: t("body.contractDate") },
    { id: "5", text: t("body.notes") },
    { id: "6", text: t("body.edit") },
    { id: "7", text: t("body.delete") },
  ];
  const editHandler = (e) => {
    const contractId = e.currentTarget.dataset.contract;
    navigate(`/dashboard/EditContract/${contractId}`);
  };
  const deleteHandler = async (e) => {
    const deleteIndex = e.currentTarget.id;
    setTableData((prevState) => {
      const newArr = prevState.filter((item) => {
        return item !== prevState[deleteIndex];
      });
      return newArr;
    });
    
    const contractId = e.currentTarget.dataset.contract;
    const token = getAuthToken();
    try {
      const response = await fetch(
        "https://zadapp.mqawilk.com/api/document/delete/" + contractId,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className={styles.contracts}>
      <StyledHeader
        text={t("body.contracts")}
        icon={<AiOutlineFileDone />}
        class={styles.header}
      />
      {tableData.length > 0 && (
        <div className={styles.table}>
          <div className={styles.head}>
            {tableHead.map((item) => {
              return <p key={item.id}>{item.text}</p>;
            })}
          </div>
          <div className={styles.tableBody}>
            {tableData.map((item, index) => {
              return (
                <div key={index} className={styles.item}>
                  <div className={styles.tableData}>
                    <p className={styles.num}>{index + 1}</p>
                    <p className={styles.name}>{item.price_hajj}</p>
                    <p className={styles.name}>{item.start_date}</p>
                    <p className={styles.name}>{item.end_date}</p>
                    <p className={styles.name}>{item.document_start}</p>
                    <p className={styles.type}>{item.notes}</p>
                    <button
                      type="button"
                      id={index}
                      data-contract={item.id}
                      className={styles.delete}
                      onClick={editHandler}
                    >
                      <AiOutlineEdit />
                    </button>
                    <button
                      type="button"
                      id={index}
                      data-contract={item.id}
                      className={styles.delete}
                      onClick={deleteHandler}
                    >
                      <IoClose />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Contracts;
export async function loader() {
  let response;
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
