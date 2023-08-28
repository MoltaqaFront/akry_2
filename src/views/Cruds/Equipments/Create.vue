<template>
  <div class="crud_form_wrapper">

    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("PLACEHOLDERS.add_equipment") }}</h4>
    </div>
    <!-- End:: Title -->

    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <form @submit.prevent="validateFormInputs">
        <div class="row">

          <div v-for="(input, index) in imageInputs" :key="index">
            <base-image-upload-input col="12" :identifier="input.identifier" :placeholder="$t(input.placeholder)"
              @selectImage="selectImage(index, $event)" /> {{ index }}

            <button @click="removeImageInput(index)" type="button">remove button</button>{{ index }}

          </div>

          <button @click="addImageInput" type="button">Add Image Input</button>


          <!-- Start:: Name Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.name')" v-model.trim="data.name" required />
          <!-- End:: Name Input -->

          <base-input col="6" type="number" :placeholder="$t('PLACEHOLDERS.price')" v-model.trim="data.price" required />

          <base-select-input col="6" :optionsList="is_availableStatus" :placeholder="$t('PLACEHOLDERS.status')"
            v-model="data.is_available" required />

          <base-input col="6" type="number" :placeholder="$t('PLACEHOLDERS.Available_number')"
            v-model.trim="data.available_number" required />

          <base-select-input col="6" :optionsList="is_transportStatus" :placeholder="$t('PLACEHOLDERS.is_transport')"
            v-model="data.is_transport" required />

          <base-select-input col="6" :optionsList="is_paymentStatus" :placeholder="$t('PLACEHOLDERS.is_paymentStatus')"
            v-model="data.is_payment" required />

          <base-input col="6" type="number" v-if="is_paymentStatus && data.is_payment.value === 1"
            :placeholder="$t('PLACEHOLDERS.min_payment')" v-model.trim="data.min_payment" required />

          <base-input col="6" type="number" :placeholder="$t('PLACEHOLDERS.day_payment')" v-model.trim="data.day_payment"
            required />

          <div class="input_wrapper top_label">
            <label class="form-label">
              {{ placeholder }}
            </label>
            <input col="6" ref="fileInput" type="file" class="form-control" :placeholder="$t('PLACEHOLDERS.video')"
              @change="handleFileChange" />
          </div>


          <div v-if="uploading" class="w-100">
            <progress class="w-100" :value="uploadProgress" max="100"></progress>
            <p>{{ Math.round(uploadProgress) }}% uploaded</p>
          </div>

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
import { mapGetters, mapActions } from "vuex";

