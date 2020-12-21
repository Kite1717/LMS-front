import axios from "axios";

export const METINGS_URL = "/meetings";

// CREATE =>  POST: add a new meeting to the server
export function createMeeting(meeting) {
  return axios.post(METINGS_URL, { meeting });
}

// READ
export function getAllMeetings() {
  return axios.get(METINGS_URL);
}

export function getMeetingById(meetingId) {
  return axios.get(`${METINGS_URL}/${meetingId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findMeetings(queryParams) {
  return axios.post(`${METINGS_URL}/find`, { queryParams });
}

// UPDATE => PUT: update the meeting on the server
export function updateMeeting(meeting) {
  return axios.put(`${METINGS_URL}/${meeting.Id}`, { meeting });
}

// UPDATE Status
export function updateStatusForMeetings(ids, status) {
  return axios.post(`${METINGS_URL}/updateStatusForMeetings`, {
    ids,
    status,
  });
}

// DELETE => delete the meeting from the server
export function deleteMeeting(meetingId) {
  return axios.delete(`${METINGS_URL}/${meetingId}`);
}

// DELETE Meetings by ids
export function deleteMeetings(ids) {
  return axios.post(`${METINGS_URL}/deleteMeetings`, { ids });
}
