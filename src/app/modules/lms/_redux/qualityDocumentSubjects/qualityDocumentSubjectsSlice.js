import { createSlice } from "@reduxjs/toolkit";

const initialQualityDocumentSubjectsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  qualityDocumentSubjectForEdit: undefined,
  lastError: null,
  selectedQualityDocumentSubject: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};

export const qualityDocumentSubjectsSlice = createSlice({
  name: "qualityDocumentSubjects",
  initialState: initialQualityDocumentSubjectsState,
  reducers: {
    setQualityDocumentSubject: (state, action) => {
      state.selectedQualityDocumentSubject = action.payload;
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
    // getQualityDocumentSubjectById
    qualityDocumentSubjectFetched: (state, action) => {
      state.actionsLoading = false;
      state.qualityDocumentSubjectForEdit =
        action.payload.qualityDocumentSubjectForEdit;
      state.error = null;
    },
    qualityDocumentSubjectsAllFetched: (state, action) => {
      const { entities } = action.payload;
      state.error = null;
      state.entities = entities;
    },

    qualityDocumentSubjectsFetchedBySubjecyId: (state, action) => {
      const { entities } = action.payload;
      state.error = null;
      state.entities = entities;
    },

    // findQualityDocumentSubjects
    qualityDocumentSubjectsFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createQualityDocumentSubject
    qualityDocumentSubjectCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.qualityDocumentSubject);
    },
    // updateQualityDocumentSubject
    qualityDocumentSubjectUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.Id === action.payload.qualityDocumentSubject.Id) {
          return action.payload.qualityDocumentSubject;
        }
        return entity;
      });
    },
    // deleteQualityDocumentSubject
    qualityDocumentSubjectDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.id !== action.payload.id
      );
    },
    // deleteQualityDocumentSubjects
    qualityDocumentSubjectsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.id)
      );
    },
    // qualityDocumentSubjectsUpdateState
    qualityDocumentSubjectsStatusUpdated: (state, action) => {
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
