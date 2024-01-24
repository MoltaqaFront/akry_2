<template>
  <div class="crud_form_wrapper">

    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("PLACEHOLDERS.add_transport") }}</h4>
    </div>
    <!-- End:: Title -->

    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <form @submit.prevent="validateFormInputs">
        <div class="row">

          <div class="col-12">
            <h3 class="text-center">{{ $t('PLACEHOLDERS.equipment_images') }}</h3>
          </div>

          <div class="row">
            <div class="col-md-12">
              <div class="eq-input-img">
                <label styleType="primary_btn">
                  <input multiple type="file" @change="onFileChange">
                  {{ $t('PLACEHOLDERS.add_images') }}
                </label>

              </div>
            </div>

            <div class="eq-img-container col-md-2" v-for="(image, index) in images">
              <img :src="image" />
              <button class="remove-eq-img" type="button" @click="removeImage(index)">✘</button>
            </div>
          </div>

          <!-- Start:: Name Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.name')" v-model.trim="data.name" required />
          <!-- End:: Name Input -->

          <base-input col="6" type="number" :placeholder="$t('PLACEHOLDERS.price_in_city')"
            v-model.trim="data.price_in_city" required />

          <base-input col="6" type="number" :placeholder="$t('PLACEHOLDERS.price_out_city')"
            v-model.trim="data.price_out_city" required />

          <base-select-input col="6" :optionsList="is_availableStatus" :placeholder="$t('PLACEHOLDERS.status')"
            v-model="data.is_available" required />

          <base-input col="6" type="number" :placeholder="$t('PLACEHOLDERS.Available_number')"
            v-model.trim="data.available_number" required />

          <base-select-input col="6" :optionsList="is_transportStatus" :placeholder="$t('PLACEHOLDERS.is_transport')"
            v-model="data.is_transport" required />

          <base-select-input col="6" :optionsList="is_paymentStatus" :placeholder="$t('PLACEHOLDERS.is_paymentStatus')"
            v-model="data.is_payment" required />

          <base-input col="6" type="number" v-if="data.is_payment.id == 1" :placeholder="$t('PLACEHOLDERS.min_payment')"
            v-model.trim="data.min_payment" required />

          <base-input col="6" type="number" v-if="data.is_payment.id == 1" :placeholder="$t('PLACEHOLDERS.day_payment')"
            v-model.trim="data.day_payment" required />

          <!-- {{ data.transport_type_id }} -->
          <base-select-input col="6" :optionsList="allTransport" :placeholder="$t('PLACEHOLDERS.transport_type')"
            v-model="data.transport_type_id" required @input="getWeightsAndCategories(data.transport_type_id)" />

          <base-select-input col="6" v-if="data.transport_type_id" :optionsList="weights"
            :placeholder="$t('PLACEHOLDERS.weights')" v-model="weight_equip" required />

          <base-select-input col="6" v-if="data.transport_type_id" :optionsList="categories"
            :placeholder="$t('PLACEHOLDERS.Categories')" v-model="category_equip" required />

          <!-- Render required features -->
          <!-- <div v-for="(item, index) in AllFeatures.required" :key="'c' + index">
            <div class="row">
              <div class="col-lg-6 col-12"
                v-if="item.inputType === 'text' || item.inputType === 'longText' || item.inputType === 'number'">
                <base-input type="text" :placeholder="item.name" v-model="item.choice" required />
              </div>

              <div class="col-lg-6 col-12" v-if="item.inputType === 'radio' || item.inputType === 'multiChoice'">
                <base-select-input :optionsList="item.choices" :placeholder="item.name" v-model="item.myChoices" required
                  multiple />
              </div>
            </div>
          </div> -->

          <div class="row">

            <h3 v-if="AllFeatures.required">{{ $t('PLACEHOLDERS.required') }}</h3>

            <div class="col-lg-6 col-12" v-for="(item, index) in AllFeatures.required" :key="'c' + index">

              <div v-if="item.inputType === 'text' || item.inputType === 'longText' || item.inputType === 'number'">
                <base-input type="text" :placeholder="item.name" v-model="item.choice" />
              </div>

              <div v-if="item.inputType === 'multiChoice'">
                <base-select-input :optionsList="item.choices" :placeholder="item.name" v-model="item.myChoices"
                  multiple />
              </div>

              <div v-if="item.inputType === 'radio'">
                <base-select-input :optionsList="item.choices" :placeholder="item.name" v-model="item.myChoices" />
              </div>

            </div>

          </div>

          <!-- Render required features -->

          <!-- <button type="button" class="show" @click="showOptionalFeatures = true" v-if="AllFeatures.optional.length">
            {{ $t('PLACEHOLDERS.show_Optional_Features') }}
          </button> -->

          <!-- main select -->
          <base-select-input v-if="AllFeatures.optional.length" col="12" :optionsList="AllFeatures.optional"
            :placeholder="$t('PLACEHOLDERS.Optional_Features')" v-model="selectedOptionalNames" multiple />

          <!-- Render optional features -->
          <div>
            <h3>{{ $t('PLACEHOLDERS.Optional_Features') }}</h3>
            <div class="row">

              <div class="col-lg-6 col-12" v-for="(item, index) in selectedOptionalNames" :key="'a' + index">

                <div v-if="item.inputType === 'text' || item.inputType === 'longText' || item.inputType === 'number'">

                  <base-input type="text" :placeholder="item.name" v-model="item.choice" required />

                </div>

                <div v-if="item.inputType === 'multiChoice'">
                  <base-select-input :optionsList="item.choices" :placeholder="item.name" v-model="item.myChoices"
                    required multiple />
                </div>

                <div v-if="item.inputType === 'radio'">
                  <base-select-input :optionsList="item.choices" :placeholder="item.name" v-model="item.myChoices"
                    required />
                </div>

              </div>

            </div>
          </div>

          <!-- Render optional features -->

          <div class="input_wrapper top_label">
            <label class="form-label">
              {{ $t('PLACEHOLDERS.upload_video') }}
            </label>
            <input col="6" ref="fileInput" type="file" class="form-control" :placeholder="$t('PLACEHOLDERS.video')"
              @change="handleFileChange" accept="video/*" />
          </div>

          <video class="mt-4" width="100%" height="240" controls v-if="videoLink">
            <source :src="videoLink" type="video/mp4">
            <source :src="videoLink" type="video/ogg">
            Your browser does not support the video tag.
          </video>


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
          name: this.$t('STATUS.notActive'),
          value: 0
        },
        {
          id: 1,
          name: this.$t('STATUS.active'),
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
        price_in_city: null,
        price_out_city: null,
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

      // get weights and categories

      categories: [],
      category_equip: '',
      weights: [],
      weight_equip: '',

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

      videoLink: '',

      selectedOptionalNames: [],
      showOptionalFeatures: false,

      maxImageCount: 7,

      images: [],
      newImages: [],

    };
  },

  methods: {

    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      this.selectedImages = e.target.files;
      if (!files.length) return;

      // Check if the number of selected files exceeds the maximum count
      if (this.images.length + this.newImages.length + files.length > this.maxImageCount) {
        this.$message.error(this.$t("VALIDATION.Images_Upload"));
        e.target.value = ''; // Clear the file input
        return;
      }

      // Add newly uploaded images to the newImages array
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        this.newImages.push(file);
        // Optionally, you can also push the file URL to the images array for immediate display
        // this.images.push(URL.createObjectURL(file));
      }

      this.createImage(files);
    },
    createImage(files) {
      var vm = this;
      for (var index = 0; index < files.length; index++) {
        var reader = new FileReader();
        reader.onload = function (event) {
          const imageUrl = event.target.result;
          vm.images.push(imageUrl);
        }
        reader.readAsDataURL(files[index]);
      }
    },
    removeImage(index) {
      this.images.splice(index, 1);
      this.confirmDeleteItem(index);
    },

    async confirmDeleteItem(index) {
      const REQUEST_DATA = new FormData();
      // Start:: Append Request Data
      REQUEST_DATA.append("index", index);
      try {
        await this.$axios({
          method: "POST",
          url: `transports-delete-image/${this.$route.params.id}`,
          data: REQUEST_DATA
        });
        this.$message.success(this.$t("MESSAGES.deletedSuccessfully"));
      } catch (error) {
        this.dialogDelete = false;
        this.$message.error(error.response.data.message);
      }
    },

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
      // if (!this.data.back_image.path && !this.data.id_imge.path && !this.data.liecence_image.path
      //   && !this.data.front_image.path && !this.data.back_5.path && !this.data.back_6.path
      // ) {
      //   this.isWaitingRequest = false;
      //   this.$message.error(this.$t("VALIDATION.one_image"));
      //   return;
      // }
      // else
      if (!this.data.name) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.name"));
        return;
      }
      else if (!this.data.price_in_city) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.price_in_city"));
        return;
      }
      else if (isNaN(this.data.price_in_city) || this.data.price_in_city <= 0) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.price_in_city_positive"));
        return;
      }
      else if (!this.data.price_out_city) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.price_out_city"));
        return;
      }
      else if (isNaN(this.data.price_out_city) || this.data.price_out_city <= 0) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.price_out_city_positive"));
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
      else if (isNaN(this.data.available_number) || this.data.available_number <= 0) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.number_available_positive"));
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
      else if (this.data.is_payment?.value == 1 && !this.data.min_payment) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.min_payment"));
        return;
      }
      else if (this.data.is_payment?.value == 1 && !this.data.day_payment) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.day_payment"));
        return;
      }

      else if (!this.data.transport_type_id) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.transport_type_id"));
        return;
      }
      else if (!this.weight_equip) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.weights"));
        return;
      }
      else if (!this.category_equip) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.Categories"));
        return;
      }
      // else if (!this.file && !this.videoLink) {
      //   this.isWaitingRequest = false;
      //   this.$message.error(this.$t("VALIDATION.video"));
      //   return;
      // }
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

    dataURLtoFile(dataURL, filename) {
      // Check if dataURL is a string and contains a comma
      if (typeof dataURL !== 'string' || !dataURL.includes(',')) {
        console.error("Invalid data URL:", dataURL);
        return null; // Or handle it in your specific way
      }

      const arr = dataURL.split(',');
      const mimeMatch = arr[0].match(/:(.*?);/);
      if (mimeMatch && mimeMatch.length >= 2) {
        const mime = mimeMatch[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
      } else {
        // Handle the case where the MIME type is not found
        console.error("MIME type not found in data URL:", dataURL);
        return null; // Or handle it in your specific way
      }
    },

    // Start:: Submit Form
    async submitForm() {
      const REQUEST_DATA = new FormData();
      // Start:: Append Request Data
      REQUEST_DATA.append("_method", "PUT");
      REQUEST_DATA.append("name", this.data.name);
      REQUEST_DATA.append("price_in_city", this.data.price_in_city);
      REQUEST_DATA.append("price_out_city", this.data.price_out_city);

      // Append newly uploaded images to the FormData
      for (let index = 0; index < this.newImages.length; index++) {
        REQUEST_DATA.append(`images[${index}]`, this.newImages[index]);
      }

      if (this.file) {
        // If a new video file is selected, append it
        REQUEST_DATA.append("video", this.file);
      }
      REQUEST_DATA.append("transport_type_id", this.data.transport_type_id?.id);

      REQUEST_DATA.append("weights[0]", this.weight_equip?.id);
      REQUEST_DATA.append("categories[0]", this.category_equip?.id);

      REQUEST_DATA.append("is_available", this.data.is_available?.id);
      REQUEST_DATA.append("count", this.data.available_number);
      REQUEST_DATA.append("is_transport", this.data.is_transport?.id);
      REQUEST_DATA.append("is_payment", this.data.is_payment?.id);

      if (this.data.is_payment?.id == 1) {
        REQUEST_DATA.append("min_payment", this.data.min_payment);
        REQUEST_DATA.append("day_payment", this.data.day_payment);
      }
      REQUEST_DATA.append("address[location]", this.place);

      REQUEST_DATA.append("address[lat]", this.Latitude);
      REQUEST_DATA.append("address[lng]", this.Longitude);

      // Append optional features
      this.selectedOptionalNames.forEach((item, index) => {
        if (item.inputType === "text" || item.inputType === "longText" || item.inputType === "number") {
          console.log('text', item)
          REQUEST_DATA.append(`features[${index}][feature_id]`, item.id);
          REQUEST_DATA.append(`features[${index}][choice]`, item.choice);
        }
        else if (item.inputType === "multiChoice") {
          item.myChoices?.forEach((choice, choiceIndex) => {
            console.log('multiChoice', choice)
            REQUEST_DATA.append(`features[${index}][feature_id]`, item.id);
            REQUEST_DATA.append(`features[${index}][choice_id][${choiceIndex}]`, choice.id);
          });
        }
        else if (item.inputType === "radio") {

          console.log("required radio", item.myChoices)

          REQUEST_DATA.append(`features[${index}][feature_id]`, item.id);
          REQUEST_DATA.append(`features[${index}][choice_id][${item.myChoices.id}]`, item.myChoices.id);
        }


      });

      // Append required features
      this.AllFeatures.required.forEach((item, index) => {
        if (item.inputType === "text" || item.inputType === "longText" || item.inputType === "number") {
          REQUEST_DATA.append(`features[${index + this.AllFeatures.optional.length}][feature_id]`, item.id);
          REQUEST_DATA.append(`features[${index + this.AllFeatures.optional.length}][choice]`, item.choice);
        }
        else if (item.inputType === "multiChoice") {
          item.myChoices?.forEach((choice, choiceIndex) => {
            REQUEST_DATA.append(`features[${index + this.AllFeatures.optional.length}][feature_id]`, item.id);
            REQUEST_DATA.append(`features[${index + this.AllFeatures.optional.length}][choice_id][${choiceIndex}]`, choice.id);
          });
        }
        else if (item.inputType === "radio") {
          console.log("required radio", item.myChoices)

          REQUEST_DATA.append(`features[${index + this.AllFeatures.optional.length}][feature_id]`, item.id);
          REQUEST_DATA.append(`features[${index + this.AllFeatures.optional.length}][choice_id][${item.myChoices.id}]`, item.myChoices.id);

        }

      });

      try {
        await this.$axios({
          method: "POST",
          url: `transports/${this.$route.params.id}`,
          data: REQUEST_DATA,
        });
        this.isWaitingRequest = false;
        this.$message.success(this.$t("MESSAGES.addedSuccessfully"));
        this.$router.push({ path: "/transport/all" });
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
        this.weights = res.data.data[0].weights;
        this.categories = res.data.data[0].categories;
        console.log(res.data.data);
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },

    getWeightsAndCategories(item) {
      console.log(item);

      this.weight_equip = "";
      this.category_equip = "";
      this.weights = item.weights;
      this.categories = item.categories;
      this.GetFeatures();
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

    // GetFeatures

    async GetFeatures() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `features`,
          params: {
            transportType: `${this.data.transport_type_id.id}`
          }
        });
        this.AllFeatures = res.data.data;
        console.log(res.data.data);
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },

    // get data to edit

    async GetDataToEdit() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `transports/${this.$route.params.id}`,
        });
        // this.data.id_imge.path = res.data.data?.images[0];
        // this.data.liecence_image.path = res.data.data?.images[1];
        // this.data.front_image.path = res.data.data?.images[2];
        // this.data.back_image.path = res.data.data?.images[3];
        // this.data.back_5.path = res.data.data?.images[4];
        // this.data.back_6.path = res.data.data?.images[5];

        this.images = res.data.data?.images;

        this.data.name = res.data.data.name;
        this.data.price_in_city = res.data.data.priceInCity;
        this.data.price_out_city = res.data.data.priceOutCity;

        this.weight_equip = res.data.data.weights[0];
        this.category_equip = res.data.data.categories[0];

        this.data.is_available = res.data.data.isAvailableObject;

        this.data.available_number = res.data.data.count;
        this.data.is_transport = res.data.data.isTransportObject;

        this.data.is_payment = res.data.data.isPaymentObject;
        this.data.min_payment = res.data.data.minPayment;
        this.data.day_payment = res.data.data.dayPayment;
        this.data.transport_type_id = res.data.data.transportType;

        this.place = res.data.data.fullAddress.location;
        this.Latitude = res.data.data.fullAddress.lat;
        this.Longitude = res.data.data.fullAddress.lng;
        this.videoLink = res.data.data.video;
        this.AllFeatures = res.data.data.allFeatures;


        this.AllFeatures.optional.forEach((item, index) => {
          console.log(item.isUsed)

          if (item.isUsed) {
            this.selectedOptionalNames.push(item)
          }
        })


        console.log(res.data.data);
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },


  },

  async created() {

    if (localStorage.getItem('main_type') == 'equipement') {
      this.$router.push('/home')
    }

    // Start:: Fire Methods
    this.getAllTransport();
    this.getAllCategories();
    this.GetDataToEdit();
    // End:: Fire Methods
  },
};
</script>


<style scoped lang="scss">
h3 {
  font-weight: 600;
  text-align: center;
  margin: 20px 0;
}

button.show {
  min-width: 250px;
  background: #000;
  color: #FFF;
  padding: 10px 0;
  max-width: 300px;
  margin: auto;
  border-radius: 10px;
}

.eq-img-container {
  height: 200px;
  position: relative;
}

.eq-img-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 15px;
}

.remove-eq-img {
  position: absolute;
  top: -7px;
  left: 8px;
  font-size: 20px;
  background: var(--main_theme_clr);
  color: white;
  padding: 0px 10px;
  border-radius: 50%;
}

.eq-input-img input[type="file"] {
  display: none;
}

.eq-input-img {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}

.eq-input-img label {
  font-size: 30px;
  background: var(--main_theme_clr);
  color: white;
  padding: 10px 15px;
  border-radius: 8px;
  cursor: pointer;
}
</style>