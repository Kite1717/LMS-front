import React from "react";
import { Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";



const MyEducations = () => {
  const [data, setData] = React.useState([]);

  const history = useHistory();

  React.useEffect(() => {
    axios.get("/course-users/all/user").then((res) => {
      setData(res.data);
      console.log(res);
    });
  }, []);

  const handleCourseStatus = (item)=>{
   
  
   if(item.Begined !== null && item.Finised !== null)
    return "Tamamlandı"

  else if(item.Available === 0)
   return "Süresi Doldu"

  }

  return (
    <>
      <div className="table-body-title">
        <h2 style={{ marginBottom: 0 }}>Eğitimlerim</h2>
      </div>
      <div style={{ padding: "0 2rem" }}>
        {data.map((item, index) => (
          <Row key={index} className="exam-row">
            <Col lg={7}>
              <span style={{ fontSize: 20 }} className="kt-font-info">
                {item.Name}
              </span>
            </Col>
            <Col lg={3}>
              {item.Available === 1 ? (
                <Button
                  target="_blank"
                  variant="success"
                  onClick={() => {
                    axios
                      .put(
                        `/course-users/update-begin-end/${item.Id}`,
                        { Begined: 1 }
                      ).then(() => {

                        history.push(`/lms/user/course/topics/${item.Id}`, {
                          Id: item.Id,
                        });
                      })


                  }}
                >
                  Görüntüle
                </Button>
              ) : (
                  <Button disabled variant="danger">
                   {
                     handleCourseStatus(item)
                   }
                  </Button>
                )}
            </Col>
          </Row>
        ))}
      </div>
    </>
  );
};

export default MyEducations;
