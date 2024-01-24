<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("PLACEHOLDERS.ChangePhoneLink") }}</h4>
    </div>
    <!-- End:: Title -->
    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <form @submit.prevent="validateFormInputs">
        <div class="row" v-if="showChangePhone">
          <!-- Start:: Name Input -->
          <base-input col="12" type="text" :placeholder="$t('PLACEHOLDERS.phone')" v-model="data.phone" required />
          <!-- End:: Name Input -->
          <div class="col-md-6">
            <div class="btn_wrapper">
              <base-button class="mt-2" styleType="primary_btn" :btnText="$t('BUTTONS.save')"
                :isLoading="isWaitingRequest" :disabled="isWaitingRequest" />
            </div>
          </div>
        </div>
      </form>
      <form @submit.prevent="validateFormVerify">
        <div class="row" v-if="showCode">
          <base-input col="12" type="text" :placeholder="$t('PLACEHOLDERS.PhoneCode')" required v-model="data.code" />
          <div class="col-md-6">
            <div class="btn_wrapper">
              <base-button class="mt-2" styleType="primary_btn" :btnText="$t('BUTTONS.save')"
                :isLoading="isWaitingRequest" :disabled="isWaitingRequest" />
            </div>
          </div>
        </div>
      </form>
    </div>
    <!-- END:: Single Step Form Content -->
  </div>
</template>
<script>
export default {
  name: "CreateContact",
  data() {
    return {
      // Start:: Loader Control Data
      isWaitingRequest: false,
      showCode: false,
      showChangePhone: true,
      // End:: Loader Control Data
      // Start:: Data Collection To Send
      data: {
        phone: null,
        code: ''
      },
      // End:: Data
    };
  },
  computed: {},
  methods: {
    // Start:: validate Form Inputs
    validateFormInputs() {
      this.isWaitingRequest = true;
      if (!this.data.phone) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.phoneNumber"));
        return;
      } else {
        this.submitForm();
        return;
      }
    },
    validateFormVerify() {
      this.isWaitingRequest = true;
      if (!this.data.code) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.code"));
        return;
      } else {
        this.VerifyCode();
        return;
      }
    },
    // End:: validate Form Inputs
    // Start:: Submit Form
    async submitForm() {
      const REQUEST_DATA = new FormData();
      // Start:: Append Request Data
      REQUEST_DATA.append("phone", this.data.phone);
      // Start:: Append Request Data
      try {
        await this.$axios({
          method: "POST",
          url: `auth/change-phone`,
          data: { phone: this.data.phone },
        });
        this.isWaitingRequest = false;
        this.$message.success(this.$t("MESSAGES.sentSuccessfully"));
        localStorage.setItem('new-phone', this.data.phone)
        this.showCode = true;
        this.showChangePhone = false;
        localStorage.setItem("verify-phone", this.data.phone)
        this.$router.push('/verify-phone')
      } catch (error) {
        this.isWaitingRequest = false;
        this.$message.error(error.response.data.message);
      }
    },
    // End:: Submit Form
    // Start:: Submit Form
    async VerifyCode() {
      try {
        await this.$axios({
          method: "POST",
          url: `auth/verifyChangePhoneCode`,
          data: {
            phone: localStorage.getItem('new-phone'),
            code: this.data.code,
            role: localStorage.getItem('akry_dashboard_user_role')
          },
        });
        this.isWaitingRequest = false;
        this.$message.success(this.$t("MESSAGES.ChangePhoneSuccessfully"));
        this.$router.push('/home')
      } catch (error) {
        this.isWaitingRequest = false;
        this.$message.error(error.response.data.message);
      }
    },
    // End:: Submit Form
  },
  created() {
  },
};
</script>
<style>
.ch-p {
  color: var(--main_theme_clr) !important;
  font-size: 16px;
  font-family: "Cairo-Medium";
}
</style>