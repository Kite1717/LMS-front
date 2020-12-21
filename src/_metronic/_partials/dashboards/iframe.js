import React from "react";
import "./Dashboard.scss";
import { Button } from "react-bootstrap";

export const Dashboard = () => {
  const pptRef = React.useRef(null);

  React.useEffect(() => {
    console.log(pptRef);
  }, []);

  return (
    <div>
      <header>
        <div className="lesson-slide-top-row ">
         
          <div>
            <Button variant="success">Çalışmamı bitirdim</Button>{" "}
            <Button variant="warning">Geri Dön</Button>
          </div>
        </div>
      </header>
    
      <iframe
        ref={pptRef}
        id="ppt-viewer"
        src="https://view.officeapps.live.com/op/embed.aspx?src=http://code35.net/burkutlms.ppsx&preview?rm=minimal"
        width="100%"
        height="600px"
        frameborder="0"
      ></iframe>
    </div>
  );
};

export default Dashboard;
