<template>
  <div class="login_form_wrapper">
    <div class="row justify-content-center">
      <div class="col-lg-6 col-12">
        <div class="content" @click="chooseType('individual')">
          <div class="image">
            <img src="@/assets/media/logo/Individual.png" alt="individual">
          </div>
          <h3>{{ $t('PLACEHOLDERS.individual') }}</h3>
        </div>
      </div>
      <div class="col-lg-6 col-12">
        <div class="content" @click="chooseType('store')">
          <div class="image">
            <img src="@/assets/media/logo/company.png" alt="store">
          </div>
          <h3>{{ $t('PLACEHOLDERS.store') }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "LoginForm",

  computed: {
    ...mapGetters({
      getAppLocale: "AppLangModule/getAppLocale",
    }),
  },

  data() {
    return {
      type: null
    };
  },

  mounted() {

  },

  methods: {

    // Start:: Vuex Set Authenticated User Data
    ...mapActions({
      setAuthenticatedUserData: "AuthenticationModule/setAuthenticatedUserData",
    }),

    chooseType(type) {
      this.type = type
      this.setAuthenticatedUserData({
        role: type,
      });
      this.$router.replace("/login");
    }
    // End:: Vuex Set Authenticated User Data



  },


};
</script>


<style scoped lang="scss">
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: unset;
  gap: 30px;
  padding: 30px;
  cursor: pointer;
  background: #ffffff38;

  .image {
    img {
      width: 150px;
      max-height: 150px
    }
  }

}


@media(max-width:767px) {
  .content {
    background: #FFF;
  }
}
</style>
