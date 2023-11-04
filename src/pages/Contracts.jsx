import styles from "../styles/_Contracts.module.scss";
import classes from "../styles/_Pagination.module.scss";
import StyledHeader from "../components/UI/MainHeader";
import { useTranslation } from "react-i18next";
import { AiOutlineFileDone, AiOutlineEdit } from "react-icons/ai";
import { getAuthToken } from "../util/auth";
import { useLoaderData, useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import { AnimatePresence } from "framer-motion";
import Modal from "../components/UI/Modal";
import { FiAlertTriangle } from "react-icons/fi";
import { FaCheck } from "react-icons/fa";
import axios from "axios";
import NoData from "../components/UI/NoData";
import { PiFolderNotchOpenFill } from "react-icons/pi";

const Contracts = () => {
  const data = useLoaderData();
  const [tableData, setTableData] = useState(data);
  const [t, i18n] = useTranslation("global");
  const [deleteModal, setDeleteModal] = useState({
    state: false,
    first: 0,
    index: null,
    contractId: null,
  });
  const [successModal, setsuccessModal] = useState({
    state: false,
    first: 0,
  });
  const [itemOffset, setItemOffset] = useState({ offset: 0, newCounter: 1 });
  const items = Array.from(Array(data.length).keys());
  const itemsPerPage = 8;
  const endOffset = itemOffset.offset + itemsPerPage;
  const currentItems = tableData.slice(itemOffset.offset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);
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
    const contract = e.currentTarget.dataset.contract;
    const deleteIndex = e.currentTarget.id;
    setDeleteModal((prevState) => {
      return {
        ...prevState,
        state: true,
        index: deleteIndex,
        contractId: contract,
      };
    });
  };
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

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset({ offset: newOffset, newCounter: newOffset + 1 });
  };
  const Items = ({ currentItems }) => {
    return (
      <>
        {currentItems.length > 0 && (
          <div className={styles.table}>
            <div className={styles.head}>
              {tableHead.map((item) => {
                return <p key={item.id}>{item.text}</p>;
              })}
            </div>
            <div className={styles.tableBody}>
              {currentItems.map((item, index) => {
                return (
                  <div key={index} className={styles.item}>
                    <p className={styles.num}>
                      {itemOffset.newCounter + index}
                    </p>
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
                );
              })}
            </div>
          </div>
        )}
      </>
    );
  };
  return (
    <>
      <AnimatePresence>
        {deleteModal.state && (
          /*deleteModal.first === 0 &&*/ <Modal
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
          /*successModal.first === 0 &&*/ <Modal
            head={t("body.success")}
            message={t("body.submitDeleteContract")}
            icon={<FaCheck />}
            state="submitDelete"
            setOpened={setsuccessModal}
          />
        )}
      </AnimatePresence>
      <div className={styles.contracts}>
        <StyledHeader
          text={t("body.contracts")}
          icon={<AiOutlineFileDone />}
          class={styles.header}
        />
        {currentItems.length > 0 ? (
          <div className={styles.items}>
            <Items currentItems={currentItems} />
            <ReactPaginate
              nextLabel={
                i18n.language === "ar" ? (
                  <MdKeyboardDoubleArrowLeft />
                ) : (
                  <MdKeyboardDoubleArrowRight />
                )
              }
              previousLabel={
                i18n.language === "ar" ? (
                  <MdKeyboardDoubleArrowRight />
                ) : (
                  <MdKeyboardDoubleArrowLeft />
                )
              }
              onPageChange={handlePageClick}
              breakLabel="..."
              breakClassName={classes.pageBreak}
              pageCount={pageCount}
              pageRangeDisplayed={3}
              marginPagesDisplayed={0}
              containerClassName={classes.pagination}
              pageClassName={classes.pageNumber}
              pageLinkClassName={classes.link}
              previousLinkClassName={classes.prev}
              nextLinkClassName={classes.next}
              disabledLinkClassName={classes.disable}
              activeClassName={classes.active}
              renderOnZeroPageCount={null}
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
