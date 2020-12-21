import React from "react";
import { Card } from "../../../_metronic/_partials/controls";
import { toAbsoluteUrl } from "../../../_metronic/_helpers";

class Home extends React.Component {
  render() {
    /*    const containers = React.findDOMNode("div").getElementsByClassName("container")
    console.log(containers,"dasdasda")

    console.log(containers); */
    return (
      <>
        <Card>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              minHeight: "100vh ",
            }}
          >
            <div
              style={{
                display: "flex",
                flex: 0.2,
              }}
            ></div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 0.4,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flex: 0.3,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                 <img
                  alt="Logo"
                  className="max-h-150px"
                  src={toAbsoluteUrl("/media/logos/nes-logo.png")}
                /> 
                 {/* <img
                  alt="Logo"
                  className="max-h-90px"
                  src={toAbsoluteUrl("/media/logos/nes-logo.png")}
                /> */}
              </div>
              <div
                style={{
                  display: "flex",
                  flex: 0.1,
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "16px",
                  color: "#21618c",
                }}
              >
                Hoşgeldiniz
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flex: 0.4,
                justifyContent: "center",
                alignItems: "center",
              }}
            ></div>
          </div>
        </Card>
      </>
    );
  }
}

export { Home };
