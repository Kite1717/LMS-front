import axios from "axios";

export const SETTINGS_URL = "/settings";

export function getAllSettings() {
  return axios.get(SETTINGS_URL);
}