export default {
  name: "CreateDriver",

  computed: {
    // Start:: Vuex Getters
    ...mapGetters({
    }),
    // End:: Vuex Getters

    driverTypes() {
      return [
        {
          id: 1,
          name: this.$t("PLACEHOLDERS.normal_wash"),
          value: "washing",
        },
        {
          id: 3,
          name: this.$t("PLACEHOLDERS.washing_polishing"),
          value: "washing_polishing",
        },
      ];
    },

    is_availableStatus() {
      return [
        {
          id: 0,
          name: this.$t('STATUS.is_not_Available'),
          value: 0
        },
        {
          id: 1,
          name: this.$t('STATUS.isAvailable'),
          value: 1
        }
      ]
    },
    is_transportStatus() {
      return [
        {
          id: 0,
          name: this.$t('PLACEHOLDERS.no'),
          value: 0
        },
        {
          id: 1,
          name: this.$t('PLACEHOLDERS.yes'),
          value: 1
        }
      ]
    },
    is_paymentStatus() {
      return [
        {
          id: 0,
          name: this.$t('PLACEHOLDERS.no'),
          value: 0
        },
        {
          id: 1,
          name: this.$t('PLACEHOLDERS.yes'),
          value: 1
        }
      ]
    }
  },

  data() {
    return {
      // Start:: Loader Control Data
      isWaitingRequest: false,
      // End:: Loader Control Data
      imageInputs: [
        { identifier: "image", placeholder: "PLACEHOLDERS.personalImage" },
        // Add more input configurations here
      ],
      selectedImages: [],

      // Start:: Data Collection To Send
      data: {

        name: null,
        available: true,
        is_payment: null,
        active: true,
      },

      file: null,
      uploading: false,
      uploadProgress: 0,
      // End:: Data Collection To Send


    };
  },

  methods: {

    // Start:: Select Upload Image

    selectImage(index, selectedImage) {
      this.selectedImages[index] = selectedImage;
    },
    addImageInput() {
      this.imageInputs.push({
        identifier: `image${this.imageInputs.length}`,
        placeholder: "New Image Placeholder",
      });
      this.selectedImages.push(null);
    },
    removeImageInput(index) {
      console.log(index)
      this.imageInputs.splice(index, 1);
      this.selectedImages.splice(index, 1);
    },


    // End:: Select Upload Image

    // Start:: validate Form Inputs
    validateFormInputs() {
      this.isWaitingRequest = true;

      if (!this.data.name) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.name"));
        return;
      } else if (!this.data.phone) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.phoneNumber"));
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
      REQUEST_DATA.append("phone", this.data.phone);
      REQUEST_DATA.append("email", this.data.email);
      REQUEST_DATA.append("id_number", this.data.identity);
      REQUEST_DATA.append("iban", this.data.iban);
      REQUEST_DATA.append("account_username", this.data.Account_Holders);
      REQUEST_DATA.append("car_number", this.data.car_plate);
      REQUEST_DATA.append("car_made_year", this.data.year_made);
      REQUEST_DATA.append("nationality_id", this.data.nationality?.id);
      REQUEST_DATA.append("car_type_id", this.data.car_type?.id);
      REQUEST_DATA.append("car_model_id", this.data.car_model?.id);

      REQUEST_DATA.append("password", this.data.password);
      REQUEST_DATA.append("password_confirmation", this.data.passwordConfirmation);
      // REQUEST_DATA.append("available", +this.data.available);
      // REQUEST_DATA.append("status", +this.data.active);
      // Start:: Append Request Data

      try {
        await this.$axios({
          method: "POST",
          url: `admin/driver`,
          data: REQUEST_DATA,
        });
        this.isWaitingRequest = false;
        this.$message.success(this.$t("MESSAGES.addedSuccessfully"));
        this.$router.push({ path: "/drivers/all" });
      } catch (error) {
        this.isWaitingRequest = false;
        this.$message.error(error.response.data.errors);
      }
    },
    // End:: Submit Form

    handleFileChange(event) {
      this.file = event.target.files[0];
      this.uploadVideo();
    },
    async uploadVideo() {
      if (!this.file) return;

      // Load the video to get its duration
      const videoElement = document.createElement('video');
      videoElement.src = URL.createObjectURL(this.file);

      videoElement.onloadedmetadata = () => {
        const duration = videoElement.duration;

        if (duration < 20 || duration > 30) {
          alert('Video duration should be between 20 and 30 seconds.');
          this.$refs.fileInput.value = '';
          return;
        }

        this.uploading = true;

        // Simulate an asynchronous upload process
        const totalSize = this.file.size;
        let uploadedSize = 0;

        while (uploadedSize < totalSize) {
          // Simulate uploading a chunk of data
          const chunkSize = 100000; // Adjust the chunk size as needed
          uploadedSize += chunkSize;
          this.uploadProgress = (uploadedSize / totalSize) * 100;
          new Promise(resolve => setTimeout(resolve, 500)); // Simulate delay
        }

        this.uploading = false;
        this.uploadProgress = 0;
        alert('Upload complete!');
      };
    },


  },

  async created() {
    // Start:: Fire Methods
    // End:: Fire Methods
  },
};
</script>
