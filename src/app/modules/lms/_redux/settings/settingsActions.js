import * as requestFromServer from "./settingsCrud";
import { settingsSlice, callTypes } from "./settingsSlice";

const { actions } = settingsSlice;

export const setSelectedsetting = (settingId) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return dispatch(actions.setsetting({ settingId }));
};

export const fetchAllsettings = () => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getAllSettings()
    .then((response) => {
      const entities = response.data;
      dispatch(actions.settingsAllFetched({ entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find settings";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
