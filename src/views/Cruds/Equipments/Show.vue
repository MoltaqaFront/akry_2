<template>
  <div class="crud_form_wrapper single_show_content_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("TITLES.showClient", { name: data.name }) }}</h4>
    </div>
    <!-- End:: Title -->


    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <!-- ==== Start:: Status Badges ==== -->
      <div class="badges_wrapper justify-content-between">
        <div class="wrapper">
          <v-chip color="amber darken-2" text-color="white">
            {{ $t("TITLES.numberOfVisits", { number: data.numberOfVisits }) }}
          </v-chip>
          <v-chip color="amber darken-2" text-color="white">
            {{ $t("TITLES.lastVisit", { date: data.lastVisit }) }}
          </v-chip>
        </div>

        <v-chip :color="data.active ? 'green' : 'red'" text-color="white">
          {{ data.active ? $t("STATUS.active") : $t("STATUS.notActive") }}
        </v-chip>
      </div>
      <!-- ==== End:: Status Badges ==== -->

      <!-- ==== Start:: Client Main Data ==== -->
      <form>
        <div class="row">
          <!-- Start:: Image Upload Input -->
          <base-image-upload-input col="12" identifier="client_image" :placeholder="$t('PLACEHOLDERS.personalImage')"
            :preSelectedImage="data.image" disabled class="disabled_input" />
          <!-- End:: Image Upload Input -->

          <!-- Start:: Ar Name Input -->
          <base-input col="4" type="text" :placeholder="$t('PLACEHOLDERS.name')" v-model.trim="data.name" disabled class="disabled_input" />
          <!-- End:: Ar Name Input -->

          <!-- Start:: Phone Input -->
          <base-input col="4" type="tel" :placeholder="$t('PLACEHOLDERS.phone')" v-model.trim="data.phone" readonly class="disabled_input" />
          <!-- End:: Phone Input -->

          <!-- Start:: Second Phone Input -->
          <base-input col="4" type="tel" :placeholder="$t('PLACEHOLDERS.secondPhone')" v-model.trim="data.secondPhone"
            readonly class="disabled_input" />
          <!-- End:: Second Phone Input -->

          <!-- Start:: Email Input -->
          <base-input col="6" type="email" :placeholder="$t('PLACEHOLDERS.email')" v-model.trim="data.email" readonly class="disabled_input" />
          <!-- End:: Email Input -->

          <!-- Start:: Joining Date Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.joiningDate')" v-model.trim="data.joiningDate"
            readonly class="disabled_input" />
          <!-- End:: Joining Date Input -->
        </div>
      </form>
      <!-- ==== End:: Client Main Data ==== -->

      <!-- ==== Start:: Client Addresses ==== -->
      <div class="table_content">
        <h6 class="table_title mt-5 mb-4"> {{ $t("TITLES.clientAddresses") }} </h6>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-center" v-for="item in addressesTableHeaders" :key="item">
                  {{ item.text }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="text-center text-danger" v-if="data.addresses.length === 0">
                <td colspan="7">
                  {{ $t("TABLES.noData") }}
                </td>
              </tr>
              <template v-else>
                <tr class="text-center" v-for="item in data.addresses" :key="item.id">
                  <td>{{ item.id }}</td>
                  <td>{{ item.full_address }}</td>
                  <td>{{ item.latitude }}</td>
                  <td>{{ item.longitude }}</td>
                  <td>
                    <v-chip color="light-blue darken-3" text-color="white">
                      {{ item.address_type }}
                    </v-chip>
                  </td>
                  <td>
                    <i class="fal fa-check fa-lg text-success" v-if="item.is_default"></i>
                    <i class="fal fa-times fa-lg text-danger" v-else></i>
                  </td>
                </tr>
              </template>
            </tbody>
          </template>
        </v-simple-table>
      </div>
      <!-- ==== End:: Client Addresses ==== -->
    </div>
    <!-- End:: Single Step Form Content -->
  </div>
</template>

<script>
export default {
  name: "SingleClient",

  props: {
    id: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      // Start:: Loading Data
      isWaitingRequest: false,
      // End:: Loading Data

      // Start:: Table Data
      addressesTableHeaders: [
        { text: this.$t("TABLES.Addresses.serialNumber") },
        { text: this.$t("TABLES.Addresses.address") },
        { text: this.$t("TABLES.Addresses.longitude") },
        { text: this.$t("TABLES.Addresses.latitude") },
        { text: this.$t("TABLES.Addresses.type") },
        { text: this.$t("TABLES.Addresses.isDefault") },
      ],
      // End:: Table Data

      // Start:: Data
      data: {
        image: null,
        name: null,
        phone: null,
        secondPhone: null,
        email: null,
        joiningDate: null,
        currentPackage: null,
        addresses: [],
        active: false,
      },
      // End:: Data
    };
  },

  methods: {
    // Start:: Get Data To Show
    async getDataToShow() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `admin/clients/${this.id}`,
        });
        // console.log("DATA =>", res.data.data);
        this.data.image = res.data.body.user.avatar;
        this.data.name = res.data.body.user.name;
        this.data.phone = res.data.body.user.phone;
        this.data.secondPhone = res.data.body.user.second_phone;
        this.data.email = res.data.body.user.email;
        this.data.joiningDate = res.data.body.user.created_at;
        this.data.addresses = res.data.body.user.addresses;
        this.data.currentPackage = res.data.body.user.current_package;
        this.data.numberOfVisits = res.data.body.user.number_of_visits;
        this.data.lastVisit = res.data.body.user.last_visit;
        this.data.active = res.data.body.user.is_active;
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
    // End:: Get Data To Show
  },

  created() {
    // Start:: Fire Methods
    this.getDataToShow();
    // End:: Fire Methods
  },
};
</script>
