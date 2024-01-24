<template>
  <div class="all-con">
    <div class="p-title">
      <h3>{{ $t("PLACEHOLDERS.faq") }}</h3>
    </div>
    <div v-for="(el, index) in faq" :key="index" class="accordion accordion-flush" id="accordionFlushExample">
      <div class="accordion-item">
        <h2 class="accordion-header" id="flush-headingOne">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
            :data-bs-target="'#flush-collapseOne' + el.id" aria-expanded="false" aria-controls="flush-collapseOne">
            {{ el.question }}
          </button>
        </h2>
        <div :id="'flush-collapseOne' + el.id" class="accordion-collapse collapse" aria-labelledby="flush-headingOne"
          data-bs-parent="#accordionFlushExample">
          <div class="accordion-body">{{ el.answer }}</div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

export default {
  name: "privacy",

  computed: {
  },

  data() {
    return {
      title: '',
      content: '',

      faq: []

    }

  },

  watch: {
  },

  methods: {
    async getData() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: "faq",
        });
        console.log("All Data ==>", res.data.data.data);
        this.faq = res.data.data.data;
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
  },

  created() {
    this.getData();
  },
};
</script>
<style>
.all-con {
  text-align: center;
  padding: 30px;
}

.p-title {
  margin-bottom: 25px;
}

.p-title h3 {
  font-size: 37px;
}

.p-content p {
  font-size: 18px;
}



.accordion-item button {
  font-size: 19px;
  text-align: center;
  font-weight: 600;
}

.accordion-item {
  border: 1px solid;
}

div#accordionFlushExample {
  border: 1px solid var(--main_theme_clr);
  padding: 20px;
  margin-bottom: 25px;
  border-radius: 20px;
}

.accordion-item button {
  color: var(--main_theme_clr) !important;
}

.accordion-item h2 button {
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  text-align: start;
}

.accordion-body {
  font-size: 18px;
  text-align: start;
}

.accordion-button::after {
  position: absolute;
  left: -10px !important;
}
</style>