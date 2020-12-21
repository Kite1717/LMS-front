import React, { useEffect, useState } from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./Calender.scss";
import { Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useIntl } from "react-intl";
import { Modal } from "react-bootstrap";
import * as Yup from "yup";
import moment from "moment";
import axios from "axios";
import Swal from "sweetalert2";
import { Formik, Form, Field } from "formik";
import * as actions from "../../_redux/meetings/meetingsActions";
import * as companyActions from "../../_redux/companies/companiesActions";

import {
  Input,
  Select,
  DatePickerField,
} from "../../../../../_metronic/_partials/controls";

import trLocale from "@fullcalendar/core/locales/tr";

const MeetingEditSchema = Yup.object().shape({
  CompanyId: Yup.number().required("Şube gereklidir"),
  MeetingName: Yup.string().required("Canlı Ders gereklidir"),
});

export const MeetingCalender = ({ id, show, onHide }) => {
  const [weekendVisible, setWeekendVisible] = useState(true);
  const [currentEvents, setCurrentEvents] = useState(null);
  const [data, setData] = useState(null);

  const { currentState } = useSelector(
    (state) => ({ currentState: state.companies }),
    shallowEqual
  );

  const [visible, setVisible] = useState(false);

  const { actionsLoading, meetingForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.meetings.actionsLoading,
      meetingForEdit: state.meetings.meetingForEdit,
    }),
    shallowEqual
  );

  const { entities } = currentState;
  // Companies Redux state
  const dispatch = useDispatch();

  /*   useEffect(() => {
    // server call by queryParams
    dispatch(companiesActions.fetchAllCompanies());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); */

  const intl = useIntl();

  const history = useHistory();

  const colorArray = [
    "#FF6633",
    "#FFB399",
    "#FF33FF",
    "#FFFF99",
    "#00B3E6",
    "#E6B333",
    "#3366E6",
    "#999966",
    "#99FF99",
    "#B34D4D",
    "#80B300",
    "#809900",
    "#E6B3B3",
    "#6680B3",
    "#66991A",
    "#FF99E6",
    "#CCFF1A",
    "#FF1A66",
    "#E6331A",
    "#33FFCC",
    "#66994D",
    "#B366CC",
    "#4D8000",
    "#B33300",
    "#CC80CC",
    "#66664D",
    "#991AFF",
    "#E666FF",
    "#4DB3FF",
    "#1AB399",
    "#E666B3",
    "#33991A",
    "#CC9999",
    "#B3B31A",
    "#00E680",
    "#4D8066",
    "#809980",
    "#E6FF80",
    "#1AFF33",
    "#999933",
    "#FF3380",
    "#CCCC00",
    "#66E64D",
    "#4D80CC",
    "#9900B3",
    "#E64D66",
    "#4DB380",
    "#FF4D4D",
    "#99E6E6",
    "#6666FF",
  ];

  useEffect(() => {
    /*   console.log(INITIAL_EVENTS); */
    axios.get("/meetings-events").then((res) => {
      const events = [];
      console.log("fırın", res);

      for (let i = 0; i < res.data.length; i++) {
        // exam
        events.push({
          id: i + "",
          title: moment(res.data[i].StartDate).format("DD.MM.YYYY HH:mm"),

          start: res.data[i].StartDate,
          end: res.data[i].EndDate,
          color: colorArray[res.data[i].CompanyId],
        });
      }
      console.log(events);
      setData(events);
    });
  }, []);

  useEffect(() => {
    // server call for getting Meeting by id
    dispatch(actions.fetchMeeting(id));
  }, [id, dispatch]);

  useEffect(() => {
    // server call by queryParams
    dispatch(companyActions.fetchAllCompanies());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const saveMeeting = (meeting) => {
    axios.post("/meetings", { meeting }).then((res) => {
      console.log("ress", res);
      if (typeof res.data === "string") {
        Swal.fire({
          icon: "warning",
          text: "Bu zaman aralığı müsait değildir",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleWeekendsToggle = () => {
    setWeekendVisible(!weekendVisible);
  };

  const handleRoute = () => {
    const history = new useHistory();
    history.push("/lms/meetings/new");
  };

  const handleEvents = (events) => {
    setCurrentEvents(events);
  };

  const [timeValue, setTimeValue] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const meetingSubmit = (info) => {
    const selectedDate = new Date(info.date);
    const now = Date.now();

    if (
      selectedDate - now > 0 ||
      moment(selectedDate).format("DD.MM.YYYY") ===
        moment(now).format("DD.MM.YYYY")
    ) {
      const date = new Date(info.date);
      // date.setDate(date.getDate() + 1);

      const str = moment(date).format("DD.MM.YYYY");
      setSelectedDate(info.date);
      setTimeValue(str);

      console.log("date", date);

      setVisible(true);
    } else {
      Swal.fire({
        icon: "warning",
        text: "Geçmiş bir tarihe atama yapamazsınız",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const renderEventContent = (eventInfo) => {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    );
  };

  const renderSidebarEvent = (event) => {
    return (
      <li key={event.id}>
        <b>
          {formatDate(event.start, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </b>
        <i>{event.title}</i>
      </li>
    );
  };

  return (
    <>
      <Row>
        <Col lg={12}>
          <div className="kt-portlet-wrapper">
            <div className="calendar-title">
              <h3>Takvim</h3>
            </div>
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay",
              }}
              locale={trLocale}
              initialView="dayGridMonth"
              displayEventTime={false}
              dayMaxEvents={true}
              dateClick={meetingSubmit}
              weekends={handleWeekendsToggle}
              events={data}
              eventContent={renderEventContent}
              /*  eventClick={handleEventClick} */
              eventsSet={handleEvents}
            />
          </div>
        </Col>
      </Row>
      <>
        <Modal
          size="lg"
          show={visible}
          onHide={onHide}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Formik
            enableReinitialize={true}
            initialValues={{
              CompanyId: 1,
              StartTime: "",
              EndTime: "",
              StartDate: "",
              EndDate: "",
            }}
            validationSchema={MeetingEditSchema}
            onSubmit={(values) => {
              console.log("values", values);
              if (selectedDate !== null) {
                values.StartDate = moment(selectedDate).toISOString();
                values.EndDate = moment(selectedDate).toISOString();
              }

              saveMeeting(values);
            }}
          >
            {({ handleSubmit, setFieldValue }) => (
              <>
                <Modal.Body className="overlay overlay-block">
                  <Form className="form form-label-right" autoComplete="off">
                    <div className="form-group row">
                      {/* UserTypeId */}
                      <div className="col-lg-6">
                        <Select
                          name="CompanyId"
                          label={intl.formatMessage({
                            id: "MEETING.NEW_EDIT.COMPANY",
                          })}
                        >
                          <option key={0}>{"Seçiniz"}</option>
                          {entities !== null &&
                            entities !== undefined &&
                            entities.map(({ Id, FullName }) => (
                              <option key={Id} value={Id}>
                                {FullName}
                              </option>
                            ))}
                        </Select>
                      </div>
                    </div>

                    <div className="form-group row">
                      {/* MeetingName */}
                      <div className="col-lg-12">
                        <Field
                          name="MeetingName"
                          component={Input}
                          placeholder={intl.formatMessage({
                            id: "MEETING.NEW_EDIT.MEETING.NAME",
                          })}
                          label={intl.formatMessage({
                            id: "MEETING.NEW_EDIT.MEETING.NAME",
                          })}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      {/* Date of birth */}
                      <div className="col-lg-3">
                        <DatePickerField
                          disabled={true}
                          value={timeValue}
                          name="StartDate"
                          label={intl.formatMessage({
                            id: "MEETING.NEW_EDIT.START.DATE",
                          })}
                        />
                      </div>

                      <div className="col-lg-2">
                        <Field
                          name="StartTime"
                          component={Input}
                          placeholder="16:30"
                          label={intl.formatMessage({
                            id: "MEETING.NEW_EDIT.START.TIME",
                          })}
                        />
                      </div>

                      <div className="col-lg-3">
                        <DatePickerField
                          disabled={true}
                          value={timeValue}
                          name="EndDate"
                          label={intl.formatMessage({
                            id: "MEETING.NEW_EDIT.END.DATE",
                          })}
                        />
                      </div>

                      <div className="col-lg-2">
                        <Field
                          name="EndTime"
                          component={Input}
                          placeholder="17:30"
                          label={intl.formatMessage({
                            id: "MEETING.NEW_EDIT.END.TIME",
                          })}
                        />
                      </div>
                    </div>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <button
                    type="button"
                    onClick={() => {
                      setVisible(false);
                    }}
                    className="btn btn-secondary btn-elevate"
                  >
                    {intl.formatMessage({
                      id: "BUTTON.CANCEL",
                    })}
                  </button>
                  <> </>
                  <button
                    type="submit"
                    onClick={() => {
                      setVisible(false);
                      handleSubmit();
                    }}
                    className="btn btn-success btn-elevate"
                  >
                    {intl.formatMessage({
                      id: "BUTTON.SAVE",
                    })}
                  </button>
                </Modal.Footer>
              </>
            )}
          </Formik>
        </Modal>
      </>
    </>
  );
};

export default MeetingCalender;
