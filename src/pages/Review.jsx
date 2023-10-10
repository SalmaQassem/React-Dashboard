import styles from "../styles/_Review.module.scss";
import StyledContainer from "../components/UI/StyledContainer";
import ImagesGallery from "../components/UI/ImagesGallery";
import { Link } from "react-router-dom";

const infoItems = [
  { id: "0", name: "بيانات المنشأة" },
  { id: "1", name: "صور وفيديوهات" },
  { id: "2", name: "المستندات" },
  { id: "3", name: "موقع المنشأة" },
  { id: "4", name: "سجل المنشأة" },
];
const data = [
  { id: "0", name: "نوع المنشأة", value: "عمارة", category: "بيانات المنشأة" },
  { id: "1", name: "عدد الغرف", value: "36 غرفة", category: "بيانات المنشأة" },
  {
    id: "2",
    name: "عدد الحجاج الفعلي",
    value: "43 حاج",
    category: "بيانات المنشأة",
  },
];
const Review = () => {
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
              <Link to="contract">تعاقد</Link>
            </div>
          </div>
        </StyledContainer>
        <div className={styles.info}>
          <StyledContainer>
            <div className={styles.wrapper}>
              {infoItems.map((item) => {
                return (
                  <div key={item.id} className={styles.infoItem}>
                    {item.name}
                  </div>
                );
              })}
            </div>
          </StyledContainer>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Review;
