import router from "../../../router/index.js";
import axios from "axios";

export default {
  // Start:: Set Authenticated User Data
  setAuthenticatedUserData(context, payload) {
    context.commit("setAuthenticatedUserData", payload);
  },
  // End:: Set Authenticated User Data

  // Start:: Logout
  async logout() {
    try {
      await axios({
        method: "POST",
        url: `auth/signout`,
      });
      localStorage.removeItem("akry_dashboard_user_id");
      localStorage.removeItem("akry_dashboard_user_token");
      localStorage.removeItem("akry_dashboard_userName");
      localStorage.removeItem("akry_dashboard_userPhone");
      localStorage.removeItem("akry_dashboard_userPhone");
      localStorage.removeItem("akry_dashboard_user_role");
      localStorage.removeItem("verify_code");
      router.replace("/");
      location.reload();
    } catch (error) {
      localStorage.removeItem("akry_dashboard_user_id");
      localStorage.removeItem("akry_dashboard_user_token");
      localStorage.removeItem("akry_dashboard_userName");
      localStorage.removeItem("akry_dashboard_userPhone");
      localStorage.removeItem("akry_dashboard_userPhone");
      localStorage.removeItem("akry_dashboard_user_role");
      localStorage.removeItem("verify_code");
      router.replace("/");
      location.reload();
      console.log(error.response.data.message);
    }
  },
  // END:: Logout
};
