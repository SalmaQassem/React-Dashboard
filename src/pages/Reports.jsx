import styles from "../styles/_Reports.module.scss";
import StyledHeader from "../components/UI/MainHeader";
import Table from "../components/UI/Table";
import NoData from "../components/UI/NoData";
import { PiFiles, PiFolderNotchOpenFill } from "react-icons/pi";
import { useTranslation } from "react-i18next";

const Reports = () => {
  const [t, i18n] = useTranslation("global");
  const data = [
    {
      id: 0,
      price_hajj: 3000,
      start_date: "2023/11/01",
      end_date: "2023/11/01",
      notes: "ملاحظة",
    },
    {
      id: 1,
      price_hajj: 4000,
      start_date: "2023/11/01",
      end_date: "2023/11/01",
      notes: "ملاحظة",
    },
    {
      id: 2,
      price_hajj: 2000,
      start_date: "2023/11/01",
      end_date: "2023/11/01",
      notes: "ملاحظة",
    },
    {
      id: 3,
      price_hajj: 200,
      start_date: "2023/11/01",
      end_date: "2023/11/01",
      notes: "ملاحظة",
    },
    {
      id: 4,
      price_hajj: 100,
      start_date: "2023/11/01",
      end_date: "2023/11/01",
      notes: "ملاحظة",
    },
    {
      id: 5,
      price_hajj: 1000,
      start_date: "2023/11/01",
      end_date: "2023/11/01",
      notes: "ملاحظة",
    },
  ];
  const tableHead = [
    { id: "0", text: t("body.tableIndex") },
    { id: "1", text: t("body.hajjPrice") },
    { id: "2", text: t("body.startDate") },
    { id: "3", text: t("body.endDate") },
    { id: "4", text: t("body.notes") },
  ];
  const tableBody = data.map((item) => {
    return {
      price_hajj: item.price_hajj,
      start_date: item.start_date,
      end_date: item.end_date,
      notes: item.notes,
    };
  });

  return (
    <div className={styles.reports}>
      <StyledHeader
        text={t("body.reports")}
        icon={<PiFiles />}
        class={styles.header}
      />
      {data.length > 0 ? (
        <div className={styles.reportsTable}>
          <Table
            tableHead={tableHead}
            tableBody={tableBody}
            data={data}
            rowPerPage={5}
          />
        </div>
      ) : (
        <NoData
          message={t("body.noData")}
          icon={<PiFolderNotchOpenFill />}
          subMessage={t("body.noReports")}
        />
      )}
    </div>
  );
};

export default Reports;
