import axios from "axios";
import store from "../store";
import router from "../router";

// **** CONSTS
const USER_TOKEN =
  store.getters["AuthenticationModule/getAuthenticatedUserData"].token;
const CURRENT_LANG = store.getters["AppLangModule/getAppLocale"];

// Global headers
axios.defaults.baseURL = "http://akry.moltaqadev.com/api/";
axios.defaults.headers.common["cache-control"] = "no-cache";
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.common["Accept-language"] = CURRENT_LANG;

// Set Token If Exists
if (USER_TOKEN) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + USER_TOKEN;
}

// Add Request Interceptors
axios.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    if (error.response.status === 403) {
      router.replace("/forbidden");
    }
    if (error.response.status === 401) {
      localStorage.removeItem("akry_dashboard_user_id");
      localStorage.removeItem("akry_dashboard_user_token");
      localStorage.removeItem("akry_dashboard_userName");
      router.replace("/");
    }
    return Promise.reject(error);
  }
);

// Add Response Interceptors
axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 403) {
      router.replace("/forbidden");
    }
    if (error.response.status === 401) {
      localStorage.removeItem("akry_dashboard_user_id");
      localStorage.removeItem("akry_dashboard_user_token");
      localStorage.removeItem("akry_dashboard_userName");
      router.replace("/");
    }
    return Promise.reject(error);
  }
);

export default axios;
