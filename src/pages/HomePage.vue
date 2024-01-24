<template>
  <div class="home_page_wrapper">
    <!-- <ComingSoon /> -->

    <div class="statics mt-4">
      <div class="row">
        <div class="col-lg-4 col-md-6 col-12" v-for="(value, key) in statics" :key="'i' + key">
          <div class="box">
            <div class="icon">
              <i v-if="key === 'users'" class="fas fa-user-tie"></i>
              <i v-else-if="key === 'orders'" class="fas fa-car-alt"></i>
              <i v-else-if="key === 'finishedOrders'" class="fas fa-users"></i>
              <i v-else-if="key === 'newOrders'" class="fas fa-ticket-alt"></i>
              <i v-else-if="key === 'activeOrders'" class="fas fa-concierge-bell"></i>
              <i v-else-if="key === 'cancelledOrders'" class="fab fa-product-hunt"></i>
              <i v-else-if="key === 'totalIncome'" class="fas fa-newspaper"></i>
              <i v-else-if="key === 'todayIncome'" class="fas fa-thumbs-up"></i>
              <i v-else-if="key === 'realIncome'" class="fas fa-baby-carriage"></i>
              <i v-else-if="key === 'services'" class="fas fa-chalkboard-teacher"></i>
              <i v-else-if="key === 'totalWithdraws'" class="fas fa-clipboard-check"></i>
              <i v-else class="fas fa-chart-line"></i>
            </div>
            <div class="info_box">
              <span v-if="key == 'users'">{{ $t('PLACEHOLDERS.users') }}</span>
              <span v-else-if="key === 'orders'">{{ $t('PLACEHOLDERS.orders') }}</span>
              <span v-else-if="key === 'finishedOrders'">{{ $t('PLACEHOLDERS.finishedOrders') }}</span>
              <span v-else-if="key === 'newOrders'">{{ $t('PLACEHOLDERS.newOrders') }}</span>
              <span v-else-if="key === 'activeOrders'">{{ $t('PLACEHOLDERS.activeOrders') }}</span>
              <span v-else-if="key === 'cancelledOrders'">{{ $t('PLACEHOLDERS.cancelledOrders') }}</span>
              <span v-else-if="key === 'totalIncome'">{{ $t('PLACEHOLDERS.totalIncome') }}</span>
              <span v-else-if="key === 'todayIncome'">{{ $t('PLACEHOLDERS.todayIncome') }}</span>
              <span v-else-if="key === 'realIncome'">{{ $t('PLACEHOLDERS.realIncome') }}</span>
              <span v-else-if="key === 'services'">{{ $t('PLACEHOLDERS.services') }}</span>
              <span v-else-if="key === 'totalWithdraws'">{{ $t('PLACEHOLDERS.totalWithdraws') }}</span>
              <p class="number_box">{{ value }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ComingSoon from "@/components/ui/ComingSoon.vue";

export default {
  name: "HomePage",

  components: {
    ComingSoon
  },

  data() {
    return {

      statics: []
    };
  },

  methods: {

    async getStatics() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: "statistics"
        });

        // console.log("All Data ==>", res.data.data);
        this.statics = res.data.data;
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
    // End:: Set Table Rows


  },

  mounted() {

    this.getStatics()

  },
};
</script>

<style lang="scss" scoped>
.home_page_wrapper {
  position: relative;

  min-height: 500px;
  padding: 0 10px;
  overflow-y: auto;
  overflow-x: hidden;

  .statics {
    .box {
      background: #627950;
      padding: 25px;
      margin-bottom: 10px;
      border-radius: 5px;
      overflow: hidden;
      display: flex;
      justify-content: space-between;

      cursor: pointer;
      transition: all 0.5s;

      &:hover {
        background: #fff;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

        .icon {
          background: #627950;
          color: #FFF
        }

        .info_box {

          span,
          p.number_box {
            color: #000
          }
        }
      }

      .icon {
        height: 60px;
        min-width: 60px;
        width: 60px;
        border-radius: 60px;
        background: #FFF;
        display: flex;
        align-items: center;
        justify-content: center;

        i {
          font-size: 25px
        }
      }

      .info_box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-end;

        span {
          font-size: 19px;
          color: #FFF;
        }

        p.number_box {
          font-size: 30px;
          color: #FFF;
          font-weight: bold;
        }
      }
    }
  }
}
</style>