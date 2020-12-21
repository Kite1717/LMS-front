import React from "react";
import MyExams from "./TableMyExams/MyExams";
import MyMeetings from "./TableMyMeetings/MyMeetings";
import MyCertificates from "./TableCertificates/MyCertificates";
import MyEducations from "./TableEducations/MyEducations";

const showTableArr = [
  "Eğitimlerim",
  "Sertifikalarım",
  "Sınavlarım",
  "Sanal Sınıflarım",
];

const StatusInfoTable = () => {
  const [showIndOnTable, setShowIndOnTable] = React.useState(2);

  const renderTable = () => {
    if (showIndOnTable === 0) {
      return <MyEducations />;
    } else if (showIndOnTable === 1) {
      return <MyCertificates />;
    } else if (showIndOnTable === 2) {
      return <MyExams />;
    } else if (showIndOnTable === 3) {
      return <MyMeetings />;
    }
  };
  return (
    <div>
      <div className="kt-table-head">
        <div className="status-table">
          {showTableArr.map((item, index) => (
            <span
              onClick={() => setShowIndOnTable(index)}
              className={showIndOnTable === index ? "status-active" : null}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
      <div className="kt-table-body">{renderTable()}</div>
    </div>
  );
};

export default StatusInfoTable;
