import styles from "../../styles/_Review.module.scss";
import StyledContainer from "../UI/StyledContainer";
import ImagesGallery from "../UI/ImagesGallery";
import MapView from "../UI/MapView";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { RiHotelLine } from "react-icons/ri";
import { PiDoorOpenLight } from "react-icons/pi";
import { FaKaaba, FaBuildingUser, FaLocationDot } from "react-icons/fa6";
import { FiPhoneCall } from "react-icons/fi";
import {
  AiOutlineFile,
  AiOutlineFileProtect,
  AiOutlineFileSearch,
} from "react-icons/ai";

const House = ({ data, mode }) => {
  const [t, i18n] = useTranslation("global");
  const [isActive, setIsActive] = useState("0");
  const [filter, setFilter] = useState("buildingType");
  const [filteredData, setFilteredData] = useState([]);

  const imgs =
    data[0].media && data[0].media.length > 0
      ? data[0].media.filter((item) => {
          const type = item.mime_type.split("/")[1];
          return type === "png" || type === "jpg" || type === "jpeg";
        })
      : [];
  const files =
    data[0].media && data[0].media.length > 0
      ? data[0].media.filter((item) => {
          const type = item.mime_type.split("/")[1];
          return type === "pdf" || type === "docx" || type === "doc";
        })
      : [];
  const attachments =
    files && files.length > 0
      ? files.map((item, index) => {
          return {
            id: index,
            title: t("body.file"),
            value: (
              <Link to={item.original_url} target="_blank">
                {item.file_name}
              </Link>
            ),
            icon: <AiOutlineFile />,
          };
        })
      : [];
  const records =
    data[0].documents && data[0].documents.length > 0
      ? data[0].documents.map((item, index) => {
          return {
            id: index,
            price: item.price_hajj,
            startDate: item.start_date,
            endDate: item.end_date,
            icon: <AiOutlineFileSearch />,
          };
        })
      : [];

  const filteredItems = [
    {
      name: "buildingType",
      data: [
        {
          id: "0",
          title: t("body.buildingType"),
          value:
            data[0].type === "build" ? t("body.building") : t("body.hotel"),
          icon: <RiHotelLine />,
        },
        {
          id: "1",
          title: t("body.roomsNum"),
          value: data[0].total_room,
          icon: <PiDoorOpenLight />,
        },
        {
          id: "2",
          title: t("body.hajjajNum"),
          value: data[0].hajjaj_count,
          icon: <FaKaaba />,
        },
        {
          id: "3",
          title: t("body.hajjajInPermit"),
          value: data[0].hajjaj_accsept,
          icon: <AiOutlineFile />,
        },
        {
          id: "4",
          title: t("body.permitNum"),
          value: data[0].number_prrmit,
          icon: <AiOutlineFileProtect />,
        },
        {
          id: "5",
          title: t("body.ownerName"),
          value: data[0].house_owner_name,
          icon: <FaBuildingUser />,
        },
        {
          id: "6",
          title: t("body.phone"),
          value: data[0].phone,
          icon: <FiPhoneCall />,
        },
      ],
    },
    {
      name: "attachments",
      data: attachments.slice(),
    },
    {
      name: "records",
      data: records.slice(),
    },
    {
      name: "location",
      data: [
        {
          id: "0",
          title: t("body.buildingAddress"),
          value: data[0].adresse,
          icon: <FaLocationDot />,
        },
      ],
    },
  ];
  const infoItems = [
    { id: "0", name: t("body.buildingData"), category: "buildingType" },
    { id: "1", name: t("body.imagesAndVideos"), category: "imagesAndVideos" },
    { id: "2", name: t("body.attachments"), category: "attachments" },
    { id: "3", name: t("body.location"), category: "location" },
    { id: "4", name: t("body.buildingRecords"), category: "records" },
  ];
  const filterHandler = (e) => {
    setIsActive(e.target.id);
    setFilter(e.target.dataset.category);
  };

  useEffect(() => {
    const items = filteredItems.filter((item) => {
      return item.name === filter;
    });
    setFilteredData(items);
  }, [filter, i18n.language]);

  return (
    <div className={styles.review}>
      <StyledContainer>
        <ImagesGallery images={imgs} />
      </StyledContainer>
      <div className={styles.reviewData}>
        {mode === "showHouse" && (
          <StyledContainer>
            <div className={styles.filters}>
              <p>{t("body.roomsAndHouses")}</p>
              <div className={styles.filterItems}>
                <Link to="/dashboard/EditBuilding">
                  {t("body.editBuilding")}
                </Link>
                <Link to="/dashboard/Contract">{t("body.contract")}</Link>
              </div>
            </div>
          </StyledContainer>
        )}
        <div className={styles.info}>
          <StyledContainer>
            <div className={styles.wrapper}>
              {infoItems.map((item) => {
                return (
                  <div
                    key={item.id}
                    id={item.id}
                    data-category={item.category}
                    className={
                      isActive === item.id
                        ? `${styles.infoItem} ${styles.active}`
                        : styles.infoItem
                    }
                    onClick={filterHandler}
                  >
                    {item.name}
                  </div>
                );
              })}
            </div>
          </StyledContainer>
        </div>
        <div className={styles.data}>
          <StyledContainer>
            <div className={styles.filteredData}>
              {(filteredData.length === 0 ||
                !filteredData[0].data ||
                filteredData[0].data.length === 0) && (
                <p className={styles.message}>{t("body.noData")}</p>
              )}
              {filter !== "records" &&
              filteredData.length > 0 &&
              filteredData[0].data &&
              filteredData[0].data.length > 0 ? (
                <>
                  {filteredData[0].data.map((item) => {
                    return (
                      <div key={item.id} className={styles.item}>
                        <p className={styles.name}>{item.title}</p>
                        <p className={styles.value}>{item.value}</p>
                        <div className={styles.icon}>{item.icon}</div>
                      </div>
                    );
                  })}
                  {filter === "location" && (
                    <div className={styles.map}>
                      <MapView center={[data[0].lat, data[0].lang]} />
                    </div>
                  )}
                </>
              ) : (
                filter === "records" &&
                filteredData.length > 0 &&
                filteredData[0].data &&
                filteredData[0].data.length > 0 && (
                  <>
                    <p className={styles.tableTitle}>
                      {t("body.allContracts")}
                    </p>
                    <div className={styles.table}>
                      <div className={styles.tableHead}>
                        <p>{t("body.tableIndex")}</p>
                        <p>{t("body.startDate")}</p>
                        <p>{t("body.endDate")}</p>
                        <p>{t("body.price")}</p>
                        <p>{t("body.show")}</p>
                      </div>
                      {filteredData[0].data.map((item, index) => {
                        return (
                          <div key={item.id} className={styles.tableBody}>
                            <p>{index + 1}</p>
                            <p>{item.startDate}</p>
                            <p>{item.endDate}</p>
                            <p>{item.price}</p>
                            <p className={styles.icon}>{item.icon}</p>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )
              )}
            </div>
          </StyledContainer>
        </div>
      </div>
    </div>
  );
};

export default House;