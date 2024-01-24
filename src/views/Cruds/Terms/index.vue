<template>
  <div class="all-con">
    <div class="p-title">
      <h3>{{ title }}</h3>
    </div>
    <div class="p-content">
      <p v-html="content"></p>
    </div>

  </div>
</template>

<script>

export default {
  name: "terms",

  computed: {
  },

  data() {
    return {
      title: '',
      content: ''
    }

  },

  watch: {
  },

  methods: {
    async getData() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: "static_pages/terms",
        });
        console.log("All Data ==>", res.data.data.title);
        this.title = res.data.data.title;
        this.content = res.data.data.content;
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
</style>