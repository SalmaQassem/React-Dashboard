import styles from "../styles/_Review.module.scss";
import StyledContainer from "../components/UI/StyledContainer";
import ImagesGallery from "../components/UI/ImagesGallery";
import { getAuthToken } from "../util/auth";
import { useLoaderData } from "react-router-dom";
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
  //console.log(data);
  const imgs = data.media;
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
          value: data.type,
          icon: <RiHotelLine />,
        },
        {
          id: "1",
          title: t("body.roomsNum"),
          value: data.total_room,
          icon: <PiDoorOpenLight />,
        },
        {
          id: "2",
          title: t("body.hajjajNum"),
          value: data.hajjaj_count,
          icon: <FaKaaba />,
        },
        {
          id: "3",
          title: t("body.hajjajInPermit"),
          value: data.hajjaj_accsept,
          icon: <AiOutlineFile />,
        },
        {
          id: "4",
          title: t("body.permitNum"),
          value: data.number_prrmit,
          icon: <AiOutlineFileProtect />,
        },
        {
          id: "5",
          title: t("body.ownerName"),
          value: data.house_owner_name,
          icon: <FaBuildingUser />,
        },
        {
          id: "6",
          title: t("body.phone"),
          value: data.phone,
          icon: <FiPhoneCall />,
        },
      ],
    },
    /*{
      name: "attachments",
      data: [
        { title: "", value: data.type },
        { title: "", value: data.total_room },
        { title: "", value: data.hajjaj_count },
        { title: "", value: data.hajjaj_accsept },
        { title: "", value: data.number_prrmit },
        { title: "", value: data.house_owner_name },
        { title: "", value: data.phone },
      ],
    },*/
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
  }, [filter]);

  return (
    <div className={styles.review}>
      <StyledContainer>
        <ImagesGallery images={imgs}/>
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
          <div className={styles.img} />
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
