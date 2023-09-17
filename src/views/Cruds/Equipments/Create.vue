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

          <div class="col-12">
            <h3 class="text-center">{{ $t('PLACEHOLDERS.equipment_images') }}</h3>
          </div>

          <base-image-upload-input col="4" identifier="id_imge" :preSelectedImage="data.id_imge.path"
            @selectImage="selectImage" />
          <!-- End:: Logo Input -->

          <!-- Start:: Cover Input -->
          <base-image-upload-input col="4" identifier="liecence_image" @selectImage="selectImage"
            :preSelectedImage="data.liecence_image.path" required />
          <!-- End:: Cover Input -->

          <!-- Start:: Commerical Profile Image Input -->
          <base-image-upload-input col="4" identifier="front_image" @selectImage="selectImage"
            :preSelectedImage="data.front_image.path" required />
          <!-- End:: Commerical Profile Image Input -->

          <!-- Start:: Tax Profile Image Input -->
          <base-image-upload-input col="4" identifier="back_image" @selectImage="selectImage"
            :preSelectedImage="data.back_image.path" required />
          <!-- End:: Tax Profile Image Input -->

          <!-- Start:: Tax Profile Image Input -->
          <base-image-upload-input col="4" identifier="image_5" @selectImage="selectImage"
            :preSelectedImage="data.back_5.path" required />
          <!-- End:: Tax Profile Image Input -->

          <!-- Start:: Tax Profile Image Input -->
          <base-image-upload-input col="4" identifier="image_6" @selectImage="selectImage"
            :preSelectedImage="data.back_6.path" required />
          <!-- End:: Tax Profile Image Input -->


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

          <base-input col="6" type="number" v-if="data.is_payment.value == 1"
            :placeholder="$t('PLACEHOLDERS.min_payment')" v-model.trim="data.min_payment" required />

          <base-input col="6" type="number" v-if="data.is_payment.value == 1"
            :placeholder="$t('PLACEHOLDERS.day_payment')" v-model.trim="data.day_payment" required />

          <base-select-input col="6" :optionsList="allTransport" :placeholder="$t('PLACEHOLDERS.transport_type')"
            v-model="data.transport_type_id" required />


          <base-select-input col="6" :optionsList="main_cat" :placeholder="$t('PLACEHOLDERS.main_cat')"
            v-model="main_list" required @input="getSub(main_list)" />

          <base-select-input col="6" v-if="sub_cat.length" :optionsList="sub_cat"
            :placeholder="$t('PLACEHOLDERS.sub_cat')" v-model="sub_list" required @input="get_inner_Sub(sub_list)" />

          <base-select-input col="6" v-if="sub_inner_cat.length" :optionsList="sub_inner_cat"
            :placeholder="$t('PLACEHOLDERS.inner_sub_cat')" v-model="sub_inner_list" required @input="GetFeatures" />

          <!-- Render optional features -->
          <div v-for="(item, index) in AllFeatures.optional" :key="'a' + index">
            <div class="row">
              <base-input class="col-lg-6 col-12" type="text"
                v-if="item.inputType === 'text' || item.inputType === 'longText' || item.inputType === 'number'"
                :placeholder="item.name" v-model="optionalInputs[index]" required />

              <base-select-input class="col-lg-6 col-12"
                v-if="item.inputType === 'radio' || item.inputType === 'multiChoice'" :optionsList="item.choices"
                :placeholder="item.name" v-model="optionalChoices[index]" required multiple />
            </div>
          </div>

          <!-- Render required features -->
          <div v-for="(item, index) in AllFeatures.required" :key="'c' + index">
            <div class="row">
              <base-input class="col-lg-6 col-12" type="text"
                v-if="item.inputType === 'text' || item.inputType === 'longText' || item.inputType === 'number'"
                :placeholder="item.name" v-model="requiredInputs[index]" required />

              <base-select-input class="col-lg-6 col-12"
                v-if="item.inputType === 'radio' || item.inputType === 'multiChoice'" :optionsList="item.choices"
                :placeholder="item.name" v-model="requiredChoices[index]" required multiple />
            </div>
          </div>



          <div class="input_wrapper top_label">
            <label class="form-label">
              {{ $t('PLACEHOLDERS.upload_video') }}
            </label>
            <input col="6" ref="fileInput" type="file" class="form-control" :placeholder="$t('PLACEHOLDERS.video')"
              @change="handleFileChange" accept="video/*" />
          </div>


          <div v-if="uploading" class="w-100">
            <progress class="w-100" :value="uploadProgress" max="100"></progress>
            <p>{{ Math.round(uploadProgress) }}% uploaded</p>
          </div>

          <base-input col="12" type="text" :placeholder="$t('TABLES.Addresses.address')" v-model.trim="place" required />

          <div class="row">
            <div class="col-12">
              <div class="form-group">

                <GmapMap :center="center" :zoom="7" map-type-id="terrain" style="width: 100%; height: 300px"
                  @click="handleMapClick">
                  <GmapMarker :position="marker.position" :clickable="true" :draggable="true" @click="markerClicked"
                    @dragend="markerDragged($event)" />
                </GmapMap>

              </div>
            </div>
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
        back_5: {
          path: null,
          file: null,
        },
        back_6: {
          path: null,
          file: null,
        },

        name: null,
        price: null,
        is_available: null,
        available_number: null,
        is_transport: '',
        is_payment: '',
        min_payment: '',
        day_payment: '',
        transport_type_id: '',


      },

      file: null,
      uploading: false,
      uploadProgress: 0,

      allTransport: [],
      transport_type_id: '',

      main_cat: [],
      main_list: '',
      sub_cat: [],
      sub_list: '',

      sub_inner_cat: [],
      sub_inner_list: '',

      AllFeatures: [],


      // google maps

      center: { lat: 24.7136, lng: 46.6753 },
      zoom: 10,
      currentPlace: null,
      markers: [],
      AllCategories: [],
      marker: {
        position: { lat: 24.7136, lng: 46.6753 }, // Initial marker position (Riyadh)
      },

      Latitude: '',
      Longitude: '',
      Radius: '',
      place: '',
      // End:: Data Collection To Send

      optionalInputs: [],
      optionalChoices: [],
      requiredInputs: [],
      requiredChoices: [],

    };
  },

  methods: {

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
      } else if (selectedImage.identifier === "back_5") {
        this.data.back_5 = selectedImage;
      } else if (selectedImage.identifier === "back_6") {
        this.data.back_6 = selectedImage;
      }
    },
    // End:: Select Upload Image


    // End:: Select Upload Image

    // Start:: validate Form Inputs
    validateFormInputs() {
      this.isWaitingRequest = true;
      if (!this.data.back_image.file && !this.data.id_imge.file && !this.data.liecence_image.file
        && !this.data.front_image.file && !this.data.back_5.file && !this.data.back_6.file
      ) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.one_image"));
        return;
      }
      else if (!this.data.name) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.name"));
        return;
      }
      else if (!this.data.price) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.price"));
        return;
      }
      else if (!this.data.is_available) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.is_available"));
        return;
      }
      else if (!this.data.available_number) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.available_number"));
        return;
      }
      else if (!this.data.is_transport) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.is_transport"));
        return;
      }
      else if (!this.data.is_payment) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.is_payment"));
        return;
      }
      else if (this.data.is_payment?.value === 1 && !this.data.min_payment) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.min_payment"));
        return;
      }
      else if (this.data.is_payment?.value === 1 && !this.data.day_payment) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.day_payment"));
        return;
      }

      else if (!this.data.transport_type_id) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.transport_type_id"));
        return;
      }
      else if (!this.sub_inner_list) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.sub_inner_list"));
        return;
      }
      else if (!this.file) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.video"));
        return;
      }
      else if (!this.place) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.place"));
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
      REQUEST_DATA.append("price", this.data.price);

      if (this.data.id_imge.file) {
        REQUEST_DATA.append("images[0]", this.data.id_imge.file);
      }
      if (this.data.liecence_image.file) {
        REQUEST_DATA.append("images[1]", this.data.liecence_image.file);
      }
      if (this.data.front_image.file) {
        REQUEST_DATA.append("images[2]", this.data.front_image.file);
      }
      if (this.data.back_image.file) {
        REQUEST_DATA.append("images[3]", this.data.back_image.file);
      }
      if (this.data.back_5.file) {
        REQUEST_DATA.append("images[4]", this.data.back_5.file);
      }
      if (this.data.back_6.file) {
        REQUEST_DATA.append("images[5]", this.data.back_6.file);
      }

      REQUEST_DATA.append("video", this.file);
      REQUEST_DATA.append("equipement_sub_category_id", this.sub_inner_list?.id);
      REQUEST_DATA.append("transport_type_id", this.data.transport_type_id?.id);
      REQUEST_DATA.append("is_available", this.data.is_available?.value);
      REQUEST_DATA.append("available_number", this.data.available_number);
      REQUEST_DATA.append("is_transport", this.data.is_transport?.value);
      REQUEST_DATA.append("is_payment", this.data.is_payment?.value);

      if (this.data.is_payment?.value == 1) {
        REQUEST_DATA.append("min_payment", this.data.min_payment);
        REQUEST_DATA.append("day_payment", this.data.day_payment);
      }
      REQUEST_DATA.append("address[location]", this.place);

      REQUEST_DATA.append("address[lat]", this.Latitude);
      REQUEST_DATA.append("address[lng]", this.Longitude);

      // Append optional features
      this.AllFeatures.optional.forEach((item, index) => {
        if (item.inputType === "text" || item.inputType === "longText" || item.inputType === "number") {
          REQUEST_DATA.append(`features[${index}][feature_id]`, item.id);
          REQUEST_DATA.append(`features[${index}][choice]`, this.optionalInputs[index]);
        } else if (item.inputType === "radio" || item.inputType === "multiChoice") {
          this.optionalChoices[index].forEach((choice, choiceIndex) => {
            REQUEST_DATA.append(`features[${index}][feature_id]`, item.id);
            REQUEST_DATA.append(`features[${index}][choice_id][${choiceIndex}]`, choice.id);
          });
        }
      });

      // Append required features
      this.AllFeatures.required.forEach((item, index) => {
        if (item.inputType === "text" || item.inputType === "longText" || item.inputType === "number") {
          REQUEST_DATA.append(`features[${index + this.AllFeatures.optional.length}][feature_id]`, item.id);
          REQUEST_DATA.append(`features[${index + this.AllFeatures.optional.length}][choice]`, this.requiredInputs[index]);
        } else if (item.inputType === "radio" || item.inputType === "multiChoice") {
          this.requiredChoices[index].forEach((choice, choiceIndex) => {
            REQUEST_DATA.append(`features[${index + this.AllFeatures.optional.length}][feature_id]`, item.id);
            REQUEST_DATA.append(`features[${index + this.AllFeatures.optional.length}][choice_id][${choiceIndex}]`, choice.id);
          });
        }
      });

      try {
        await this.$axios({
          method: "POST",
          url: `equipements`,
          data: REQUEST_DATA,
        });
        this.isWaitingRequest = false;
        this.$message.success(this.$t("MESSAGES.addedSuccessfully"));
        this.$router.push({ path: "/equipments/all" });
      } catch (error) {
        this.isWaitingRequest = false;
        this.$message.error(error.response.data.message);
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
          // alert('Video duration should be between 20 and 30 seconds.');
          this.$message.error(this.$t("VALIDATION.vide_du"));
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
        this.$message.success(this.$t("VALIDATION.upload_complete"));
      };
    },

    // google maps

    handleMapClick(event) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();

      const radius = this.calculateDistance(lat, lng, this.center.lat, this.center.lng);

      const geocoder = new google.maps.Geocoder();
      const latLng = new google.maps.LatLng(lat, lng);

      geocoder.geocode({ location: latLng }, (results, status) => {
        if (status === 'OK' && results[0]) {
          this.Latitude = lat;
          this.Longitude = lng;
          this.Radius = radius;
          this.place = results[0].formatted_address;

          console.log('Latitude:', lat);
          console.log('Longitude:', lng);
          console.log('Radius:', radius);
          console.log('Place:', results[0].formatted_address);

          this.marker.position = { lat, lng }; // Update the marker's position
        }
      });
    },

    calculateDistance(lat1, lng1, lat2, lng2) {
      const R = 6371; // Radius of the earth in kilometers
      const dLat = this.deg2rad(lat2 - lat1);
      const dLng = this.deg2rad(lng2 - lng1);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c * 1000; // Convert to meters
      return distance;
    },
    deg2rad(deg) {
      return deg * (Math.PI / 180);
    },
    handleMarkerClick(index) {
      console.log('Marker clicked:', index);
    },

    setPlace(place) {
      this.currentPlace = place;
    },

    markerClicked() {
      // Handle marker click event
      const lat = this.marker.position.lat;
      const lng = this.marker.position.lng;
      const radius = this.calculateDistance(lat, lng, this.center.lat, this.center.lng);
      console.log('Marker clicked:', lat, lng);
      console.log(radius);
    },

    async markerDragged(event) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();

      const radius = this.calculateDistance(lat, lng, this.center.lat, this.center.lng);

      try {
        const geocoder = new google.maps.Geocoder();
        const latLng = new google.maps.LatLng(lat, lng);
        const results = await this.reverseGeocode(lat, lng, geocoder);

        if (results.length > 0) {
          this.Latitude = lat;
          this.Longitude = lng;
          this.Radius = radius;
          this.place = results[0].formatted_address;

          console.log('Latitude:', lat);
          console.log('Longitude:', lng);
          console.log('Radius:', radius);
          console.log('Place:', results[0].formatted_address);

          this.marker.position = { lat, lng }; // Update the marker's position
        }
      } catch (error) {
        console.error('Error fetching location:', error);
      }
    },

    reverseGeocode(lat, lng, geocoder) {
      return new Promise((resolve, reject) => {
        const latLng = new google.maps.LatLng(lat, lng);
        geocoder.geocode({ location: latLng }, (results, status) => {
          if (status === 'OK') {
            resolve(results);
          } else {
            reject(new Error('Geocoder failed'));
          }
        });
      });
    },

    async getAllTransport() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: "transports/main",
        });
        this.allTransport = res.data.data;
        console.log(res.data.data);
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },

    async getAllCategories() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: "equipements/main",
        });
        this.main_cat = res.data.data;
        console.log(res.data.data);
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },

    getSub(item) {
      console.log(item)
      this.sub_list = '';
      this.sub_inner_list = '';
      this.optionalInputs = [];
      this.optionalChoices = [];
      this.requiredInputs = [];
      this.requiredChoices = [];
      this.sub_cat = item.categories;
    },

    get_inner_Sub(item) {
      console.log(item)
      this.sub_inner_list = '';
      this.optionalInputs = [];
      this.optionalChoices = [];
      this.requiredInputs = [];
      this.requiredChoices = [];
      this.sub_inner_cat = item.subCategories;
    },

    // GetFeatures

    async GetFeatures() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `features`,
          params: {
            subCategory: `${this.sub_inner_list.id}`
          }
        });
        this.AllFeatures = res.data.data;
        console.log(res.data.data);
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },

  },

  async created() {

    if (localStorage.getItem('main_type') == 'transport') {
      this.$router.push('/home')
    }

    // Start:: Fire Methods
    this.getAllTransport();
    this.getAllCategories();
    // End:: Fire Methods
  },
};
</script>
