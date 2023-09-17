<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("BUTTONS.showOrder") }}</h4>
    </div>
    <!-- End:: Title -->

    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <form @submit.prevent="validateFormInputs">
        <div class="row">

          <div class="form_title_wrapper">
            <h4> {{ $t('PLACEHOLDERS.order_data') }}</h4>
          </div>

          <!-- Start:: Image Upload Input -->
          <base-image-upload-input col="12" :preSelectedImage="data.image.path" disabled
            :placeholder="$t('PLACEHOLDERS.order_service')" />
          <!-- End:: Image Upload Input -->

          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.name_requester')"
            v-model.trim="data.name_requester" disabled />

          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.order_id')" v-model.trim="data.order_id"
            disabled />
          <base-input col="6" type="text" :placeholder="$t('TABLES.Orders.orderDate')" v-model.trim="data.orderDate"
            disabled />

          <div class="row" v-if="data.service_type == 'transport'">

            <div class="form_title_wrapper">
              <h4> {{ $t('PLACEHOLDERS.service') }}</h4>
            </div>

            <base-image-upload-input col="12" identifier="image" :preSelectedImage="data.equipment_image.path"
              :placeholder="$t('PLACEHOLDERS.transport_image')" disabled />

            <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.transport_name')"
              v-model.trim="data.equipment_name" disabled />

            <base-input col="6" type="text" :placeholder="$t('TABLES.Addresses.address')" v-model.trim="data.address"
              disabled />

            <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.transport_type')"
              v-model.trim="data.transport_type" disabled />

            <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.Number_of_Returns')"
              v-model.trim="data.Number_of_Returns" disabled />


            <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.Number_Carriers')" v-model.trim="data.quantity"
              disabled />

            <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.Service_Date')" v-model.trim="data.orderDate"
              disabled />

            <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.Starting_Point')"
              v-model.trim="data.Starting_Point" disabled />

            <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.Ending_Point')"
              v-model.trim="data.Ending_Point" disabled />

            <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.Cost_Return')" v-model.trim="data.Cost_Return"
              disabled />

            <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.Cost_Kilogram')"
              v-model.trim="data.Cost_Kilogram" disabled />

          </div>

          <div class="row" v-else>

            <div class="form_title_wrapper">
              <h4> {{ $t('PLACEHOLDERS.equipment') }}</h4>
            </div>

            <base-image-upload-input col="12" identifier="image" :preSelectedImage="data.equipment_image.path"
              :placeholder="$t('PLACEHOLDERS.equipment_image')" disabled />

            <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.equipment_name')"
              v-model.trim="data.equipment_name" disabled />

            <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.quantity')" v-model.trim="data.quantity"
              disabled />

            <base-input col="6" type="text" :placeholder="$t('TABLES.Addresses.address')" v-model.trim="data.address"
              disabled />

            <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.is_transport')"
              v-model.trim="data.is_transport" disabled />

            <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.transport_type')"
              v-model.trim="data.transport_type" disabled />

            <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.location_taken')"
              v-model.trim="data.Ending_Point" disabled />

            <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.day_cost')" v-model.trim="data.day_cost"
              disabled />

          </div>



          <div class="form_title_wrapper">
            <h4> {{ $t('PLACEHOLDERS.order_time') }}</h4>
          </div>

          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.from')" v-model.trim="data.startDate" disabled />

          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.to')" v-model.trim="data.endDate" disabled />


          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.tax')" v-model.trim="data.tax" disabled />

          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.service_cost')" v-model.trim="data.service_cost"
            disabled />

          <base-input col="6" type="text" v-if="data.paymentCount > 1" :placeholder="$t('PLACEHOLDERS.first_pay')"
            v-model.trim="data.first_pay" disabled />
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.service_count')" v-model.trim="data.paymentCount"
            disabled />
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.total')" v-model.trim="data.total" disabled />

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

        // order info

        order_id: null,
        orderDate: '',
        image: {
          path: null,
          file: null,
        },
        name_requester: '',

        startDate: '',
        endDate: '',
        endAddress: '',
        tax: '',
        total: '',
        serviceCount: '',
        paymentCount: '',
        quantity: '',
        day_cost: '',
        service_cost: '',
        first_pay: '',
        address: '',
        service_type: '',
        // equipment

        equipment_image: {
          path: null,
          file: null,
        },
        equipment_name: '',
        quantity: '',
        is_transport: '',
        transport_type: '',
        location_taken: '',

        // transport

        transport_image: '',
        transport_name: '',
        transport_address: '',
        Load_Weight: '',
        Number_of_Returns: '',
        Number_Carriers: '',
        Service_Date: "",
        Starting_Point: '',
        Ending_Point: '',
        Cost_Return: '',
        Cost_Kilogram: ''

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
          url: `orders/${this.$route.params.id}`,
        });

        // order info
        console.log(res.data.data.id)

        // general
        this.data.order_id = res.data.data.id;
        this.data.orderDate = res.data.data.createdAt;
        this.data.service_type = res.data.data.service.type;
        this.data.startDate = res.data.data.startDate;
        this.data.endDate = res.data.data.endDate;
        this.data.endAddress = res.data.data.endAddress.location;
        this.data.tax = res.data.data.tax;
        this.data.total = res.data.data.total;
        this.data.paymentCount = res.data.data.paymentCount;
        this.data.service_cost = res.data.data.serviceCost;
        this.data.first_pay = res.data.data.payment;
        this.data.quantity = res.data.data.serviceCount;

        // client
        this.data.image.path = res.data.data.client.image;
        this.data.name_requester = res.data.data.client.name;

        // type

        this.data.equipment_name = res.data.data.service.name;
        this.data.equipment_image.path = res.data.data.service.image;
        this.data.day_cost = res.data.data.service.price;
        this.data.Cost_Return = res.data.data.service.priceInCity;
        this.data.Cost_Kilogram = res.data.data.service.priceOutCity;
        this.data.transport_type = res.data.data.service.transportType;
        this.data.address = res.data.data.service.address.location;

        this.data.is_transport = res.data.data.isTransport;

        this.data.Number_of_Returns = res.data.data.transportCount;
        this.data.Number_Carriers = res.data.data.isTransport;




        this.data.Starting_Point = res.data.data.startAddress.location;
        this.data.Ending_Point = res.data.data.endAddress.location;





      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },

  },

  async created() {
    // End:: Fire Methods
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