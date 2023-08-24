import AuthenticationMutations from "./mutations.js";
import AuthenticationActions from "./actions.js";
import AuthenticationGetters from "./getters.js";

export default {
  namespaced: true,

  state: {
    // START:: AUTHENTICATED USER DATA
    userId: localStorage.getItem("akry_dashboard_user_id"),
    userToken: localStorage.getItem("akry_dashboard_user_token"),
    userType: localStorage.getItem("akry_dashboard_user_type"),
    userName: localStorage.getItem("akry_dashboard_userName"),
    email: localStorage.getItem("akry_dashboard_email"),
    userPhone: localStorage.getItem("akry_dashboard_userPhone"),
    role: localStorage.getItem("akry_dashboard_user_role"),
    // END:: AUTHENTICATED USER DATA
  },

  mutations: AuthenticationMutations,
  actions: AuthenticationActions,
  getters: AuthenticationGetters,
};
