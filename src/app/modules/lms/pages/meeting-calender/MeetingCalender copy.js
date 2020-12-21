import React, { useEffect, useState } from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./Calender.scss";
import { Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import moment from "moment";
import axios from "axios";

const MeetingCalenderes = () => {
  const [weekendVisible, setWeekendVisible] = useState(true);
  const [currentEvents, setCurrentEvents] = useState(null);
  const [data, setData] = useState(null);

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
    console.log(INITIAL_EVENTS);
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
              initialView="dayGridMonth"
              displayEventTime={false}
              dayMaxEvents={true}
              dateClick={handleRoute}
              weekends={this.state.weekendsVisible}
              events={data}
              eventContent={renderEventContent}
              /*  eventClick={handleEventClick} */
              eventsSet={handleEvents}
            />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default MeetingCalender;
