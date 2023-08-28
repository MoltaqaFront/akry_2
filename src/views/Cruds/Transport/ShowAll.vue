<template>
  <div class="show_all_content_wrapper">
    <!-- Start:: Main Section -->
    <main>
      <!--  =========== Start:: Filter Form =========== -->
      <div class="filter_content_wrapper" :class="{ active: filterFormIsActive }">
        <button class="filter_toggler" @click="filterFormIsActive = !filterFormIsActive">
          <i class="fal fa-times"></i>
        </button>
        <div class="filter_title_wrapper">
          <h5>{{ $t("TITLES.searchBy") }}</h5>
        </div>
        <div class="filter_form_wrapper">
          <form @submit.prevent="submitFilterForm">
            <div class="row justify-content-center align-items-center w-100">
              <!-- Start:: Name Input -->
              <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.name')" v-model.trim="filterOptions.name" />
              <!-- End:: Name Input -->

              <!-- Start:: Status Input -->
              <base-select-input col="6" :optionsList="activeStatuses" :placeholder="$t('PLACEHOLDERS.status')"
                v-model="filterOptions.isActive" />
              <!-- End:: Status Input -->
            </div>

            <div class="btns_wrapper">

              <a-tooltip placement="bottom">
                <template slot="title">
                  <span>{{ $t("BUTTONS.search") }}</span>
                </template>
                <span class="submit_btn" @click="submitFilterForm" :disabled="isWaitingRequest">
                  <i class="fal fa-search"></i>
                </span>
              </a-tooltip>

              <a-tooltip placement="bottom">
                <template slot="title">
                  <span>{{ $t("BUTTONS.rseet_search") }}</span>
                </template>
                <span class="reset_btn" :disabled="isWaitingRequest" @click="resetFilter">
                  <i class="fal fa-redo"></i>
                </span>
              </a-tooltip>

            </div>
          </form>
        </div>
      </div>
      <!--  =========== End:: Filter Form =========== -->

      <!--  =========== Start:: Table Title =========== -->
      <div class="table_title_wrapper">
        <div class="title_text_wrapper">
          <h5>{{ $t("PLACEHOLDERS.el_equipments") }}</h5>
          <button v-if="!filterFormIsActive" class="filter_toggler"
            @click.stop="filterFormIsActive = !filterFormIsActive">
            <i class="fal fa-search"></i>
          </button>
        </div>

        <div class="title_route_wrapper">
          <router-link to="/transport/create">
            {{ $t("PLACEHOLDERS.add_equipment") }}
          </router-link>
        </div>
      </div>
      <!--  =========== End:: Table Title =========== -->

      <!--  =========== Start:: Data Table =========== -->
      <v-data-table class="thumb" :loading="loading" :loading-text="$t('TABLES.loadingData')" :search="searchValue"
        :headers="tableHeaders" :items="tableRows" item-class="ltr" :items-per-page="paginations.items_per_page"
        hide-default-footer>
        <!-- Start:: No Data State -->
        <template v-slot:no-data>
          {{ $t("TABLES.noData") }}
        </template>
        <!-- Start:: No Data State -->

        <template v-slot:[`item.id`]="{ item, index }">
          <h6 class="text-danger" v-if="!item.id"> {{ $t("TABLES.noData") }} </h6>
          <h6 v-else> {{ index + 1 }} </h6>
        </template>

        <!-- Start:: Item Image -->
        <template v-slot:[`item.image`]="{ item }">
          <div class="table_image_wrapper">
            <h6 class="text-danger" v-if="!item.image"> {{ $t("TABLES.noData") }} </h6>

            <button class="my-1" @click="showImageModal(item.image)" v-else>
              <img class="rounded" :src="item.image" :alt="item.name" width="60" height="60" />
            </button>
          </div>
        </template>
        <!-- End:: Item Image -->

        <!-- Start:: Name -->
        <template v-slot:[`item.name`]="{ item }">
          <h6 class="text-danger" v-if="!item.name"> {{ $t("TABLES.noData") }} </h6>
          <h6 v-else> {{ item.name }} </h6>
        </template>
        <!-- End:: Name -->

        <!-- Start:: isTransport -->
        <template v-slot:[`item.isTransport`]="{ item }">
          <h6 class="text-danger" v-if="!item.isTransport"> {{ $t("PLACEHOLDERS.no") }} </h6>
          <h6 v-else> {{ item.isTransport ? $t("PLACEHOLDERS.yes") : $t("PLACEHOLDERS.no") }} </h6>
        </template>
        <!-- End:: isTransport -->

        <!-- Start:: Actions -->
        <template v-slot:[`item.actions`]="{ item }">
          <div class="actions">
            <a-tooltip placement="bottom">
              <template slot="title">
                <span>{{ $t("BUTTONS.show") }}</span>
              </template>
              <button class="btn_show" @click="showItem(item)">
                <i class="fal fa-eye"></i>
              </button>
            </a-tooltip>

            <a-tooltip placement="bottom">
              <template slot="title">
                <span>{{ $t("BUTTONS.delete") }}</span>
              </template>
              <button class="btn_delete" @click="selectDeleteItem(item)">
                <i class="fal fa-trash-alt"></i>
              </button>
            </a-tooltip>

          </div>
        </template>

        <template v-slot:top>

          <!-- Start:: Image Modal -->
          <image-modal v-if="dialogImage" :modalIsOpen="dialogImage" :modalImage="selectedItemImage"
            @toggleModal="dialogImage = !dialogImage" />
          <!-- End:: Image Modal -->


          <!-- Start:: Delete Modal -->
          <v-dialog v-model="dialogDelete">
            <v-card>
              <v-card-title class="text-h5 justify-center" v-if="itemToDelete">
                {{ $t("TITLES.DeleteConfirmingMessage", { name: itemToDelete.name }) }}
              </v-card-title>
              <v-card-actions>
                <v-btn class="modal_confirm_btn" @click="confirmDeleteItem">{{
                  $t("BUTTONS.ok")
                }}</v-btn>

                <v-btn class="modal_cancel_btn" @click="dialogDelete = false">{{ $t("BUTTONS.cancel") }}</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- End:: Delete Modal -->

        </template>


        <!-- End:: Actions -->
      </v-data-table>
      <!--  =========== End:: Data Table =========== -->
    </main>
    <!-- End:: Main Section -->

    <!-- Start:: Pagination -->
    <template>
      <div class="pagination_container text-center mt-3 mb-0">
        <v-pagination class="py-0" square v-model="paginations.current_page" :length="paginations.last_page"
          :total-visible="6" @input="updateRouterQueryParam($event)" :prev-icon="getAppLocale == 'ar' ? 'fal fa-angle-right' : 'fal fa-angle-left'
            " :next-icon="getAppLocale == 'ar' ? 'fal fa-angle-left' : 'fal fa-angle-right'
    " />
      </div>
    </template>
    <!-- End:: Pagination -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "AllClients",

  computed: {
    ...mapGetters({
      getAppLocale: "AppLangModule/getAppLocale",
    }),

    activeStatuses() {
      return [
        {
          id: 1,
          name: this.$t("STATUS.isAvailable"),
          value: 1,
        },
        {
          id: 2,
          name: this.$t("STATUS.is_not_Available"),
          value: 0,
        },
        {
          id: 3,
          name: this.$t("STATUS.all"),
          value: null,
        },
      ];
    },
  },

  data() {
    return {
      // Start:: Loading Data
      loading: false,
      isWaitingRequest: false,
      // End:: Loading Data

      // Start:: Filter Data
      filterFormIsActive: false,
      filterOptions: {
        name: null,
        isActive: null,
      },
      // End:: Filter Data

      // Start:: Table Data
      searchValue: "",
      tableHeaders: [
        {
          text: this.$t("TABLES.Clients.serialNumber"),
          value: "id",
          align: "center",
          width: "80",
          sortable: false,
        },
        {
          text: this.$t("PLACEHOLDERS.equipment_image"),
          value: "image",
          align: "center",
          // width: "80",
          sortable: false,
        },
        {
          text: this.$t("PLACEHOLDERS.equipment_name"),
          value: "name",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("PLACEHOLDERS.is_transport"),
          value: "isTransport",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("PLACEHOLDERS.transportType"),
          value: "transportType.name",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("PLACEHOLDERS.Available_number"),
          value: "availableNumber",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("PLACEHOLDERS.equipment_cost"),
          value: "price",
          align: "center",
          width: "120",
          sortable: false,
        },
        {
          text: this.$t("TABLES.Clients.actions"),
          value: "actions",
          sortable: false,
          align: "center",
        },
      ],
      tableRows: [],
      // End:: Table Data

      dialogImage: false,
      dialogDelete: false,
      itemToDelete: null,

      // Start:: Pagination Data
      paginations: {
        current_page: 1,
        last_page: 1,
        items_per_page: 6,
      },
      // End:: Pagination Data

      // Start:: Page Permissions
      permissions: null,
      // Start:: Page Permissions
    };
  },

  watch: {
    // Start:: Page Query Param Watcher To Get Page Data Based On It's Change
    ["$route.query.page"]() {
      this.paginations.current_page = +this.$route.query.page;
      this.setTableRows();
    },
    // End:: Page Query Param Watcher To Get Page Data Based On It's Change
  },

  methods: {
    // Start:: Handel Filter
    async submitFilterForm() {
      if (this.$route.query.page !== '1') {
        await this.$router.push({ path: '/transport/all', query: { page: 1 } });
      }
      this.setTableRows();
    },
    async resetFilter() {
      this.filterOptions.name = null;
      this.filterOptions.isActive = null;
      if (this.$route.query.page !== '1') {
        await this.$router.push({ path: '/transport/all', query: { page: 1 } });
      }
      this.setTableRows();
    },
    // End:: Handel Filter

    // Start:: Set Table Rows
    updateRouterQueryParam(pagenationValue) {
      this.$router.push({
        query: {
          ...this.$route.query,
          page: pagenationValue,
        },
      });

      // Scroll To Screen's Top After Get Products
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    },
    async setTableRows() {
      this.loading = true;
      try {

        let res = await this.$axios({
          method: "GET",
          url: "transports",
          params: {
            page: this.paginations.current_page,
            mine: 1,
            search: this.filterOptions.name,
            isAvailable: this.filterOptions.isActive?.value
          },
        });
        this.loading = false;
        // console.log("All Data ==>", res.data.data.data);
        this.tableRows = res.data.data.data;
        this.paginations.last_page = res.data.data.last_page;
        this.paginations.items_per_page = res.data.data.per_page;
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
    // End:: Set Table Rows

    // ==================== Start:: Crud ====================
    // ===== Start:: Show
    showItem(item) {
      this.$router.push({ path: `/transport/show/${item.id}` });
    },
    // ===== End:: Show


    // Start:: Control Modals
    showImageModal(image) {
      this.dialogImage = true;
      this.selectedItemImage = image;
    },
    // Start:: Control Modals

    // ===== Start:: Delete
    selectDeleteItem(item) {
      this.dialogDelete = true;
      this.itemToDelete = item;
    },
    async confirmDeleteItem() {
      try {
        await this.$axios({
          method: "DELETE",
          url: `transports/${this.itemToDelete.id}`
        });
        this.dialogDelete = false;
        this.tableRows = this.tableRows.filter((item) => {
          return item.id != this.itemToDelete.id;
        });
        this.setTableRows();
        this.$message.success(this.$t("MESSAGES.deletedSuccessfully"));
      } catch (error) {
        this.dialogDelete = false;
        this.$message.error(error.response.data.message);
      }
    },
    // ===== End:: Delete

    // ==================== End:: Crud ====================
  },

  created() {
    // Start:: Fire Methods
    window.addEventListener("click", () => {
      this.filterFormIsActive = false;
    });
    if (this.$route.query.page) {
      this.paginations.current_page = +this.$route.query.page;
    }
    this.setTableRows();
    // End:: Fire Methods
  },
};
</script>
<style>
span.submit_btn {
  width: 45px;
  height: 45px;
  font-size: 16px;
  border-radius: 10px;
  color: var(--white_clr);
  transition: all 0.3s linear;
  background-color: #ACC29A;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>