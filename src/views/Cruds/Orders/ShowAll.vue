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

              <!-- Start:: Status Input -->
              <base-select-input col="12" :optionsList="orderTypes" :placeholder="$t('PLACEHOLDERS.status')"
                v-model="filterOptions.status" />
              <!-- End:: Status Input -->

            </div>

            <div class="btns_wrapper">
              <button class="submit_btn" :disabled="isWaitingRequest">
                <i class="fal fa-search"></i>
              </button>
              <button class="reset_btn" type="button" :disabled="isWaitingRequest" @click="resetFilter">
                <i class="fal fa-redo"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
      <!--  =========== End:: Filter Form =========== -->

      <!--  =========== Start:: Table Title =========== -->
      <div class="table_title_wrapper">
        <div class="title_text_wrapper">
          <h5>{{ $t("TITLES.orders") }}</h5>

          <button v-if="!filterFormIsActive" class="filter_toggler"
            @click.stop="filterFormIsActive = !filterFormIsActive">
            <i class="fal fa-search"></i>
          </button>
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


        <!-- <template v-slot:[`item.store`]="{ item }">
          <p class="blue-grey--text text--darken-1 fs-3" v-if="!item.store">-</p>
          <p v-else>{{ item.store.title }}</p>
        </template> -->

        <!-- Start:: Actions -->
        <template v-slot:[`item.actions`]="{ item }">
          <div class="actions">

            <a-tooltip placement="bottom" v-if="item.status !== 'finished'">
              <template slot="title">
                <span>{{ $t("PLACEHOLDERS.show_chat") }}</span>
              </template>
              <button class="btn_show" @click="showChat(item)">
                <i class="fab fa-rocketchat"></i>
              </button>
            </a-tooltip>


            <a-tooltip placement="bottom">
              <template slot="title">
                <span>{{ $t("BUTTONS.show") }}</span>
              </template>
              <button class="btn_show" @click="showItem(item)">
                <i class="fal fa-eye"></i>
              </button>
            </a-tooltip>

            <div v-if="item.providerState == 1">
              <a-tooltip placement="bottom" v-if="item.status == 'pending'">
                <template slot="title">
                  <span>{{ $t("BUTTONS.wait") }}</span>
                </template>
                <button class="btn_edit">
                  <i class="fas fa-hourglass-half"></i>
                </button>
              </a-tooltip>
            </div>

            <div v-else>
              <a-tooltip placement="bottom" v-if="item.status == 'pending'">
                <template slot="title">
                  <span>{{ $t("BUTTONS.accept") }}</span>
                </template>
                <button class="btn_activate" @click="acceptOrder(item)">
                  <i class="far fa-check"></i>
                </button>
              </a-tooltip>

              <a-tooltip placement="bottom" v-if="item.status == 'pending'">
                <template slot="title">
                  <span>{{ $t("BUTTONS.reject") }}</span>
                </template>
                <button class="btn_deactivate" @click="selectDeleteItem(item)">
                  <i class="fad fa-times-circle"></i>
                </button>
              </a-tooltip>
            </div>

            <!-- <a-tooltip placement="bottom">
              <template slot="title">
                <span>{{ $t("BUTTONS.download_invoice") }}</span>
              </template>

              <button class="btn_show" @click="downloadPdf(item)">
                <i class="fal fa-download"></i>
              </button>
            </a-tooltip> -->

          </div>
        </template>
        <!-- End:: Actions -->

        <!-- ======================== Start:: Dialogs ======================== -->
        <template v-slot:top>
          <v-dialog v-model="dialogDelete">
            <v-card>
              <v-card-title class="text-h5 justify-center w-100" v-if="itemToDelete">
                {{ $t("PLACEHOLDERS.reject_order", { name: itemToDelete.id }) }}


                <div class="filter_form_wrapper w-100">
                  <form class="w-100">

                    <div class="form-group">
                      <base-input col="12" rows="3" type="textarea" :placeholder="$t('PLACEHOLDERS.reason')"
                        v-model="reason" required />
                    </div>

                  </form>
                </div>


              </v-card-title>
              <v-card-actions>
                <v-btn class="modal_confirm_btn" @click="confirmChangeStatus" :disabled="!reason">{{
                  $t("BUTTONS.ok")
                }}</v-btn>

                <v-btn class="modal_cancel_btn" @click="dialogDelete = false">{{ $t("BUTTONS.cancel") }}</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>
        <!-- ======================== End:: Dialogs ======================== -->
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
import VueHtml2pdf from 'vue-html2pdf';
import { mapGetters } from "vuex";

