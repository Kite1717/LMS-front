import { createSlice } from "@reduxjs/toolkit";

const initialsettingsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  SettingForEdit: undefined,
  lastError: null,
  selectedSetting: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState: initialsettingsState,
  reducers: {
    setSetting: (state, action) => {
      state.selectedSetting = action.payload;
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

    settingsAllFetched: (state, action) => {
      const { entities } = action.payload;
      state.error = null;
      state.entities = entities;
    },
  },
});
