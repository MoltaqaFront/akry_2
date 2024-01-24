<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("PLACEHOLDERS.show_wallet_history") }}</h4>
    </div>
    <!-- End:: Title -->

    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <form @submit.prevent="validateFormInputs">
        <div class="row">

          <base-input col="6" type="text" :placeholder="$t('TABLES.Orders.orderNumber')" v-model.trim="data.orderNumber"
            disabled />

          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.operation_name')" v-model.trim="data.type"
            disabled />

          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.moving_balance')"
            v-model.trim="data.Current_balance" disabled />

          <base-input col="6" type="text" :placeholder="$t('TABLES.Products.created_at')" v-model.trim="data.created_at"
            disabled />

        </div>
      </form>
    </div>
    <!-- END:: Single Step Form Content -->
  </div>
</template>

<script>
export default {
  name: "CreateProduct",

  data() {
    return {

      // Start:: Loader Control Data
      isWaitingRequest: false,
      // End:: Loader Control Data

      // Start:: Data Collection To Send

      data: {

        orderNumber: '',
        type: '',
        Current_balance: '',
        created_at: ''

      },


    };
  },

  computed: {
  },

  methods: {

    async getDataToEdit() {
      this.loading = true;
      try {
        let res = await this.$axios({
          method: "GET",
          url: `wallet-records/${this.$route.params.id}`,
        });

        // wallet  info

        this.data.orderNumber = res.data.data.uuid;
        this.data.type = res.data.data.type;
        this.data.Current_balance = res.data.data.balance;
        this.data.created_at = res.data.data.cretedAt;

      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },

  },

  async created() {
    this.getDataToEdit()
  },
};
</script>

<style lang="scss" scoped>
.add_parent {
  text-align: center;

  i {
    font-size: 25px;
    cursor: pointer;

    color: #4CAF50
  }
}

.remove_minus {
  text-align: center;

  i {
    font-size: 25px;
    color: red;
    cursor: pointer;
  }
}

.remove_minus_parent {
  i {
    font-size: 25px;
    color: red;
    cursor: pointer;
  }
}
</style>