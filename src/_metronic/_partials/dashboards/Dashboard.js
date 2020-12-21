import React from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { INITIAL_EVENTS, createEventId } from "./event-utils";
import { Row, Col } from "react-bootstrap";
import StatusInfoTable from "./StatusInfoTable";
import "./Dashboard.scss";
import moment from "moment";
import axios from "axios";
import trLocale from "@fullcalendar/core/locales/tr";

class Dashboard extends React.Component {
  state = {
    weekendsVisible: true,
    currentEvents: [],
    data: [],
  };

  componentDidMount() {
    console.log(INITIAL_EVENTS);
    axios.get("/user-exams/user/13").then((res) => {
      const events = [];
      for (let i = 0; i < res.data.length; i++) {
        events.push({
          id: i + "",
          title: res.data[i].Name,

          start: res.data[i].EndDate,
         
        });
      }
      console.log(events);
      this.setState({
        data: events,
      });
    });
  }

  render() {
    const { data } = this.state;
    return (
      <>
        <Row>
          <Col lg={7}>
            <div className="kt-portlet-wrapper">
              <div className="calendar-title">
                <h3>Takvim</h3>
              </div>
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                headerToolbar={{
              
                
                  center: "title",
                  right: "dayGridMonth,timeGridWeek,timeGridDay",
                }}
                locale={trLocale}
                initialView="dayGridMonth"
                displayEventTime={false}
                //  editable={true}
                // selectable={true}
                // selectMirror={true}
                dayMaxEvents={true}
                weekends={this.state.weekendsVisible}
                events={data} // alternatively, use the `events` setting to fetch from a feed
                /* select={this.handleDateSelect} */
                eventContent={renderEventContent} // custom render function
                eventClick={this.handleEventClick}
                eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
                /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
              />
            </div>
          </Col>
          <Col lg={5}>
            <StatusInfoTable />
          </Col>
        </Row>
      </>
    );
  }

  handleWeekendsToggle = () => {
    this.setState({
      weekendsVisible: !this.state.weekendsVisible,
    });
  };

  /*   handleDateSelect = (selectInfo) => {
    let title = prompt("Please enter a new title for your event");
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  }; */

  // handleEventClick = (clickInfo) => {
  //   if (
  //     confirm(
  //       `Are you sure you want to delete the event '${clickInfo.event.title}'`
  //     )
  //   ) {
  //     clickInfo.event.remove();
  //   }
  // };

  handleEvents = (events) => {
    this.setState({
      currentEvents: events,
    });
  };
}

export { Dashboard };

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}

function renderSidebarEvent(event) {
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
}
