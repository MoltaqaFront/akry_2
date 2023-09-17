<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("PLACEHOLDERS.contact_us") }}</h4>
    </div>
    <!-- End:: Title -->

    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <form @submit.prevent="validateFormInputs">
        <div class="row">
          <!-- Start:: Name Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.name')" v-model.trim="data.name" required />
          <!-- End:: Name Input -->

          <!-- Start:: email Input -->
          <base-input col="6" type="email" :placeholder="$t('PLACEHOLDERS.email')" v-model.trim="data.email" required />

          <base-input col="6" type="tel" :placeholder="$t('PLACEHOLDERS.phone')" v-model.trim="data.phone" required />

          <base-select-input col="6" :optionsList="allTypes" :placeholder="$t('PLACEHOLDERS.messageType')"
            v-model="data.type" required />

          <!-- End:: email Input -->

          <!-- Start:: Minimum Limit Input -->
          <base-input col="12" type="textarea" cols="6" rows="6" :placeholder="$t('PLACEHOLDERS.content')"
            v-model.trim="data.content" required />
          <!-- End:: Minimum Limit Input -->

          <!-- Start:: Submit Button Wrapper -->
          <div class="row">
            <div class="col-md-6">
              <div class="social-media">
                <a :href="SocialLink.input" class="social-i" v-for="(SocialLink, index) in social" :key="index">
                  <img :src="SocialLink.icon" alt="" />
                </a>
              </div>
            </div>
            <div class="col-md-6">
              <div class="btn_wrapper">
                <base-button class="mt-2" styleType="primary_btn" :btnText="$t('BUTTONS.save')"
                  :isLoading="isWaitingRequest" :disabled="isWaitingRequest" />
              </div>
            </div>
          </div>
          <!-- End:: Submit Button Wrapper -->
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
      // End:: Loader Control Data

      // Start:: Data Collection To Send
      data: {
        name: null,
        email: null,
        phone: '',
        type: '',
        content: null,
      },
      // End:: Data Collection To Send

      social: [],
    };
  },

  computed: {

    allTypes() {
      return [
        {
          id: 1,
          name: this.$t("PLACEHOLDERS.request"),
          value: "request",
        },
        {
          id: 3,
          name: this.$t("PLACEHOLDERS.complain"),
          value: "complain",
        },
        {
          id: 4,
          name: this.$t("PLACEHOLDERS.perposal"),
          value: "perposal",
        },
        {
          id: 3,
          name: this.$t("PLACEHOLDERS.other"),
          value: "other",
        },
      ];
    },

  },

  methods: {
    async getData() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: "social-media",
        });
        console.log("All Data ==>", res.data.body.data[0].input);
        console.log("All Data ==>", res.data.body.data[0].icon);
        this.social = res.data.body.data;
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },

    // Start:: validate Form Inputs
    validateFormInputs() {
      this.isWaitingRequest = true;

      if (!this.data.name) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.name"));
        return;
      } else if (!this.data.email) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.email"));
        return;
      } else if (!this.data.phone) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.phoneNumber"));
        return;
      } else if (!this.data.type?.value) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.messageType"));
        return;
      }
      else if (!this.data.content) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.content"));
        return;
      } else {
        this.submitForm();
        return;
      }
    },
    // End:: validate Form Inputs

    // Start:: Submit Form
    async submitForm() {
      const REQUEST_DATA = new FormData();
      // Start:: Append Request Data
      REQUEST_DATA.append("name", this.data.name);
      REQUEST_DATA.append("email", this.data.email);
      REQUEST_DATA.append("phone", this.data.phone);
      REQUEST_DATA.append("type", this.data.type?.value);
      REQUEST_DATA.append("message", this.data.content);
      // Start:: Append Request Data

      try {
        await this.$axios({
          method: "POST",
          url: `contact_us`,
          data: REQUEST_DATA,
        });
        this.isWaitingRequest = false;
        this.$message.success(this.$t("MESSAGES.addedSuccessfully"));
        this.$router.push({ path: "/home" });
      } catch (error) {
        this.isWaitingRequest = false;
        this.$message.error(error.response.data.message);
      }
    },
    // End:: Submit Form
  },

  created() {
    this.getData();
  },
};
</script>

<style>
.social-media {
  display: flex;
  height: 100%;
  justify-content: flex-start;
  align-items: center;
}

.social-media .social-i a img {
  max-width: 120px;
}

.social-i img {
  width: 38px;
  margin-inline-end: 15px;
  transition: all 0.5s ease;
  background: transparent;
}

.social-i img:hover {
  transform: translateY(-5px);
}
</style>
