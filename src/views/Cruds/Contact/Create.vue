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
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.email')" v-model.trim="data.email" required />
          <!-- End:: email Input -->

          <!-- Start:: Minimum Limit Input -->
          <base-input col="12" type="textarea" cols="6" rows="6" :placeholder="$t('PLACEHOLDERS.content')"
            v-model.trim="data.content" required />
          <!-- End:: Minimum Limit Input -->


          <!-- Start:: Submit Button Wrapper -->
          <div class="btn_wrapper">
            <base-button class="mt-2" styleType="primary_btn" :btnText="$t('BUTTONS.save')" :isLoading="isWaitingRequest"
              :disabled="isWaitingRequest" />
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
        content: null
      },
      // End:: Data Collection To Send
    };
  },

  computed: {
  },

  methods: {

    // Start:: validate Form Inputs
    validateFormInputs() {
      this.isWaitingRequest = true;

      if (!this.data.name) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.name"));
        return;
      }
      else if (!this.data.email) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.email"));
        return;
      }
      else if (!this.data.content) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.content"));
        return;
      }
      else {
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
      REQUEST_DATA.append("message", this.data.message);
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

  async created() {
  },
};
</script>
