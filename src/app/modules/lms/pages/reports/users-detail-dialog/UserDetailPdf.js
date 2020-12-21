import React from "react";
import ReactDOM from "react-dom";
import { PDFViewer } from "@react-pdf/renderer";

const UserDetailPdf = ({ location }) => {
  //src/_metronic/_partials/dashboards/TableCertificates/src/PdfRen.js

  return (
    <>
      <div>
        <PDFViewer width="100%" height={1200}></PDFViewer>
      </div>
    </>
  );
};
export default UserDetailPdf;

ReactDOM.render(UserDetailPdf, document.getElementById("root"));
