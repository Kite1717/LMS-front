import { createSlice } from "@reduxjs/toolkit";

const initialExamsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  examForEdit: undefined,
  examForAssign: undefined,
  lastError: null,
  selectedExam: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};

export const examsSlice = createSlice({
  name: "exams",
  initialState: initialExamsState,
  reducers: {
    setExam: (state, action) => {
      state.selectedExam = action.payload;
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
    // getExamById
    examFetched: (state, action) => {
      state.actionsLoading = false;
      state.examForEdit = action.payload.examForEdit;
      state.error = null;
    },
    examsAllFetched: (state, action) => {
      const { entities } = action.payload;
      state.error = null;
      state.entities = entities;
    },
    // findExams
    examsFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createExam
    examCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities = [...state.entities, action.payload.exam];
    },
    // updateExam
    examUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.Id === action.payload.exam.Id) {
          return action.payload.exam;
        }
        return entity;
      });
    },
    // deleteExam
    examDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.id !== action.payload.id
      );
    },
    // deleteExams
    examsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.id)
      );
    },
    // examsUpdateState
    examsStatusUpdated: (state, action) => {
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
