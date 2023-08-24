export default {
  // Start:: Set Authenticated User Data
  setAuthenticatedUserData(state, payload) {
    if (payload.id) {
      state.userId = payload.id;
      localStorage.setItem("akry_dashboard_user_id", payload.id);
    }
    if (payload.token) {
      state.userToken = payload.token;
      localStorage.setItem("akry_dashboard_user_token", payload.token);
    }
    if (payload.type) {
      state.userType = payload.type;
      localStorage.setItem("akry_dashboard_user_type", payload.type);
    }
    if (payload.name) {
      state.userName = payload.name;
      localStorage.setItem("akry_dashboard_userName", payload.name);
    }
    if (payload.phone) {
      state.userPhone = payload.phone;
      localStorage.setItem("akry_dashboard_userPhone", payload.phone);
    }
    if (payload.email) {
      state.email = payload.email;
      localStorage.setItem("akry_dashboard_email", payload.email);
    }
    if (payload.role) {
      state.role = payload.role;
      localStorage.setItem("akry_dashboard_user_role", payload.role);
    }
  },
  // End:: Set Authenticated User Data
};
