<template>
  <div class="reset_password_phone_num_form_wrapper">
    <!-- Start:: Form Title -->
    <!-- <div class="form_title_wrapper">
    </div> -->
    <!-- End:: Form Title -->

    <!-- Start:: Form -->
    <div class="form_wrapper">
      <form class="mt-4" @submit.prevent="validateFormInputs">
        <div class="row justify-content-center">
          <!-- Start:: phone Input -->
          <base-input col="7" type="tel" :placeholder="$t('PLACEHOLDERS.phone')"
            v-model.trim="resetPassPhoneNumData.phone" required />
          <!-- End:: phone Input -->

          <!-- Start:: role Input -->
          <!-- <base-select-input col="7" :optionsList="allRoles" :placeholder="$t('TITLES.roles')"
            v-model="resetPassPhoneNumData.role" required /> -->
          <!-- End:: role Input -->

          <!-- Start:: Submit Button -->
          <div class="col-lg-7 my-5">
            <base-button class="mt-0 w-100" styleType="primary_btn" :btnText="$t('BUTTONS.confirm')"
              :isLoading="isWaitingRequest" :disabled="isWaitingRequest" />
          </div>
          <!-- End:: Submit Button -->
        </div>
      </form>

      <!-- Start:: Login Route Wrapper -->
      <router-link to="/" class="register_route">
        <span>{{ $t("BUTTONS.haveAccount") }}</span>
        <span> {{ $t("BUTTONS.login") }}</span>
      </router-link>
      <!-- End:: Login Route Wrapper -->
    </div>
    <!-- End:: Form -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ResetPasswordPhoneForm",

  data() {
    return {
      // Start:: Loader Data
      isWaitingRequest: false,
      // End:: Loader Data

      // Start:: Data Collection To Send
      resetPassPhoneNumData: {
        phone: null,
        role: null
      },
      // End:: Data Collection To Send
    };
  },

  computed: {
    ...mapGetters({
      getAuthenticatedUserData: "AuthenticationModule/getAuthenticatedUserData",
      getAppLocale: "AppLangModule/getAppLocale",
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

  methods: {
    ...mapActions({
      setAuthenticatedUserData: "AuthenticationModule/setAuthenticatedUserData",
    }),

    // Start:: Validate Form Inputs
    validateFormInputs() {
      this.isWaitingRequest = true;

      if (!this.resetPassPhoneNumData.phone) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.phoneNumber"));
        return;
      } else {
        this.submitForm();
      }
    },
    // End:: Validate Form Inputs

    // Start:: Submit Form
    async submitForm() {
      this.isWaitingRequest = true;

      const REQUEST_DATA = new FormData();
      // Start:: Append Request Data
      REQUEST_DATA.append("phone", this.resetPassPhoneNumData.phone);
      REQUEST_DATA.append("role", this.getAuthenticatedUserData.role);
      // End:: Append Request Data

      try {
        let res = await this.$axios({
          method: "POST",
          url: `auth/forgetPassword`,
          data: REQUEST_DATA,
        });
        this.isWaitingRequest = false;
        this.$message.success(this.$t("MESSAGES.sentSuccessfully"));
        localStorage.setItem("akry_dashboard_verification_code", res.data.data.code);
        this.setAuthenticatedUserData({
          phone: this.resetPassPhoneNumData.phone,
        });
        this.clearFormInputs();
        this.$router.replace("/email-verification/reset-password");
      } catch (error) {
        this.isWaitingRequest = false;
        this.$message.error(error.response.data.message);
      }
    },
    // End:: Submit Form

    // Start:: Clear Form Inputs
    clearFormInputs() {
      this.resetPassPhoneNumData.phone = null;
    },
    // End:: Clear Form Inputs
  },
};
</script>