export default {
  name: "AllOrders",

  components: {
    VueHtml2pdf
  },

  computed: {
    ...mapGetters({
      getAppLocale: "AppLangModule/getAppLocale",
    }),

    orderTypes() {
      return [
        {
          id: 1,
          name: this.$t("PLACEHOLDERS.pending"),
          value: "pending",
        },
        {
          id: 2,
          name: this.$t("PLACEHOLDERS.active_status"),
          value: "active",
        },
        {
          id: 3,
          name: this.$t("PLACEHOLDERS.declined"),
          value: "declined",
        },
        {
          id: 4,
          name: this.$t("PLACEHOLDERS.finished"),
          value: "finished",
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
        status: null,
      },
      // End:: Filter Data

      // Start:: Table Data
      searchValue: "",
      tableHeaders: [
        {
          text: this.$t("TABLES.Orders.orderNumber"),
          value: "id",
          sortable: false,
          align: "center",
        },
        {
          text: this.$t("PLACEHOLDERS.service_Count"),
          value: "serviceCount",
          sortable: false,
          align: "center",
        },
        {
          text: this.$t("PLACEHOLDERS.order_total"),
          value: "total",
          sortable: false,
          align: "center",
        },
        {
          text: this.$t("TABLES.Orders.orderStatus"),
          value: "status",
          sortable: false,
          align: "center",
        },
        {
          text: this.$t("TABLES.ImagesSpaces.startDate"),
          value: "startDate",
          sortable: false,
          align: "center",
        },
        {
          text: this.$t("TABLES.ImagesSpaces.endDate"),
          value: "endDate",
          sortable: false,
          align: "center",
        },
        {
          text: this.$t("TABLES.Orders.actions"),
          value: "actions",
          sortable: false,
          align: "center",
        },
      ],
      tableRows: [],
      // End:: Table Data

      // Start:: Pagination Data
      paginations: {
        current_page: 1,
        last_page: 1,
        items_per_page: 6,
      },
      // End:: Pagination Data

      // Start:: Dialogs Control Data
      dialogDelete: false,
      itemToDelete: null,
      // End:: Dialogs Control Data

      // Start:: Page Permissions
      permissions: null,
      // Start:: Page Permissions
      allStores: [],
      allStatus: [],
      allStatus_popup: [],
      allOrderTypes: [],
      AllDrivers: [],

      status_modal: null,
      reason: '',

      itemReport: [],
      itemReportUserName: null,
      itemReportClientPhone: null,
      itemReportOrderType: null,
      itemReportDriverName: null,
      itemReportTotalPrice: null,
      itemReportOrderStatus: null,
      itemReportOrderDate: null,

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
      this.setTableRows();
    },
    async resetFilter() {
      this.filterOptions.status = null;
      if (this.$route.query.page !== '1') {
        await this.$router.push({ path: '/orders/all', query: { page: 1 } });
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
          url: "orders",

          params: {
            page: this.paginations.current_page,
            mine: 1,
            status: this.filterOptions.status?.value,
          },
        });
        this.loading = false;
        console.log("All Data ==>", res.data.data.data);
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
      this.$router.push({ path: `/orders/show/${item.id}` });
    },
    showChat(item) {
      this.$router.push({ path: `/chat/show/${item.chatId}` });
    },
    // ===== End:: Show

    // ===== Start:: Edit
    editItem(item) {
      console.log(item.service_id)
      this.$router.push({
        path: `/orders/edit/${item.id}`,
        query: { service_id: `${item.service_id}` }
      });
    },
    // ===== End:: Edit

    // ===== End:: download pdf
    async DownloadInvoice(item) {

      try {
        await this.$axios({
          method: "GET",
          url: `admin/download-invoices/${item.id}`,
        });
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }

    },

    // ===== End:: download pdf
    // Start:: Handling Download Files
    async downloadPdf(item) {

      if (item && item.user) {
        if (item.user.name) {
          this.itemReportUserName = item.user.name;
        } else {
          this.itemReportUserName = "-";
        }
        if (item.user.phone) {
          this.itemReportClientPhone = item.user.phone;
        } else {
          this.itemReportClientPhone = "-";
        }
      }
      this.itemReportOrderType = item.order_type.title;
      if (item && item.driver && item.driver.name) {
        this.itemReportDriverName = item.driver.name;
      } else {
        this.itemReportDriverName = '-';
      }
      this.itemReportTotalPrice = item.total;
      this.itemReportOrderStatus = item.status;
      this.itemReportOrderDate = item.created_at;

      await this.$refs.html2Pdf.generatePdf();
      this.pdfDownloadBtnIsLoading = false;

    },
    // End:: Handling Download Files

    // ===== Start:: Delete

    selectDeleteItem(item) {
      this.dialogDelete = true;
      this.itemToDelete = item;
      // console.log(item);
    },

    async confirmChangeStatus() {
      try {
        const requestData = {
          order_id: this.itemToDelete.id
        };

        if (this.reason.trim() !== '') {
          requestData.reason = this.reason.trim();
        }
        await this.$axios({
          method: "POST",
          url: `orders-revoke`,
          data: requestData // Put the data in the 'data' property
        });

        this.dialogDelete = false;
        this.tableRows = this.tableRows.filter((item) => item.id !== this.itemToDelete.id);
        this.setTableRows();
        this.$message.success(this.$t("MESSAGES.reject_order"));
      } catch (error) {
        this.dialogDelete = false;
        this.$message.error(error.response.data.errors);
      }
    },

    async acceptOrder(item) {
      try {
        await this.$axios({
          method: "POST",
          url: `orders-accept`,
          data: { order_id: item.id } // Put the data in the 'data' property
        });
        this.setTableRows();
        this.$message.success(this.$t("MESSAGES.accept_order"));
      } catch (error) {
        this.dialogDelete = false;
        this.$message.error(error.response.data.errors);
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

<style lang="scss">
.table-striped {
  margin-top: 50px;

  tbody {

    tr {
      &:nth-child(odd) {
        background-color: #EEE !important;
      }
    }

  }
}
</style>