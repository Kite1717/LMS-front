import { createSlice } from "@reduxjs/toolkit";

const initialUserExamsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  userExamForEdit: undefined,
  lastError: null,
  selectedUserExam: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};

export const userExamsSlice = createSlice({
  name: "userExams",
  initialState: initialUserExamsState,
  reducers: {
    setUserExam: (state, action) => {
      state.selectedUserExam = action.payload;
    },
    catchError: (state, action) => {
      state.error = `${action.type}: ${action.payload.error}`;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = false;
      } else {
        state.actionsLoading = false;
      }
    },
    startCall: (state, action) => {
      state.error = null;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = true;
      } else {
        state.actionsLoading = true;
      }
    },
    // getUserExamById
    userExamFetched: (state, action) => {
      state.actionsLoading = false;
      state.userExamForEdit = action.payload.userExamForEdit;
      state.error = null;
    },
    userExamsAllFetched: (state, action) => {
      const { entities } = action.payload;
      state.error = null;
      state.entities = entities;
    },

    userExamsTagFetchedByTopicId: (state, action) => {
      const { entities } = action.payload;
      state.error = null;
      state.entities = entities;
    },

    // findUserExams
    userExamsFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createUserExam
    userExamCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.userExam);
    },
    // updateUserExam
    userExamUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.Id === action.payload.userExam.Id) {
          return action.payload.userExam;
        }
        return entity;
      });
    },
    // deleteUserExam
    userExamDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.id !== action.payload.id
      );
    },
    // deleteUserExams
    userExamsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.id)
      );
    },
    // userExamsUpdateState
    userExamsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.id) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
