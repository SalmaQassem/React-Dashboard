import styles from "../styles/_Review.module.scss";
import StyledContainer from "../components/UI/StyledContainer";
import ImagesGallery from "../components/UI/ImagesGallery";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { RiHotelLine } from "react-icons/ri";
import { PiDoorOpenLight } from "react-icons/pi";
import { FaKaaba } from "react-icons/fa6";
import { AiOutlineFile, AiOutlineFileProtect } from "react-icons/ai";

const infoItems = [
  { id: "0", name: "بيانات المنشأة" },
  { id: "1", name: "صور وفيديوهات" },
  { id: "2", name: "المستندات" },
  { id: "3", name: "موقع المنشأة" },
  { id: "4", name: "سجل المنشأة" },
];
const data = [
  {
    id: "0",
    name: "نوع المنشأة",
    value: "عمارة",
    category: "بيانات المنشأة",
    icon: <RiHotelLine />,
  },
  {
    id: "1",
    name: "عدد الغرف",
    value: "36 غرفة",
    category: "بيانات المنشأة",
    icon: <PiDoorOpenLight />,
  },
  {
    id: "2",
    name: "عدد الحجاج الفعلي",
    value: "43 حاج",
    category: "بيانات المنشأة",
    icon: <FaKaaba />,
  },
  {
    id: "3",
    name: "عدد الحجاج في التصريح",
    value: "33 حاج",
    category: "بيانات المنشأة",
    icon: <AiOutlineFile />,
  },
  {
    id: "4",
    name: "رقم التصريح",
    value: "1877374718",
    category: "بيانات المنشأة",
    icon: <AiOutlineFileProtect />,
  },
];
const Review = () => {
  const [isActive, setIsActive] = useState("0");
  const [filter, setFilter] = useState("بيانات المنشأة");
  const [filteredData, setFilteredData] = useState([]);
  const filterHandler = (e) => {
    //console.log(e.target.id);
    setIsActive(e.target.id);
    setFilter(e.target.textContent);
  };
  useEffect(() => {
    const filteredItems = data.filter((item) => {
      return item.category === filter;
    });
    setFilteredData(filteredItems);
  }, [filter]);

  return (
    <div className={styles.review}>
      <StyledContainer>
        <ImagesGallery />
      </StyledContainer>
      <div className={styles.reviewData}>
        <StyledContainer>
          <div className={styles.filters}>
            <p>غرف شقق للإيجار موسم الحج في العزيزية مكة</p>
            <div className={styles.filterItems}>
              <Link to="/dashboard/AddBuilding">تعديل بيانات المنشأة</Link>
              <Link to="/dashboard/Contract">تعاقد</Link>
            </div>
          </div>
        </StyledContainer>
        <div className={styles.info}>
          <StyledContainer>
            <div className={styles.wrapper}>
              {infoItems.map((item) => {
                return (
                  <div
                    key={item.id}
                    id={item.id}
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
                <p className={styles.message}>لا توجد بيانات</p>
              ) : (
                filteredData.map((item) => {
                  return (
                    <div key={item.id} className={styles.item}>
                      <p className={styles.name}>{item.name}</p>
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

export default Review;
