<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("PLACEHOLDERS.ChangePhoneLink") }}</h4>
    </div>
    <!-- End:: Title -->

    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper change-form">
      <form @submit.prevent="validateFormVerify">
        <div class="row" >
          <base-input
            col="12"
            type="text"
            :placeholder="$t('PLACEHOLDERS.PhoneCode')"
            required
            v-model="data.code"
          />
          <div class="col-md-12">
              <div class="btn_wrapper sub-phone-c">
                <base-button
                  class="mt-2"
                  styleType="primary_btn"
                  :btnText="$t('BUTTONS.save')"
                  :isLoading="isWaitingRequest"
                  :disabled="isWaitingRequest"
                />
              </div>
            </div>

             <!-- Start:: Countdown Timer -->
          <div class="col-12">
            <div class="timer_wrapper sub-phone-c">
              <h3>{{ "0 : " + timerCount }}</h3>
              <div class="resend_btn_wrapper">
                <button id="resend_btn" type="button" v-if="timerCount > 0" class="disabled" disabled="disabled">
                  {{ $t("BUTTONS.resendCode") }}
                </button>

                <button id="resend_btn" type="button" v-else @click="submitForm" :class="timerCount">
                  {{ $t("BUTTONS.resendCode") }}
                </button>
              </div>
            </div>
          </div>
          <!-- Start:: Countdown Timer -->


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
        code:''
      },
      // End:: Data 

      // Start:: Timer Data
      timerCount: 60,
      // End:: Timer Data
    };
  },

  computed: {},

  methods: {

    // Start:: Countdown Timer
    countDown() {
      if (this.timerCount > 0) {
        setTimeout(() => {
          this.timerCount -= 1;
          this.countDown();
        }, 1000);
      }
    },
    // End:: Countdown Timer


    // Start:: validate Form Inputs
    validateFormInputs() {
      this.isWaitingRequest = true;

      if (!this.data.phone) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.phoneNumber"));
        return;
      }  else {
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
      }  else {
        this.VerifyCode();
        return;
      }
    },
    // End:: validate Form Inputs

    // Start:: Submit Form
    async submitForm() {
      const REQUEST_DATA = new FormData();
      // Start:: Append Request Data
      REQUEST_DATA.append("phone", localStorage.getItem("verify-phone"));
      // Start:: Append Request 
    
      this.timerCount = 60;

      setTimeout(() => {
        this.timerCount -= 1;
        this.countDown();
      }, 1000);

      try {
        await this.$axios({
          method: "POST",
          url: `auth/change-phone`,
          data: REQUEST_DATA,
        });
        this.isWaitingRequest = false;
        this.$message.success(this.$t("MESSAGES.sentSuccessfully"));
        localStorage.setItem('new-phone',this.data.phone)
        this.showCode = true;
        this.showChangePhone = false;
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
            phone:localStorage.getItem('new-phone'),
            code:this.data.code,
            role:localStorage.getItem('akry_dashboard_user_role')
          },
        });

        localStorage.removeItem("verify-phone")
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

     // Start:: Fire Methods
     this.countDown();
    // End:: Fire Methods
  },
};
</script>

<style>
.ch-p {
    color: var(--main_theme_clr) !important;
    font-size: 16px;
    font-family: "Cairo-Medium";
}
.sub-phone-c {
    justify-content: center !important;
    text-align: center !important;
}
.sub-phone-c h3{
  direction: initial;
}
.timer_wrapper .resend_btn_wrapper button[disabled] {
    color: var(--light_gray_clr);
}
.timer_wrapper .resend_btn_wrapper button {
    color: var(--main_theme_clr);
    font-size: 18px;
    font-family: "Cairo-SemiBold";
    transition: all 0.4s ease-in-out;
}
</style>
