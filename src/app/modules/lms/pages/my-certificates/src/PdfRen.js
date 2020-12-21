import React from "react";
import ReactDOM from "react-dom";
import { PDFViewer } from "@react-pdf/renderer";
import Certificate from "./Certificate";

const PdfRen = (props) => {
  //src/_metronic/_partials/dashboards/TableCertificates/src/PdfRen.js
  console.log("-------", props);
  return (
    <div>
      <PDFViewer width="100%" height={1200}>
        <Certificate ttt={props.ttt} />
      </PDFViewer>
      {/* <PDFDownloadLink
          document={<PdfDocument data={movieDetails} />}
          fileName="movielist.pdf"
          style={{
            textDecoration: "none",
            padding: "10px",
            color: "#4a4a4a",
            backgroundColor: "#f2f2f2",
            border: "1px solid #4a4a4a"
          }}
        >
          {({ blob, url, loading, error }) =>
            loading ? "Loading document..." : "Download Pdf"
          }
        </PDFDownloadLink> */}
    </div>
  );
};
export default PdfRen;

ReactDOM.render(PdfRen, document.getElementById("root"));
