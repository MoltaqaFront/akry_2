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

          <div class="row jf-center">

            <div class="eq-img-container col-md-2" v-for="(image, index) in images">
              <img :src="image" />
              <!-- <button class="remove-eq-img" @click="removeImage(index)">✘</button> -->
            </div>
          </div>


          <!-- Start:: Name Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.name')" v-model.trim="data.name" disabled />
          <!-- End:: Name Input -->

          <base-input col="6" type="number" :placeholder="$t('PLACEHOLDERS.price_in_city')"
            v-model.trim="data.price_in_city" disabled />

          <base-input col="6" type="number" :placeholder="$t('PLACEHOLDERS.price_out_city')"
            v-model.trim="data.price_out_city" disabled />

          <base-select-input col="6" :optionsList="is_availableStatus" :placeholder="$t('PLACEHOLDERS.status')"
            v-model="data.is_available" disabled />

          <base-input col="6" type="number" :placeholder="$t('PLACEHOLDERS.Available_number')"
            v-model.trim="data.available_number" disabled />

          <base-select-input col="6" :optionsList="is_transportStatus" :placeholder="$t('PLACEHOLDERS.is_transport')"
            v-model="data.is_transport" disabled />

          <base-select-input col="6" :optionsList="is_paymentStatus" :placeholder="$t('PLACEHOLDERS.is_paymentStatus')"
            v-model="data.is_payment" disabled />

          <base-input col="6" type="number" v-if="data.is_payment.id == 1" :placeholder="$t('PLACEHOLDERS.min_payment')"
            v-model.trim="data.min_payment" disabled />

          <base-input col="6" type="number" v-if="data.is_payment.id == 1" :placeholder="$t('PLACEHOLDERS.day_payment')"
            v-model.trim="data.day_payment" disabled />

          <base-select-input col="6" :optionsList="allTransport" :placeholder="$t('PLACEHOLDERS.transport_type')"
            v-model="data.transport_type_id" disabled @input="getWeightsAndCategories(data.transport_type_id)" />

          <base-select-input col="6" v-if="data.transport_type_id" :optionsList="weights"
            :placeholder="$t('PLACEHOLDERS.weights')" v-model="weight_equip" disabled />

          <base-select-input col="6" v-if="data.transport_type_id" :optionsList="categories"
            :placeholder="$t('PLACEHOLDERS.Categories')" v-model="category_equip" disabled />

          <!-- render required -->

          <div class="row">

            <h3 v-if="AllFeatures.required">{{ $t('PLACEHOLDERS.required') }}</h3>

            <div class="col-lg-6 col-12" v-for="(item, index) in AllFeatures.required" :key="'c' + index">

              <div v-if="item.inputType === 'text' || item.inputType === 'longText' || item.inputType === 'number'">
                <base-input type="text" :placeholder="item.name" v-model="item.choice" disabled />
              </div>

              <div v-if="item.inputType === 'multiChoice'">
                <base-select-input :optionsList="item.choices" :placeholder="item.name" v-model="item.myChoices" disabled
                  multiple />
              </div>

              <div v-if="item.inputType === 'radio'">
                <base-select-input :optionsList="item.choices" :placeholder="item.name" v-model="item.myChoices"
                  disabled />
              </div>

            </div>

          </div>

          <!-- render required -->

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

          <video class="mt-4" width="100%" height="240" controls v-if="videoLink">
            <source :src="videoLink" type="video/mp4">
            <source :src="videoLink" type="video/ogg">
            Your browser does not support the video tag.
          </video>


          <div v-if="uploading" class="w-100">
            <progress class="w-100" :value="uploadProgress" max="100"></progress>
            <p>{{ Math.round(uploadProgress) }}% uploaded</p>
          </div>

          <base-input col="12" type="text" :placeholder="$t('TABLES.Addresses.address')" v-model.trim="place" disabled />

          <div class="row">
            <div class="col-12">
              <div class="form-group">

                <GmapMap :center="center" :zoom="7" map-type-id="terrain" style="width: 100%; height: 300px"
                  :options="mapOptions">
                  <GmapMarker :position="marker.position" :clickable="false" :draggable="false" />
                </GmapMap>

              </div>
            </div>
          </div>

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
      maxImageCount: 6,

      images: [],
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

      mapOptions: {
        zoomControl: false, // Disable the default zoom control
        disableDoubleClickZoom: true, // Disable zooming on double-click
        draggable: false, // Disable dragging the map
        clickableIcons: false, // Disable clickable icons on the map
        // More options can be added if required
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
      showOptionalFeatures: false

    };
  },

  methods: {

    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      this.selectedImages = e.target.files;
      if (!files.length) return;

      // Check if the number of selected files exceeds the maximum count
      if (this.images.length + files.length > this.maxImageCount) {
        this.$message.error(this.$t("VALIDATION.Images_Upload"));
        e.target.value = ''; // Clear the file input
        return;
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
      this.images.splice(index, 1)
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


    // End:: Select Upload Imag


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

        this.weight_equip = res.data.data.weights;
        this.category_equip = res.data.data.categories;

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

.jf-center {
  justify-content: center;
}
</style>