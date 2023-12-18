import styles from "../../styles/_Table.module.scss";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";

const Table = ({ tableHead, tableBody, rowPerPage }) => {
  const [t, i18n] = useTranslation("global");
  const [dataIndex, setDataIndex] = useState(0);
  const [nextDisable, setNextDisable] = useState(false);
  const [prevDisable, setPrevDisable] = useState(true);
  const currentItems = tableBody.slice(dataIndex, dataIndex + rowPerPage);
  if (currentItems.length === 0) {
    if (dataIndex - rowPerPage >= 0) {
      setDataIndex((prev) => {
        return prev - rowPerPage;
      });
    }
  }

  const clickNextHandler = () => {
    if (dataIndex + rowPerPage < tableBody.length) {
      setDataIndex((prev) => {
        return prev + rowPerPage;
      });
    }
  };
  const clickPrevHandler = () => {
    if (dataIndex - rowPerPage >= 0) {
      setDataIndex((prev) => {
        return prev - rowPerPage;
      });
    }
  };
  useEffect(() => {
    if (dataIndex + rowPerPage >= tableBody.length) {
      setNextDisable(true);
    } else {
      setNextDisable(false);
    }
    if (dataIndex - rowPerPage < 0) {
      setPrevDisable(true);
    } else {
      setPrevDisable(false);
    }
  }, [dataIndex, tableBody, rowPerPage]);

  return (
    <>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead className={styles.head}>
            <tr>
              {tableHead.map((item) => {
                return (
                  <th
                    className={i18n.language === "en" ? styles.en : ""}
                    key={item.id}
                  >
                    {item.text}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className={styles.body}>
            {currentItems.map((item, index) => {
              return (
                <tr key={index}>
                  <td className={i18n.language === "en" ? styles.en : ""}>
                    {dataIndex + index + 1}
                  </td>
                  {Object.keys(item).map((itemKey) => {
                    return (
                      <td
                        key={itemKey}
                        className={i18n.language === "en" ? styles.en : ""}
                      >
                        {!itemKey.startsWith("button") ? (
                          item[itemKey]
                        ) : (
                          <button
                            type="button"
                            className={
                              item[itemKey].buttonName === "deleteButton"
                                ? item[itemKey].class
                                : ""
                            }
                            onClick={() => {
                              item[itemKey].handler();
                            }}
                          >
                            {item[itemKey].icon
                              ? item[itemKey].icon
                              : item[itemKey].text}
                          </button>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className={styles.pagination}>
        <p className={styles.pages}>
          {`${dataIndex + 1}–${
            nextDisable ? tableBody.length : dataIndex + rowPerPage
          } ${t("body.from")} ${tableBody.length}`}
        </p>
        <div className={styles.buttons}>
          <button
            type="button"
            className={prevDisable ? styles.disabled : ""}
            onClick={!prevDisable ? clickPrevHandler : () => {}}
            title={!prevDisable ? t("body.goPrev") : ""}
          >
            {i18n.language === "ar" ? (
              <MdKeyboardArrowRight />
            ) : (
              <MdKeyboardArrowLeft />
            )}
          </button>
          <button
            type="button"
            className={nextDisable ? styles.disabled : ""}
            onClick={!nextDisable ? clickNextHandler : () => {}}
            title={!nextDisable ? t("body.goNext") : ""}
          >
            {i18n.language === "ar" ? (
              <MdKeyboardArrowLeft />
            ) : (
              <MdKeyboardArrowRight />
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default Table;
