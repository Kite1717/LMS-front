import React from 'react';
import ReactDOM from 'react-dom';
import { PDFViewer } from '@react-pdf/renderer';

/**************************************************************************** */
import SgCertificate from './SgCertificate';   // Sistem güvenlik sertifikası
import YdaCertificate from './YdaCertificate';   //YDA sertifikası

import Certificate from './Certificate';   // diğer firmalar için sertifika
/*************************************************************************** */


const PdfRen = ({ location }) => {



  //18. satır değişecek *****************************************************

  // <Certificate ttt ={location.state.ttt} />   diğer firmalar için sertifika
  //  <SgCertificate ttt ={location.state.ttt} /> sistem güvenlik sertifikası
  //  <YdaCertificate ttt ={location.state.ttt} /> YDA sertifikası

  /************************************************************************** */

  return (
    <div>
      <PDFViewer width="100%" height={1200}>
        <Certificate ttt={location.state.ttt} />
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

  )
};
export default PdfRen;

ReactDOM.render(PdfRen, document.getElementById('root'));
