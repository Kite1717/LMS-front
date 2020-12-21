import { createSlice } from "@reduxjs/toolkit";

const initialVisualExamsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  visualExamForEdit: undefined,
  visualExamForAssign: undefined,
  lastError: null,
  selectedVisualExam: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};

export const visualExamsSlice = createSlice({
  name: "visualExams",
  initialState: initialVisualExamsState,
  reducers: {
    setVisualExam: (state, action) => {
      state.selectedVisualExam = action.payload;
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
    // getVisualExamById
    visualExamFetched: (state, action) => {
      state.actionsLoading = false;
      state.visualExamForEdit = action.payload.visualExamForEdit;
      state.error = null;
    },
    visualExamsAllFetched: (state, action) => {
      const { entities } = action.payload;
      state.error = null;
      state.entities = entities;
    },
    // findVisualExams
    visualExamsFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createVisualExam
    visualExamCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities = [...state.entities, action.payload.exam];
    },
    // updateVisualExam
    visualExamUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.Id === action.payload.visualExam.Id) {
          return action.payload.visualExam;
        }
        return entity;
      });
    },
    // deleteVisualExam
    visualExamDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.id !== action.payload.id
      );
    },
    // deleteVisualExams
    visualExamsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.id)
      );
    },
    // visualExamsUpdateState
    visualExamsStatusUpdated: (state, action) => {
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
