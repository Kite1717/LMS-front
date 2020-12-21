import React from "react";
import { Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import moment from "moment";

const MyMeetings = () => {
  const [data, setData] = React.useState([]);

  const { isAuthorized, currentUser } = useSelector(
    ({ auth }) => ({
      isAuthorized: auth.user != null,
      currentUser: auth.user,
    }),
    shallowEqual
  );

  console.log("MyMeetings -> currentUser", currentUser);

  const history = useHistory();

  React.useEffect(() => {
    axios.get("/meeting-users/user/" + currentUser.Id).then((res) => {
      setData(res.data);
      console.log(res);
    });
  }, []);

  return (
    <>
      <div className="table-body-title">
        <h2 style={{ marginBottom: 0 }}>Sanal Sınıflarım</h2>
      </div>
      <div style={{ padding: "0 2rem" }}>
        {data.map((item) => (
          <Row className="exam-row">
            <Col lg={2}>
              <i className="fa fa-edit fa-3x kt-widget7__img"></i>
            </Col>
            <Col lg={7}>
              <div>{item.MeetingName}</div>
              <div>{item.Name}</div>
              <div>
                <span>Başlangıç : </span>
                <span className="kt-font-info">
                  {" "}
                  {moment(item.StartTime).format("DD.MM.YYYY HH:mm")}
                </span>
              </div>
              <div>
                <span>Bitiş : </span>
                <span className="kt-font-info">
                  {moment(item.EndTime).format("DD.MM.YYYY HH:mm")}
                </span>
              </div>
            </Col>
            <Col lg={3}>
              <Button
                variant="success"
                onClick={() =>
                  axios.put("/meeting-users/user/meeting/change/joined/status",{MeetingID : item.Id, }).then(()=>{
                    axios
                    .get(
                      "/meetings/attendee/" +
                      item.MeetingID +
                      "/" +
                      item.AttendeePW +
                      "/" +
                      currentUser.Username.substring(0, 5) +
                      "******"
                    )
                    .then(function (params) {
                      console.log(params);
                      window.open(params.data);
                    })

                 })
               
                }
              >
                Derse Gir
              </Button>
            </Col>
          </Row>
        ))}
      </div>
    </>
  );
};

export default MyMeetings;
