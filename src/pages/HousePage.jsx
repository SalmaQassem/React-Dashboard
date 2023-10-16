import styles from "../styles/_Review.module.scss";
import StyledContainer from "../components/UI/StyledContainer";
import ImagesGallery from "../components/UI/ImagesGallery";
import { getAuthToken } from "../util/auth";
import { useLoaderData, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { RiHotelLine } from "react-icons/ri";
import { PiDoorOpenLight } from "react-icons/pi";
import { AiOutlineFile, AiOutlineFileProtect } from "react-icons/ai";
import { FaKaaba, FaBuildingUser } from "react-icons/fa6";
import { FiPhoneCall } from "react-icons/fi";

const HousePage = () => {
  const data = useLoaderData();
  const [t, i18n] = useTranslation("global");
  const [isActive, setIsActive] = useState("0");
  const [filter, setFilter] = useState("buildingType");
  const [filteredData, setFilteredData] = useState([]);
  const imgs =
    data[0].media.length > 0
      ? data[0].media.filter((item) => {
          const type = item.mime_type.split("/")[1];
          return type === "png" || type === "jpg";
        })
      : [];
  const files =
    data[0].media.length > 0
      ? data[0].media.filter((item) => {
          const type = item.mime_type.split("/")[1];
          return type === "pdf";
        })
      : [];
  const attachments =
    files.length > 0
      ? files.map((item, index) => {
          return {
            id: index,
            title: t("body.file"),
            value: <Link to={item.original_url} target="_blank">{item.file_name}</Link>,
            icon: <AiOutlineFile />,
          };
        })
      : [];
  const infoItems = [
    { id: "0", name: t("body.buildingData"), category: "buildingType" },
    { id: "1", name: t("body.imagesAndVideos"), category: "imagesAndVideos" },
    { id: "2", name: t("body.attachments"), category: "attachments" },
    { id: "3", name: t("body.location"), category: "location" },
    { id: "4", name: "سجل المنشأة", category: "location" },
  ];
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
          {/*/<div className={styles.img} />*/}
          <StyledContainer>
            <div className={styles.filteredData}>
              {filteredData.length === 0 ? (
                <p className={styles.message}>{t("body.noData")}</p>
              ) : (
                filteredData[0].data.map((item) => {
                  return (
                    <div key={item.id} className={styles.item}>
                      <p className={styles.name}>{item.title}</p>
                      <p className={styles.value}>{item.value}</p>
                      <div className={styles.icon}>{item.icon}</div>
                    </div>
                  );
                })
              )}
            </div>
          </StyledContainer>
        </div>
      </div>
    </div>
  );
};

export default HousePage;

export async function loader({ request, params }) {
  const id = params.imageId;
  const token = getAuthToken();
  let response = "";
  try {
    response = await fetch(
      "https://zadapp.mqawilk.com/api/show/selfhoues/" + id,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.log(error.message);
  }

  return response;
}
