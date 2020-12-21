import { createSlice } from "@reduxjs/toolkit";

const initialPollQuestionsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  pollQuestionForEdit: undefined,
  lastError: null,
  selectedPollQuestion: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};

export const pollQuestionsSlice = createSlice({
  name: "pollQuestions",
  initialState: initialPollQuestionsState,
  reducers: {
    setPollQuestion: (state, action) => {
      state.selectedPollQuestion = action.payload;
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
    // getPollQuestionById
    pollQuestionFetched: (state, action) => {
      state.actionsLoading = false;
      state.pollQuestionForEdit = action.payload.pollQuestionForEdit;
      state.error = null;
    },
    pollQuestionsAllFetched: (state, action) => {
      const { entities } = action.payload;
      state.error = null;
      state.entities = entities;
    },

    pollQuestionsFetchedByCourseId: (state, action) => {
      const { entities } = action.payload;
      state.error = null;
      state.entities = entities;
    },

    // findPollQuestions
    pollQuestionsFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createPollQuestion
    pollQuestionCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.pollQuestion);
    },
    // updatePollQuestion
    pollQuestionUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.Id === action.payload.pollQuestion.Id) {
          return action.payload.pollQuestion;
        }
        return entity;
      });
    },
    // deletePollQuestion
    pollQuestionDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.id !== action.payload.id
      );
    },
    // deletePollQuestions
    pollQuestionsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.id)
      );
    },
    // pollQuestionsUpdateState
    pollQuestionsStatusUpdated: (state, action) => {
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
