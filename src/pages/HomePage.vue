<template>
  <div class="home_page_wrapper">
    <ComingSoon/>
  </div>
</template>

<script>
import ComingSoon from "@/components/ui/ComingSoon.vue";


export default {
  name: "HomePage",

  components: {
    ComingSoon,
  },

  data() {
    return {
    };
  },

  methods: {
  },

  mounted() {
    // START:: FIRE METHODS
    // END:: FIRE METHODS
  },
};
</script>

<style lang="scss" scoped>
.home_page_wrapper {
  position: relative;
}
</style>