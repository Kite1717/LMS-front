import React from "react";
import { Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";
import moment from "moment";

const MyExams = () => {
  const [data, setData] = React.useState([]);

  const history = useHistory();

  React.useEffect(() => {
    axios.get("/user-exams/all/user").then((res) => {
      setData(res.data);
      console.log("exam", res);
    });
  }, []);

  const  handleExamStatus = (item)=>{

    if(item.Begined !== null && item.Finised === null)
      return "Sınavdan Ayrıldınız"
    
    else if(new Date(item.EndDate) -  new Date()< 0)
      return "Süresi doldu"

    else
     return "Tamamlandı"

  }

  return (
    <>
      <div className="table-body-title">
        <h2 style={{ marginBottom: 0 }}>Bekleyen Sınavlarım</h2>
      </div>
      <div style={{ padding: "0 2rem" }}>
        {data.map((item) => (
          <Row className="exam-row">
            <Col lg={2}>
              <i className="fa fa-edit fa-3x kt-widget7__img"></i>
            </Col>
            <Col lg={7}>
              <div>{item.Name}</div>

              <div>
                <span>Sınav Tipi : </span>
                <span className="kt-font-info">
                  {item.ExamTypeId === 1 ? "Teorik Sınav" : "Görsel Sınav"}
                </span>
              </div>

              <div>
                <span>Sınav Tamamlanma Tarihi : </span>
                <span className="kt-font-info">
                  {moment(item.EndDate).format("DD.MM.YYYY HH:mm")}
                </span>
              </div>
              <div>
                <span>Sınavı Bitirme Süresi : </span>
                <span className="kt-font-info">{item.Duration}</span>
              </div>
              <div>
                <div>
                  <span>Minimum Başarı Oranı : </span>
                  <span className="kt-font-info">{item.MinSuccessRate} %</span>
                </div>
              </div>
            </Col>

            {item.Available === 1  && new Date(item.EndDate) -  new Date()> 0 ? (
              <Button
                variant="success"
                onClick={() => {
                  item.ExamTypeId === 1
                    ? history.push("/lms/exam/BeforeExamStart", {
                        ExamCode: item.ExamCode,
                      })
                    : history.push("/lms/visual-exam/BeforeVisualExamStart", {
                        ExamCode: item.ExamCode,
                      });
                }}
              >
                Sınava Gir
              </Button>
            ) : (
              <Button variant="danger" disabled>
                {


                    handleExamStatus(item)
                 
                }
              </Button>
            )}
          </Row>
        ))}
      </div>
    </>
  );
};

export default MyExams;
