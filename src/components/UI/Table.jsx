import styles from "../../styles/_Table.module.scss";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";

const Table = ({ tableHead, tableBody, data, rowPerPage }) => {
  const [t, i18n] = useTranslation("global");
  const [dataIndex, setDataIndex] = useState(0);
  const [nextDisable, setNextDisable] = useState(false);
  const [prevDisable, setPrevDisable] = useState(true);
  const currentItems = tableBody.slice(dataIndex, dataIndex + rowPerPage);

  const clickNextHandler = () => {
    if (dataIndex + rowPerPage < data.length) {
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
    if (data.length > 0 && dataIndex + rowPerPage >= data.length) {
      setNextDisable(true);
      setPrevDisable(false);
    }
    if (dataIndex - rowPerPage < 0) {
      setPrevDisable(true);
      setNextDisable(false);
    }
  }, [dataIndex, data.length]);

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
                    if (
                      itemKey !== "editButton" &&
                      itemKey !== "deleteButton"
                    ) {
                      return (
                        <td
                          key={itemKey}
                          className={i18n.language === "en" ? styles.en : ""}
                        >
                          {item[itemKey]}
                        </td>
                      );
                    } else {
                      return (
                        <td key={itemKey}>
                          <button
                            className={
                              itemKey === "deleteButton"
                                ? item[itemKey].class
                                : ""
                            }
                            data-item={item[itemKey]}
                            data-count={index}
                            onClick={() => {
                              item[itemKey].handler(
                                item[itemKey].contract,
                                index
                              );
                            }}
                          >
                            {item[itemKey].icon}
                          </button>
                        </td>
                      );
                    }
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
            nextDisable ? data.length : dataIndex + rowPerPage
          } ${t("body.from")} ${data.length}`}
        </p>
        <div className={styles.buttons}>
          <button
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