import * as requestFromServer from "./meetingsCrud";
import { meetingsSlice, callTypes } from "./meetingsSlice";
import Swal from "sweetalert2";
const { actions } = meetingsSlice;

export const setSelectedMeeting = (meetingId) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return dispatch(actions.setMeeting({ meetingId }));
};

export const fetchAllMeetings = () => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getAllMeetings()
    .then((response) => {
      const entities = response.data;
      dispatch(actions.meetingsAllFetched({ entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find meetings";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchMeetings = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findMeetings(queryParams)
    .then((response) => {
      const { totalCount, entities } = response.data;
      dispatch(actions.meetingsFetched({ totalCount, entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find meetings";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchMeeting = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.meetingFetched({ meetingForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getMeetingById(id)
    .then((response) => {
      const meeting = response.data;
      dispatch(actions.meetingFetched({ meetingForEdit: meeting }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find meeting";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteMeeting = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteMeeting(id)
    .then((response) => {
      dispatch(actions.meetingDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete meeting";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createMeeting = (meetingForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createMeeting(meetingForCreation)
    .then((response) => {
      const meeting = response.data;
      console.log(meeting,"asdasdasdasdasdasdasdasdasdsa")
      if(response.data === "Bu tarihte event var! Başka bir tarih seçin.")
      {
      
    Swal.fire({
            icon: "warning",
            text:
              "Seçtiğiniz tarih aralığı müsait değildir",
            showConfirmButton: false,
            timer: 1500,
          }) 
      }
      dispatch(actions.meetingCreated({ meeting }));
    })
    .catch((error) => {
      error.clientMessage = "Can't create meeting";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateMeeting = (meeting) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateMeeting(meeting)
    .then((res) => {
     
      if(res.data === "Bu tarihte event var! Başka bir tarih seçin.")
      {
    Swal.fire({
            icon: "warning",
            text:
              "Seçtiğiniz tarih aralığı müsait değildir",
            showConfirmButton: false,
            timer: 1500,
          }) 
      }
      dispatch(actions.meetingUpdated({ meeting }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update meeting";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateMeetingsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForMeetings(ids, status)
    .then(() => {
      dispatch(actions.meetingsStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update meetings status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteMeetings = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteMeetings(ids)
    .then(() => {
      dispatch(actions.meetingsDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete meetings";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
