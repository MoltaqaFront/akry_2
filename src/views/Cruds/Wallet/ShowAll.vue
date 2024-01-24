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
              <base-select-input col="12" :optionsList="orderTypes" :placeholder="$t('TABLES.TABLES.type')"
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
          <h5>{{ $t("PLACEHOLDERS.wallet_history") }}</h5>

          <div class="btn_wrapper">
            <button v-if="canWithdraw" @click="clearBalance" class="btn btn-primary">{{ $t('PLACEHOLDERS.filter_request')
            }}</button>

            <h5>
              <span>{{ $t('PLACEHOLDERS.total') }} : </span>
              <span>{{ balance }}</span>
            </h5>

          </div>
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

        <template v-slot:[`item.reason`]="{ item }">
          <template>
            <h6 class="text-danger" v-if="item.reason.length === 0"> {{ $t("TABLES.noData") }} </h6>
            <div class="actions" v-else>
              <button class="btn_show" @click="showReplayModal(item.reason)">
                <i class="fal fa-eye"></i>
              </button>
            </div>
          </template>
        </template>

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

          </div>
        </template>
        <!-- End:: Actions -->

        <template v-slot:top>

          <!-- Start:: Replay Modal -->
          <description-modal v-if="dialogReplay" :modalIsOpen="dialogReplay" :modalDesc="selectedReplayTextToShow"
            @toggleModal="dialogReplay = !dialogReplay" />
          <!-- End:: Replay Modal -->

        </template>

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
  name: "AllOrders",

  computed: {
    ...mapGetters({
      getAppLocale: "AppLangModule/getAppLocale",
    }),

    orderTypes() {
      return [
        {
          id: 1,
          name: this.$t("PLACEHOLDERS.adminEdit"),
          value: "adminEdit",
        },
        {
          id: 2,
          name: this.$t("PLACEHOLDERS.newOrder"),
          value: "newOrder",
        },
        {
          id: 3,
          name: this.$t("PLACEHOLDERS.cancelledOrder"),
          value: "cancelledOrder",
        },
        {
          id: 4,
          name: this.$t("PLACEHOLDERS.withdrawAccept"),
          value: "withdrawAccept",
        },
        {
          id: 5,
          name: this.$t("PLACEHOLDERS.pending"),
          value: "pending",
        },
        {
          id: 6,
          name: this.$t("STATUS.accepted"),
          value: "accepted",
        },
        {
          id: 7,
          name: this.$t("PLACEHOLDERS.declined"),
          value: "declined",
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
          value: "uuid",
          sortable: false,
          align: "center",
        },
        {
          text: this.$t("TABLES.TABLES.type"),
          value: "type",
          sortable: false,
          align: "center",
        },
        {
          text: this.$t("PLACEHOLDERS.balance"),
          value: "balance",
          sortable: false,
          align: "center",
        },
        {
          text: this.$t("PLACEHOLDERS.reason"),
          value: "reason",
          sortable: false,
          align: "center",
        },
        {
          text: this.$t("TABLES.Products.created_at"),
          value: "cretedAt",
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

      // Start:: Page Permissions
      permissions: null,
      // Start:: Page Permissions

      // Start:: Dialogs Control Data
      dialogReplay: false,
      selectedReplayTextToShow: "",
      dialogSendReplay: false,
      itemToSendReplay: null,
      messageReplay: null,
      // End:: Dialogs Control Data

      canWithdraw: '',
      balance: ''

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
        await this.$router.push({ path: '/wallet/all', query: { page: 1 } });
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
          url: "wallet-records",
          params: {
            page: this.paginations.current_page,
            mine: 1,
            type: this.filterOptions.status?.value,
          },
        });
        this.loading = false;
        console.log("All Data ==>", res.data.data.records);
        this.tableRows = res.data.data.records;

        this.canWithdraw = res.data.data.canWithdraw;
        this.balance = res.data.data.balance;

        this.paginations.last_page = res.data.data.last_page;
        this.paginations.items_per_page = res.data.data.per_page;
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },

    async clearBalance() {
      this.loading = true;
      try {
        let res = await this.$axios({
          method: "GET",
          url: "wallet-withdraw",
        });
        this.loading = false;
        this.$message.success(this.$t("MESSAGES.sentSuccessfully"));
        this.setTableRows();
        this.canWithdraw = false;
      } catch (error) {
        this.isWaitingRequest = false;
        this.$message.error(error.response.data.message);
      }
    },
    // End:: Set Table Rows

    // ==================== Start:: Crud ====================
    // ===== Start:: Show
    showItem(item) {
      this.$router.push({ path: `/wallet/show/${item.uuid}` });
    },
    // ===== End:: Show

    // Start:: Control Modals
    showReplayModal(replay) {
      this.dialogReplay = true;
      this.selectedReplayTextToShow = replay;
    },
    // End:: Control Modals

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

<style lang="scss" scoped>
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

.title_text_wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  h5 {
    font-weight: bold;
  }

  .btn_wrapper {
    display: flex;
    flex-direction: column-reverse;
    gap: 10px;
    align-items: center;


    button {
      min-width: 160px;
      background: #627950;
      border: 1px solid transparent;
      padding: 12px;
      font-weight: bold;

      &:hover {
        background: #FFF;
        color: var(--main_theme_clr);
        border: 1px solid var(--main_theme_clr) !important
      }
    }
  }

}
</style>