/* eslint-disable no-loop-func */
// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React, { useEffect, useMemo } from "react";
import { Modal, Tabs, Tab } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as companyActions from "../../../_redux/companies/companiesActions";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Table } from "react-bootstrap";
import moment from "moment";
import Chart from "react-apexcharts";
import {
  Card,
  CardBody,

} from "../../../../../../_metronic/_partials/controls";


import { PDFDownloadLink } from '@react-pdf/renderer';

import { withRouter } from "react-router";
import { useIntl } from "react-intl";
import { useHistory } from "react-router-dom";
import UserDocument from './UserDocument'

// Getting curret state of companies list from store (Redux)

export function UsersDetailForm_({
  saveUser,
  user,
  actionsLoading,
  onHide,
  match,
}) {
  const { currentState } = useSelector(
    (state) => ({ currentState: state.companies }),
    shallowEqual
  );

  const [key, setKey] = React.useState("profile");
  const [educations, setEducations] = React.useState([]);
  const [exams, setExams] = React.useState([]);
  const [certificates, setCertificates] = React.useState([]);
  const [meetings, setMeetings] = React.useState([]);
  const [answers, setAnswers] = React.useState([]);
  const [visualAnswers, setVisualAnswers] = React.useState([]);
  const [topicStat, setTopicStat] = React.useState([]);
  const [totalDuration, setTotalDuration] = React.useState(null);

  const [courseNames, setCourseNames] = React.useState(null);



  const { entities } = currentState;
  const history = useHistory();

  //topicStat obj to array
  let topicStatName =
    topicStat !== null &&
    topicStat !== undefined &&
    topicStat.map((item) => item.name);
  let topicStatCorrect =
    topicStat !== null &&
    topicStat !== undefined &&
    topicStat.map((item) => item.correct);
  let topicStatWrong =
    topicStat !== null &&
    topicStat !== undefined &&
    topicStat.map((item) => item.wrong);

  let options1 = {
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: topicStatName,
      },
      colors: ["#009900"],
    },
    series: [
      {
        name: topicStatName,
        data: topicStatCorrect,
      },
    ],
  };

  let options2 = {
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: topicStatName,
      },
      colors: ["#FF0000"],
    },
    series: [
      {
        name: topicStatName,
        data: topicStatWrong,
      },
    ],
  };

  // Companies Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // server call by queryParams
    dispatch(companyActions.fetchAllCompanies());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    user !== null &&
      user !== undefined &&
      axios.get(`/course-users/all/from/admin/${user.Id}`).then((res) => {
        setEducations(res.data);
      });
  }, [user]);

  useEffect(() => {
    user !== null &&
      user !== undefined &&
      axios.get(`/activity-logs/total/duration/${user.Id}`).then((res) => {
        console.log(res.data, "activty services");
        let seconds = 0;
        let len =
          res.data.exit.length > res.data.enter.length
            ? res.data.enter.length
            : res.data.exit.length;
        for (let i = 0; i < len; i++) {
          const exit = moment(res.data.exit[i].CreatedAt);
          const enter = moment(res.data.enter[i].CreatedAt);

          seconds +=
            exit
              .subtract(enter)
              .toDate()
              .getTime() / 1000;
        }

        let time = new Date(seconds * 1000).toISOString().substr(11, 8);
        let hour = time.split(":")[0];
        let min = time.split(":")[1];
        let sec = time.split(":")[2];

        setTotalDuration(hour + " Saat " + min + " dakika " + sec + " saniye ");


      });
  }, [user]);

  useEffect(() => {
    user !== null &&
      user !== undefined &&
      axios.get(`/user-exams/all/from/admin/${user.Id}`).then((res) => {
        setExams(res.data);

        let topics = [];
        let exams = res.data || [];
        let temp33 = []

        for (let i = 0; i < exams.length; i++) {
          if (exams[i].ExamTypeId !== 2) {
            axios
              .get(
                `/user-exams/answers/from/admin/${user.Id}/${exams[i].ExamId}`
              )
              .then((res2) => {
                let temp = res2.data;
                if (temp !== null && temp !== undefined && temp.length > 0) {
                  let index;
                  if (findTopic(topics, temp[0].TopicName) === -1) {
                    // not find


                    if (!temp33.includes(temp[0].CourseName))
                      temp33.push(temp[0].CourseName)


                    topics.push({
                      name: temp[0].TopicName,
                      courseName: temp[0].CourseName,
                      wrong: 0,
                      correct: 0,
                    });
                    index = topics.length - 1;
                  } else {
                    index = findTopic(topics, temp[0].TopicName);
                  }

                  for (let k = 0; k < temp.length; k++) {
                    if (temp[k].IsTrueOption === 1) topics[index].correct++;
                    else topics[index].wrong++;
                  }
                }
              });


          } else {
            axios
              .get(
                `/visual-exams/answers/from/admin/${user.Id}/${exams[i].ExamId}`
              )
              .then((res2) => {
                let temp = res2.data;
                if (temp !== null && temp !== undefined && temp.length > 0) {
                  let index;
                  if (findTopic(topics, temp[0].TopicName) === -1) {


                    if (!temp33.includes(temp[0].CourseName))
                      temp33.push(temp[0].CourseName)

                    // not find
                    topics.push({
                      name: temp[0].TopicName,
                      courseName: temp[0].CourseName,
                      wrong: 0,
                      correct: 0,
                    });
                    index = topics.length - 1;
                  } else {
                    index = findTopic(topics, temp[0].TopicName);
                  }

                  for (let k = 0; k < temp.length; k++) {
                    if (temp[k].TruePlaceToClick === 1) topics[index].correct++;
                    else topics[index].wrong++;
                  }
                }
              });


          }
        }





        console.log(temp33, "77777777777", topics)
        setCourseNames(temp33)



        setTopicStat(topics);
      });
  }, [user]);




  useEffect(() => {
    user !== null &&
      user !== undefined &&
      axios.get(`/find-certificate/from/admin/${user.Id}`).then((res) => {
        setCertificates(res.data);
      });
  }, [user]);

  useEffect(() => {
    user !== null &&
      user !== undefined &&
      axios.get(`/meeting-users/user/from/admin/${user.Id}`).then((res) => {
        console.log(res, "meetings");
        setMeetings(res.data);
      });
  }, [user]);

  const handleAnswer = (id, Name) => {
    axios.get(`/user-exams/answers/from/admin/${user.Id}/${id}`).then((res) => {
      setAnswers(res.data);
    });
  };

  const handleVisualAnswer = (id) => {
    axios
      .get(`/visual-exams/answers/from/admin/${user.Id}/${id}`)
      .then((res) => {
        setVisualAnswers(res.data);
      });
  };

  const findTopic = (topics, value) => {
    for (let i = 0; i < topics.length; i++) {
      if (topics[i].name === value) {
        return i;
      }
    }
    return -1;
  };


  const getHandleOptions = (course, ch) => {

    if (topicStat !== null &&
      topicStat !== undefined) {


      let temp = []
      topicStat.forEach((item) => {

        if (item.courseName === course) {
          temp.push(item)
        }

      })

      //topicStat obj to array
      let topicStatName =
        temp !== null &&
        temp !== undefined &&
        temp.map((item) => item.name);
      let topicStatCorrect =
        temp !== null &&
        temp !== undefined &&
        temp.map((item) => item.correct);
      let topicStatWrong =
        temp !== null &&
        temp !== undefined &&
        temp.map((item) => item.wrong);

      let options1 = {
        options: {
          chart: {
            id: "basic-bar",
          },
          xaxis: {
            categories: topicStatName,
          },
          colors: ["#009900"],
        },
        series: [
          {
            name: topicStatName,
            data: topicStatCorrect,
          },
        ],
      };

      let options2 = {
        options: {
          chart: {
            id: "basic-bar",
          },
          xaxis: {
            categories: topicStatName,
          },
          colors: ["#FF0000"],
        },
        series: [
          {
            name: topicStatName,
            data: topicStatWrong,
          },
        ],
      };

      return ch ? options1 : options2;
    }


  }


  const intl = useIntl();

  console.log("match.params.cid", match.params.cid);

  const [curExam, setCurExam] = React.useState(null);

  const [document, setDocument] = React.useState(null);


  useEffect(() => {

    if (user !== null &&
      user !== undefined &&

      totalDuration !== null &&
      totalDuration !== undefined &&

      educations !== null &&
      educations !== undefined &&

      exams !== null &&
      exams !== undefined &&

      certificates !== null &&
      certificates !== undefined &&

      meetings !== null &&
      meetings !== undefined) {
      setDocument({
        user,
        totalDuration,
        educations,
        exams,
        certificates,
        meetings,
      })
    }



  }, [user, totalDuration, educations, exams, certificates, meetings])



  useEffect(() => {

    if (topicStat.length > 0) {


    }
  }, [topicStat]);


  return (
    <>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => {

          if (k === "user-document" && document !== null && document !== undefined) {

            history.push("/lms/user-document", {
              document,
            });
          }
          setKey(k)

        }}
      >
        <Tab eventKey="profile" title="Profil">
          <div className="form-group row">
            <div className="col-lg-12">
              {entities !== null && entities !== undefined && (
                <Card>
                  <CardBody>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th></th>
                          <th>Bilgilerim</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>TC No</td>
                          <td>{user.TCNo}</td>
                        </tr>
                        <tr>
                          <td>İsim</td>
                          <td>{user.FirstName}</td>
                        </tr>
                        <tr>
                          <td>Soyisim</td>
                          <td>{user.LastName}</td>
                        </tr>
                        <tr>
                          <td>Telefon</td>
                          <td>{user.PhoneNumber}</td>
                        </tr>
                        <tr>
                          <td>Email</td>
                          <td>{user.Email}</td>
                        </tr>
                        <tr>
                          <td>Adres</td>
                          <td>{user.Address}</td>
                        </tr>

                        <tr>
                          <td>Şube</td>
                          <td>{user.CompanyName}</td>
                        </tr>
                        <tr>
                          <td>Sistemde Kaldığı Süre</td>
                          <td>
                            {totalDuration !== null &&
                              totalDuration !== undefined &&
                              totalDuration}
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </CardBody>
                </Card>
              )}
            </div>
          </div>
        </Tab>
        <Tab eventKey="education" title="Eğitimler">
          <div className="form-group row">
            <div className="col-lg-12">
              <Card>
                <CardBody>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Kurs İsmi</th>
                        <th>Bitirme Durumu</th>
                      </tr>
                    </thead>

                    <tbody>
                      {educations.map((education) => {
                        return (
                          <>
                            <tr>
                              <td>{education.Name}</td>
                              <td>
                                {education.Available === 1
                                  ? "Tamamlanmadı"
                                  : "Tamamlandı"}
                              </td>
                            </tr>
                          </>
                        );
                      })}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </div>
          </div>
        </Tab>

        <Tab eventKey="exams" title="Sınavlar">
          <div className="form-group row">
            <div className="col-lg-12">
              <Card>
                <CardBody>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Sınav İsmi</th>
                        <th>Sınav Tipi</th>
                        <th>Kullanıcı Başarı Oranı</th>
                        <th>Minimum Başarı Oranı</th>
                        <th>Bitiş Tarihi</th>
                        <th>Bitirme Durumu</th>
                      </tr>
                    </thead>

                    <tbody>
                      {exams.map((exam) => {
                        return (
                          <>
                            <tr>
                              <td
                                onClick={() => {
                                  if (exam.Available === 0) {
                                    console.log(exam, "-----------");
                                    setCurExam(exam);
                                    if (exam.ExamTypeId === 1) {
                                      handleAnswer(exam.ExamId, exam.Name);
                                    } else if (exam.ExamTypeId === 2) {
                                      handleVisualAnswer(exam.ExamId);
                                    }
                                  }
                                }}
                                style={{ cursor: "pointer" }}
                              >
                                {exam.Name}
                              </td>

                              <td>
                                {exam.ExamTypeId === 2
                                  ? "Görsel Sınav"
                                  : "Teorik Sınav"}
                              </td>
                              <td>
                                {" "}
                                {exam.UserSuccessRate === null
                                  ? "%0"
                                  : "%" + exam.UserSuccessRate}
                              </td>
                              <td>{"%" + exam.MinSuccessRate}</td>

                              <td>
                                {moment(exam.EndDate).format(
                                  "DD/MM/YYYY HH:mm"
                                )}
                              </td>
                              <td>
                                {exam.Available === 1
                                  ? "Tamamlanmadı"
                                  : "Tamamlandı"}
                              </td>
                            </tr>
                          </>
                        );
                      })}
                    </tbody>

                    {/*   <thead>
                      <tr>
                        <th>Soru İsmi</th>
                        <th>Cevap İsmi</th>
                      </tr>
                    </thead> */}

                    <div className="form-group row mt-2"></div>

                    {curExam !== null && curExam !== undefined && (
                      <div className="form-group row">
                        {curExam.ExamTypeId === 2 ? (
                          <div className="col-lg-6">
                            <strong style={{ border: "1px solid #D3D3D3" }}>
                              {curExam.Name}
                            </strong>
                            <thead>
                              <tr>
                                <td>Sorunun İsmi</td>

                                <td>Kontrol</td>
                              </tr>
                            </thead>
                            <tbody>
                              {visualAnswers.map((visualAnswer) => {
                                return (
                                  <>
                                    <tr>
                                      <td>{visualAnswer.QuestionName}</td>

                                      <td>
                                        {visualAnswer.TruePlaceToClick === 1
                                          ? "Doğru"
                                          : "Yanlış"}
                                      </td>
                                    </tr>
                                  </>
                                );
                              })}
                            </tbody>
                          </div>
                        ) : (
                            <div className="col-lg-6">
                              <strong style={{ border: "1px solid #D3D3D3" }}>
                                {curExam.Name}
                              </strong>
                              <thead>
                                <tr>
                                  <td>Sorunun İsmi</td>
                                  <td>Öğrencinin Verdiği Cevap</td>
                                  <td>Kontrol</td>
                                </tr>
                              </thead>
                              <tbody>
                                {answers.map((answer) => {
                                  return (
                                    <>
                                      <tr>
                                        <td>{answer.QuestionName}</td>
                                        <td>{answer.UserAnswer}</td>
                                        <td>
                                          {answer.IsTrueOption === 1
                                            ? "Doğru"
                                            : "Yanlış"}
                                        </td>
                                      </tr>
                                    </>
                                  );
                                })}
                              </tbody>
                            </div>
                          )}
                      </div>
                    )}
                  </Table>
                </CardBody>
              </Card>
            </div>
          </div>
        </Tab>

        <Tab eventKey="certificates" title="Sertifikalar">
          <div className="form-group row">
            <div className="col-lg-12">
              <Card>
                <CardBody>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>TC No</th>
                        <th>İsim</th>
                        <th>Soyisim</th>
                        <th>Sertifika No </th>
                      </tr>
                    </thead>

                    <tbody>
                      {certificates.map((certificate) => {
                        return (
                          <>
                            <tr>
                              <td>{certificate.TCNo}</td>
                              <td>{certificate.FirstName}</td>
                              <td>{certificate.LastName}</td>
                              <td>{certificate.CCode}</td>
                            </tr>
                          </>
                        );
                      })}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </div>
          </div>
        </Tab>

        <Tab eventKey="meetings" title="Sanal Sınıflar">
          <div className="form-group row">
            <div className="col-lg-12">
              <Card>
                <CardBody>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Sanal Sınıf İsmi</th>
                        <th>Başlama Tarihi</th>
                        <th>Bitiş Tarihi</th>
                      </tr>
                    </thead>

                    <tbody>
                      {meetings.map((meeting) => {
                        return (
                          <>
                            <tr>
                              <td>{meeting.MeetingName}</td>
                              <td>
                                {moment(meeting.StartTime).format(
                                  "DD/MM/YYYY HH:mm"
                                )}
                              </td>
                              <td>
                                {moment(meeting.EndTime).format(
                                  "DD/MM/YYYY HH:mm"
                                )}
                              </td>
                            </tr>
                          </>
                        );
                      })}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </div>
          </div>
        </Tab>

        <Tab eventKey="user-document" title="Kullanıcı Dökümanı">
        </Tab>
        <Tab eventKey="user-success" title="Kullanıcı Başarı Grafikleri">
          <Card>
            <CardBody>

              {
                courseNames !== null &&
                courseNames !== undefined &&

                courseNames.map((course) => {
                  let tempOptions1 = getHandleOptions(course, true)
                  let tempOptions2 = getHandleOptions(course, false)

                  console.log(tempOptions1, "xxxxxxxxxxxxxx", tempOptions2)

                  return (
                    <>
                      <div className="form-group row">
                        <strong>{course}</strong>
                      </div>
                      <div className="form-group row">
                        <div className="col-lg-6">
                          <strong>Konuya Göre Doğru Sayısı</strong>
                          <Chart
                            options={tempOptions1.options}
                            series={tempOptions1.series}
                            type="bar"
                            width="100%"
                          />
                        </div>
                        <div className="col-lg-6">
                          <strong>Konuya Göre Yanlış Sayısı</strong>
                          <Chart
                            options={tempOptions2.options}
                            series={tempOptions2.series}
                            type="bar"
                            width="100%"
                          />
                        </div>
                      </div>
                    </>

                  )




                })

              }


            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </>
  );
}


export const UsersDetailForm = withRouter(UsersDetailForm_);
