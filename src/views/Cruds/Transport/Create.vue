<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("TITLES.addDriver") }}</h4>
    </div>
    <!-- End:: Title -->

    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <form @submit.prevent="validateFormInputs">
        <div class="row">
          <!-- Start:: Image Upload Input -->
          <base-image-upload-input col="12" identifier="image" :placeholder="$t('PLACEHOLDERS.personalImage')"
            @selectImage="selectImage" />
          <!-- End:: Image Upload Input -->

          <!-- Start:: Name Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.name')" v-model.trim="data.name" required />
          <!-- End:: Name Input -->

          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.identity')" v-model.trim="data.identity"
            required />

          <!-- Start:: Phone Input -->
          <base-input col="6" type="tel" :placeholder="$t('PLACEHOLDERS.phoneNumber')" v-model.trim="data.phone"
            required />
          <!-- End:: Phone Input -->

          <!-- Start:: Email Input -->
          <base-input col="6" type="email" :placeholder="$t('PLACEHOLDERS.email')" v-model.trim="data.email" />
          <!-- End:: Email Input -->

          <base-select-input col="6" :optionsList="AllNationalities" :placeholder="$t('PLACEHOLDERS.nationality')"
            v-model="data.nationality" required />

          <!-- Start:: Address Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.iban')" v-model.trim="data.iban" required />

          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.Account_Holders')"
            v-model.trim="data.Account_Holders" required />

          <base-select-input col="6" :optionsList="AllCarTypes" :placeholder="$t('PLACEHOLDERS.car_type')"
            v-model="data.car_type" required />

          <base-select-input col="6" :optionsList="AllCarModal" :placeholder="$t('PLACEHOLDERS.car_modal')"
            v-model="data.car_model" required />


          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.year_made')" v-model.trim="data.year_made"
            required />

          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.car_plate')" v-model.trim="data.car_plate"
            required />
          <!-- End:: Address Input -->

          <div class="col-12">
            <div class="row">
              <!-- Start:: Password Input -->
              <base-input col="6" type="password" :placeholder="$t('PLACEHOLDERS.password')" v-model.trim="data.password"
                required />
              <!-- End:: Password Input -->

              <!-- Start:: Confirm Password Input -->
              <base-input col="6" type="password" :placeholder="$t('PLACEHOLDERS.confirmPassword')"
                v-model.trim="data.passwordConfirmation" required />
              <!-- End:: Confirm Password Input -->
            </div>
          </div>

          <base-image-upload-input col="3" identifier="id_imge" :preSelectedImage="data.id_imge.path"
            :placeholder="$t('PLACEHOLDERS.id_imge')" @selectImage="selectImage" />
          <!-- End:: Logo Input -->

          <!-- Start:: Cover Input -->
          <base-image-upload-input col="3" identifier="liecence_image" :placeholder="$t('PLACEHOLDERS.liecence_image')"
            @selectImage="selectImage" :preSelectedImage="data.liecence_image.path" required />
          <!-- End:: Cover Input -->

          <!-- Start:: Commerical Profile Image Input -->
          <base-image-upload-input col="3" identifier="front_image" :placeholder="$t('PLACEHOLDERS.front_image')"
            @selectImage="selectImage" :preSelectedImage="data.front_image.path" required />
          <!-- End:: Commerical Profile Image Input -->

          <!-- Start:: Tax Profile Image Input -->
          <base-image-upload-input col="3" identifier="back_image" :placeholder="$t('PLACEHOLDERS.back_image')"
            @selectImage="selectImage" :preSelectedImage="data.back_image.path" required />
          <!-- End:: Tax Profile Image Input -->

          <!-- Start:: Available Switch Input -->
          <!-- <div class="col-md-6 input_wrapper switch_wrapper my-5">
            <v-switch color="green"
              :label="data.available ? $t('PLACEHOLDERS.available') : $t('PLACEHOLDERS.notAvailable')"
              v-model="data.available" hide-details></v-switch>
          </div> -->
          <!-- End:: Available Switch Input -->

          <!-- Start:: Deactivate Switch Input -->
          <!-- <div class="col-md-6 input_wrapper switch_wrapper my-5">
            <v-switch color="green" :label="data.active ? $t('PLACEHOLDERS.active') : $t('PLACEHOLDERS.notActive')"
              v-model="data.active" hide-details></v-switch>
          </div> -->
          <!-- End:: Deactivate Switch Input -->

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
      allAreasData: "ApiGetsModule/allAreasData",
      allCitiesByAreaIdData: "ApiGetsModule/allCitiesByAreaIdData",
      allDistrictsByCityIdData: "ApiGetsModule/allDistrictsByCityIdData",
    }),
    // End:: Vuex Getters

    driverTypes() {
      return [
        {
          id: 1,
          name: this.$t("PLACEHOLDERS.normal_wash"),
          value: "washing",
        },
        // {
        //   id: 2,
        //   name: this.$t("PLACEHOLDERS.delivery"),
        //   value: "delivery",
        // },
        {
          id: 3,
          name: this.$t("PLACEHOLDERS.washing_polishing"),
          value: "washing_polishing",
        },
      ];
    },
  },

  data() {
    return {
      // Start:: Loader Control Data
      isWaitingRequest: false,
      // End:: Loader Control Data

      // Start:: Data Collection To Send
      data: {
        id_imge: {
          path: null,
          file: null,
        },
        liecence_image: {
          path: null,
          file: null,
        },
        front_image: {
          path: null,
          file: null,
        },
        back_image: {
          path: null,
          file: null,
        },
        image: {
          path: null,
          file: null,
        },
        name: null,
        phone: null,
        email: '',
        car_model: null,
        car_type: null,
        year_made: null,
        car_plate: null,
        nationality: null,
        iban: null,
        Account_Holders: null,
        identity: null,

        password: null,
        passwordConfirmation: null,
        available: true,
        active: true,
      },
      // End:: Data Collection To Send

      AllNationalities: [],
      AllCarModal: [],
      AllCarTypes: [],

    };
  },

  methods: {
    // Start:: Vuex Actions
    ...mapActions({
      getAreas: "ApiGetsModule/getAreas",
      getCitiesByAreaId: "ApiGetsModule/getCitiesByAreaId",
      getDistrictsByCityId: "ApiGetsModule/getDistrictsByCityId",
    }),
    // End:: Vuex Actions

    // Start:: Select Upload Image

    selectImage(selectedImage) {
      if (selectedImage.identifier === "image") {
        this.data.image = selectedImage;
        console.log(this.data.logo)
      } else if (selectedImage.identifier === "id_imge") {
        this.data.id_imge = selectedImage;
      } else if (selectedImage.identifier === "liecence_image") {
        this.data.liecence_image = selectedImage;
      } else if (selectedImage.identifier === "front_image") {
        this.data.front_image = selectedImage;
      } else if (selectedImage.identifier === "back_image") {
        this.data.back_image = selectedImage;
      }
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
      if (this.data.image.file) {
        REQUEST_DATA.append("image", this.data.image.file);
      }
      if (this.data.id_imge.file) {
        REQUEST_DATA.append("id_image", this.data.id_imge.file);
      }
      if (this.data.liecence_image.file) {
        REQUEST_DATA.append("licence_image", this.data.liecence_image.file);
      }
      if (this.data.front_image.file) {
        REQUEST_DATA.append("front_car_image", this.data.front_image.file);
      }
      if (this.data.back_image.file) {
        REQUEST_DATA.append("back_car_image", this.data.back_image.file);
      }
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

    async getNationalities() {
      this.loading = true;
      try {
        let res = await this.$axios({
          method: "GET",
          url: "admin/nationalities",
        });
        this.loading = false;
        this.AllNationalities = res.data.body.nationalities;
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
    async getCarModal() {
      this.loading = true;
      try {
        let res = await this.$axios({
          method: "GET",
          url: "admin/carModels",
        });
        this.loading = false;
        this.AllCarModal = res.data.body.carModel;
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
    async getCarType() {
      this.loading = true;
      try {
        let res = await this.$axios({
          method: "GET",
          url: "admin/carTypes",
        });
        this.loading = false;
        this.AllCarTypes = res.data.body.CarTypes;
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },



  },

  async created() {
    // Start:: Fire Methods
    // await this.$store.dispatch("PermissionsModule/checkRoutePermissions", "drivers create");
    // this.getNationalities();
    // this.getCarType();
    // this.getCarModal()
    // End:: Fire Methods
  },
};
</script>
