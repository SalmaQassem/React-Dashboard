import styles from "../styles/_Messages.module.scss";
import img from "../assets/images/Ellipse.png";
import { useState } from "react";
import { Form } from "react-router-dom";
import { HiArrowSmLeft, HiArrowSmRight } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { PiBookmarkSimpleBold } from "react-icons/pi";
import StyledContainer from "../components/UI/StyledContainer";
import { getAuthToken } from "../util/auth";
import { useLoaderData } from "react-router-dom";
import { useTranslation } from "react-i18next";

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
  const [t, i18n] = useTranslation("global");
  const data = useLoaderData();
  const [currentMsg, setCurrentMsg] = useState(0);
  const isEnglish = i18n.language === "en" ? "en" : "";

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
                    ? `${styles.icon} ${styles.prevArrow}`
                    : `${styles.icon} ${styles.prevArrow} ${styles.disable}`
                }
                onClick={showPrev}
              >
                {isEnglish !== "" ? <HiArrowSmLeft /> : <HiArrowSmRight />}
              </div>
              <div
                className={
                  currentMsg === 0
                    ? `${styles.icon} ${styles.nextArrow}`
                    : `${styles.icon} ${styles.nextArrow} ${styles.disable} `
                }
                onClick={showNext}
              >
                {isEnglish !== "" ? <HiArrowSmRight /> : <HiArrowSmLeft />}
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
              <textarea placeholder={t("body.writeHere")}></textarea>
              <button type="submit" className={styles.submit}>
                {t("body.send")}
              </button>
            </Form>
          </div>
        </StyledContainer>
      </div>
    </div>
  );
};

export default Messages;

export async function loader() {
  let response;
  const token = getAuthToken();
  try {
    response = await fetch("", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(error.message);
  }
  //console.log(response);
  return response;
}
export async function action() {
  return "";
}
