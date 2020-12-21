import { createSlice } from "@reduxjs/toolkit";

const initialQuestionBanksState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  questionBankForEdit: undefined,
  lastError: null,
  selectedQuestionBank: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};

export const visualQuestionBanksSlice = createSlice({
  name: "questionBanks",
  initialState: initialQuestionBanksState,
  reducers: {
    setQuestionBank: (state, action) => {
      state.selectedQuestionBank = action.payload;
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
    // getQuestionBankById
    questionBankFetched: (state, action) => {
      state.actionsLoading = false;
      state.questionBankForEdit = action.payload.questionBankForEdit;
      state.error = null;
    },
    questionBanksAllFetched: (state, action) => {
      const { entities } = action.payload;
      state.error = null;
      state.entities = entities;
    },

    questionBanksTagFetchedByTopicId: (state, action) => {
      const { entities } = action.payload;
      state.error = null;
      state.entities = entities;
    },

    // findQuestionBanks
    questionBanksFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createQuestionBank
    questionBankCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.questionBank);
    },
    bulkFileCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.bulkFile);
    },

    // updateQuestionBank
    questionBankUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.Id === action.payload.questionBank.Id) {
          return action.payload.questionBank;
        }
        return entity;
      });
    },
    // deleteQuestionBank
    questionBankDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.id !== action.payload.id
      );
    },
    // deleteQuestionBanks
    questionBanksDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.id)
      );
    },
    // questionBanksUpdateState
    questionBanksStatusUpdated: (state, action) => {
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
