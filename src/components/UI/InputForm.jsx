import StyledContainer from "./StyledContainer";
import frame from "../../assets/images/Frame.png";
import styles from "../../styles/_InputForm.module.scss";

const InputForm = (props) => {
  return (
    <div className={styles.form}>
      <StyledContainer>
        <div className={styles.content}>
          {props.children}
          <div className={styles.image}>
            <img src={frame} alt="frame" />
          </div>
        </div>
      </StyledContainer>
    </div>
  );
};
export default InputForm;
