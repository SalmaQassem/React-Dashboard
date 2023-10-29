import styles from "../../styles/_Houses.module.scss";
import classes from "../../styles/_Pagination.module.scss";
import { FaLocationDot } from "react-icons/fa6";
import { FiUserCheck } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { useState } from "react";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";

const Houses = (props) => {
  const [t, i18n] = useTranslation("global");
  const navigate = useNavigate();
  const items = Array.from(Array(props.houses.length).keys());
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 8;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = props.houses.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  const handleClick = (e) => {
    navigate(`Houses/${e.currentTarget.id}`);
  };

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  const Items = (props) => {
    return (
      <>
        {props.currentItems && (
          <div className={styles.houses}>
            {props.currentItems.map((item) => {
              return (
                <div
                  key={item.id}
                  className={styles.card}
                  id={item.id}
                  onClick={handleClick}
                >
                  <div className={styles.image}>
                    <img
                      src={
                        item.media.length > 0 ? item.media[0].original_url : ""
                      }
                      alt="room"
                    />
                  </div>
                  <div className={styles.text}>
                    <h2>{item.house_name}</h2>
                    <div className={`${styles.field} ${styles.rooms}`}>
                      <span className={styles.data}>{item.total_room}</span>
                      <p className={styles.title}>{t("body.floorRooms")}</p>
                    </div>
                    <div className={`${styles.field} ${styles.location}`}>
                      <div className={styles.data}>
                        <FaLocationDot />
                      </div>
                      <span className={styles.title}>{item.street}</span>
                    </div>
                    <div className={`${styles.field} ${styles.owner}`}>
                      <div className={styles.data}>
                        <FiUserCheck />
                      </div>
                      <span
                        className={styles.title}
                      >{`${item.user.first_name} ${item.user.last_name}`}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </>
    );
  };

  return (
    <div className={styles.housesContainer}>
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
  );
};

export default Houses;
