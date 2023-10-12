import styles from "../styles/_Messages.module.scss";
import img from "../assets/images/Ellipse.png";
import { useState } from "react";
import { Form } from "react-router-dom";
import { HiArrowSmLeft, HiArrowSmRight } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { PiBookmarkSimpleBold } from "react-icons/pi";
import StyledContainer from "../components/UI/StyledContainer";

const messages = [
  {
    id: "0",
    name: "أحمد منتصر",
    email: "test@gmail.com",
    message:
      "لوريم إيبسوم هو نص مؤقت يستخدم في التصميم والنشر لإظهار شكل الوثيقة أو الخط دون الاعتماد على محتوى معنوي. قد يستخدم لوريم إيبسوم كنص بديل قبل وضع النص النهائي المطلوب للتصميم. كما يستخدم لإخفاء النص في عملية تسمى بالتغريق، والتي تسمح للمصممين بالنظر إلى شكل صفحة ويب أو منشور، دون أن يؤثر معنى النص على التصميم. يستخدم لإظهار نماذج أولية لبرامج أو تطبيقات أو مواقع إنترنت وغيرها دون ترك أثر كبير",
    imgUrl: img,
  },
  {
    id: "1",
    name: "سلمى قاسم",
    email: "test@gmail.com",
    message:
      "لوريم إيبسوم هو نص مؤقت يستخدم في التصميم والنشر لإظهار شكل الوثيقة أو الخط دون الاعتماد على محتوى معنوي. قد يستخدم لوريم إيبسوم كنص بديل قبل وضع النص النهائي المطلوب للتصميم. كما يستخدم لإخفاء النص في عملية تسمى بالتغريق، والتي تسمح للمصممين بالنظر إلى شكل صفحة ويب أو منشور، دون أن يؤثر معنى النص على التصميم. يستخدم لإظهار نماذج أولية لبرامج أو تطبيقات أو مواقع إنترنت وغيرها دون ترك أثر كبير لوريم إيبسوم هو نص مؤقت يستخدم في التصميم والنشر لإظهار شكل الوثيقة أو الخط دون الاعتماد على محتوى معنوي. قد يستخدم لوريم إيبسوم كنص بديل قبل وضع النص النهائي المطلوب للتصميم. كما يستخدم لإخفاء النص في عملية تسمى بالتغريق، والتي تسمح للمصممين بالنظر إلى شكل صفحة ويب أو منشور، دون أن يؤثر معنى النص على التصميم. يستخدم لإظهار نماذج أولية لبرامج أو تطبيقات أو مواقع إنترنت وغيرها دون ترك أثر كبير",
    imgUrl: img,
  },
];
const Messages = () => {
  const [currentMsg, setCurrentMsg] = useState(0);
  const showNext = () => {
    setCurrentMsg((prevState) => {
      if (prevState < messages.length - 1) {
        return prevState + 1;
      } else {
        return prevState;
      }
    });
  };
  const showPrev = () => {
    setCurrentMsg((prevState) => {
      if (prevState > 0) {
        return prevState - 1;
      } else {
        return prevState;
      }
    });
  };
  return (
    <div className={styles.messages}>
      <div className={styles.head}>
        <StyledContainer>
          <div className={styles.content}>
            <div className={styles.user}>
              <div className={styles.img}>
                <img src={messages[currentMsg].imgUrl} />
              </div>
              <div className={styles.text}>
                <p>{messages[currentMsg].name}</p>
                <p>{messages[currentMsg].email}</p>
              </div>
            </div>
            <div className={styles.tools}>
              <div
                className={
                  currentMsg === messages.length - 1
                    ? `${styles.icon} ${styles.arrow}`
                    : `${styles.icon} ${styles.arrow} ${styles.disable}`
                }
                onClick={showPrev}
              >
                <HiArrowSmRight />
              </div>
              <div
                className={
                  currentMsg === 0
                    ? `${styles.icon} ${styles.arrow}`
                    : `${styles.icon} ${styles.arrow} ${styles.disable}`
                }
                onClick={showNext}
              >
                <HiArrowSmLeft />
              </div>
              <div className={styles.icon}>
                <RiDeleteBin6Line />
              </div>
              <div className={styles.icon}>
                <PiBookmarkSimpleBold />
              </div>
            </div>
          </div>
        </StyledContainer>
      </div>
      <div className={styles.body}>
        <StyledContainer>
          <div className={styles.data}>
            <p>{messages[currentMsg].message}</p>
            <Form className={styles.sendBox}>
              <textarea placeholder="اكتب هنا..."></textarea>
              <button type="submit" className={styles.submit}>
                إرسال
              </button>
            </Form>
          </div>
        </StyledContainer>
      </div>
    </div>
  );
};

export default Messages;
