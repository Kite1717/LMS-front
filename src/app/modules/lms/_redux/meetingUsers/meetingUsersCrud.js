import axios from "axios";

export const MEETINGUSERS_URL = "/meeting-users";

// CREATE =>  POST: add a new meetingUser to the server
export function createMeetingUser(meetingUser) {
  return axios.post(MEETINGUSERS_URL, { meetingUser });
}

// READ
export function getAllMeetingUsers() {
  return axios.get(MEETINGUSERS_URL);
}

export function getMeetingUserById(meetingUserId) {
  return axios.get(`${MEETINGUSERS_URL}/${meetingUserId}`);
}

export function getMeetingUsersTagByTopicId(topicId) {
  return axios.get(`/meetingUsers-tag/${topicId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findMeetingUsers(queryParams) {
  return axios.post(`${MEETINGUSERS_URL}/find`, { queryParams });
}

// UPDATE => PUT: update the meetingUser on the server
export function updateMeetingUser(meetingUser) {
  return axios.put(`${MEETINGUSERS_URL}/${meetingUser.Id}`, { meetingUser });
}

// UPDATE Status
export function updateStatusForMeetingUsers(ids, status) {
  return axios.post(`${MEETINGUSERS_URL}/updateStatusForMeetingUsers`, {
    ids,
    status,
  });
}

// DELETE => delete the meetingUser from the server
export function deleteMeetingUser(meetingUserId) {
  return axios.delete(`${MEETINGUSERS_URL}/${meetingUserId}`);
}

// DELETE MeetingUsers by ids
export function deleteMeetingUsers(ids) {
  return axios.post(`${MEETINGUSERS_URL}/deleteMeetingUsers`, { ids });
}
