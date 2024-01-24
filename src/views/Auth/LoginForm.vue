<template>
  <div class="login_form_wrapper">
    <!-- Start:: Form Title -->
    <!-- <div class="form_title_wrapper">
    </div> -->
    <!-- End:: Form Title -->

    <!-- Start:: Form -->
    <div class="form_wrapper">
      <form class="mt-4" @submit.prevent="validateFormInputs" autocomplete="off">
        <div class="row justify-content-center">

          <!-- <div class="notification">
            <h3>{{ notificationTitle }}</h3>
            <p>{{ notificationBody }}</p>
          </div> -->
          <!-- {{ getAuthenticatedUserData.role }} -->
          <!-- Start:: phone Input -->
          <base-input col="7" type="tel" :placeholder="$t('PLACEHOLDERS.phone')" v-model.trim="loginData.phone"
            required />
          <!-- End:: phone Input -->

          <!-- Start:: Password Input -->
          <base-input col="7" type="password" :placeholder="$t('PLACEHOLDERS.password')" v-model.trim="loginData.password"
            required />
          <!-- End:: Password Input -->

          <!-- Start:: role Input -->
          <!-- <base-select-input col="7" :optionsList="allRoles" :placeholder="$t('TITLES.roles')" v-model="loginData.role"
            required /> -->
          <!-- End:: role Input -->

          <!-- Start:: Forget Password Route -->
          <div class="col-lg-7">
            <router-link to="/reset-password-email" class="forget_pass_route">
              {{ $t("BUTTONS.forgetPassword") }}
            </router-link>
          </div>
          <!-- End:: Forget Password Route -->

          <!-- Start:: Submit Button -->
          <div class="col-lg-7 my-5">
            <base-button class="mt-0 w-100" styleType="primary_btn" :btnText="$t('BUTTONS.login')"
              :isLoading="isWaitingRequest" :disabled="isWaitingRequest" />
          </div>
          <!-- End:: Submit Button -->
        </div>
      </form>
    </div>
    <!-- End:: Form -->
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/messaging';
import { mapGetters, mapActions } from "vuex";


export default {
  name: "LoginForm",

  computed: {
    ...mapGetters({
      getAppLocale: "AppLangModule/getAppLocale",
      getAuthenticatedUserData: "AuthenticationModule/getAuthenticatedUserData",
    }),

    allRoles() {
      return [
        {
          id: 1,
          name: this.$t('PLACEHOLDERS.individual'),
          value: "individual",
        },
        {
          id: 2,
          name: this.$t('PLACEHOLDERS.store'),
          value: "store",
        }
      ]
    }
  },

  data() {
    return {
      // Start:: Loader Data
      isWaitingRequest: false,
      // End:: Loader Data

      // Start:: Data Collection To Send
      loginData: {
        phone: null,
        password: null,
        role: null
      },

      notificationTitle: null,
      notificationBody: null,

      receivedMessages: [],

      device_token: null
      // End:: Data Collection To Send
    };
  },

  mounted() {

    this.getFirebaseToken();

  },

  methods: {

    // Start:: Vuex Set Authenticated User Data
    ...mapActions({
      setAuthenticatedUserData: "AuthenticationModule/setAuthenticatedUserData",
    }),
    // End:: Vuex Set Authenticated User Data

    // Start:: Validate Form Inputs
    validateFormInputs() {
      this.isWaitingRequest = true;

      if (!this.loginData.phone) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.mobileNumber"));
        return;
      } else if (!this.loginData.password) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.password"));
        return;
      } else if (this.loginData.password.length < 6) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.passwordLength"));
        return;
      }
      // else if (!this.loginData.role) {
      //   this.isWaitingRequest = false;
      //   this.$message.error(this.$t("VALIDATION.role"));
      //   return;
      // }
      else {
        this.submitForm();
      }
    },
    // End:: Validate Form Inputs

    // Start:: Submit Form
    async submitForm() {
      const REQUEST_DATA = {};
      // Start:: Append Request Data (JSON)
      REQUEST_DATA["phone"] = this.loginData.phone;
      REQUEST_DATA["password"] = this.loginData.password;
      REQUEST_DATA["role"] = this.getAuthenticatedUserData.role;
      // REQUEST_DATA["device_token"] = this.device_token ? this.device_token : "mosbah";
      REQUEST_DATA["device_token"] = this.device_token ? this.device_token : "mosbah";
      // End:: Append Request Data (JSON)

      try {
        let res = await this.$axios({
          method: "POST",
          url: `auth/login`,
          data: REQUEST_DATA,
        });
        this.isWaitingRequest = false;

        if (res.data.data.data.status == 'verify_code') {
          this.$router.replace("/OtpVerifyCode");
          localStorage.setItem('verify_code', res.data.data.data.status);
          this.setAuthenticatedUserData({
            phone: res.data.data.data.phone
          });
        } else {
          // Start:: Set Authed User Data
          this.setAuthenticatedUserData({
            id: res.data.data.data.id,
            token: res.data.data.token,
            name: res.data.data.data.name,
            phone: res.data.data.data.phone,
            role: res.data.data.data.role,
          });

          localStorage.setItem('main_type', res.data.data.data.serviceType)

          // End:: Set Authed User Data
          this.$message.success(this.$t("VALIDATION.loginSuccess"));
          this.clearFormInputs();
          this.$router.replace("/home");
          location.reload();
        }

      } catch (error) {

        if (error.response.data.code == 403) {
          this.$router.replace("/OtpVerifyCode");
          this.setAuthenticatedUserData({
            phone: this.loginData.phone
          });
        }

        // localStorage.setItem("verify_phone_otp_from_mobile_register", this.loginData.phone);
        // this.$router.replace("/home");
        this.isWaitingRequest = false;
        this.$message.error(error.response.data.message);
      }
    },
    // End:: Submit Form

    // Start:: Clear Form Inputs
    clearFormInputs() {
      this.loginData.phone = null;
      this.loginData.password = null;
      this.loginData.role = null;
    },
    // End:: Clear Form Inputs

    // start firebase

    async getFirebaseToken() {
      const messaging = firebase.messaging();
      try {
        const token = await messaging.getToken(); // Get the FCM token
        this.device_token = token;
        // console.log('FCM token:', token);
      } catch (error) {
        console.error('Error requesting permission/token:', error);
      }
    },

  },


};
</script>
