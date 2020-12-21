import React from "react";
import axios from "axios";
import "./UserTopicsPage.scss";
import { Button, Accordion, Card } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";

export const UserTopicsPage = ({ history, match }) => {
  const [data, setData] = React.useState([]);

  
  React.useEffect(() => {
    axios.get(`/topics/course/with-section/${match.params.id}`).then((res) => {
      setData(res.data);
    });
  }, []);


  const endWork = () => {

   

    axios
      .put(
        `/course-users/update-begin-end/${match.params.id}`,
        { Finished: 1 }
      ).then(() => {

        axios.get("/surveys/course-code/" + match.params.id).then((res) => {

          console.log(res.data)
          if (res.data.length !== 0) {
            history.push("/lms/surveys/" + res.data[0].CourseId)
          }
          else {
            history.push('/dashboard')
          }

        })
      })


  }


  return (
    <div className="topics-container">
      <div className="kt-portlet__header">
        <div className="topics-header">
          {/* <i
            className="kt-font-brand flaticon2-time"
            style={{ color: "blue", paddingRight: "0.5rem" }}
          ></i> */}

          <div id="finish-course">
            <Button onClick={endWork} variant="danger">Eğitimi Bitir</Button>
          </div>
        </div>
      </div>
      <div className="kt-portlet__body">
        {data.map((topic) => (
          <>
            <h2>{topic.Name}</h2>
            <Accordion>
              {topic.gs.map((section) => (
                <>
                  <Accordion.Toggle
                    as={Card.Header}
                    eventKey={section.Id.toString()}
                  >
                    <div className="section-card">
                      <div>
                        <i className="flaticon-pie-chart-1"></i>
                        <h4>{section.Name}</h4>
                      </div>
                      <span>+</span>
                    </div>
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey={section.Id.toString()}>
                    <div style={{ marginBottom: "1.5rem" }}>
                      <Button
                        variant="success"
                        onClick={() =>
                          history.push(
                            `/lms/user/course/pdf/${section.FileOrUrl}`

                          )
                        }
                      >
                        Hazır Olduğunda Başlat
                      </Button>
                    </div>
                  </Accordion.Collapse>
                </>
              ))}
            </Accordion>
          </>
        ))}
      </div>
    </div>
  );
};
