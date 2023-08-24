import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

// Start:: Importing Modules
import AppLangModule from "./modules/appLang/index.js";
import AppThemeModule from "./modules/appTheme/index.js";
import AuthenticationModule from "./modules/authentication/index.js";
import ApiGetsModule from "./modules/ApisGets/index";
// End:: Importing Modules

export default new Vuex.Store({
  modules: {
    AppLangModule,
    AppThemeModule,
    AuthenticationModule,
    ApiGetsModule,
  },

  state: {},
  mutations: {},
  actions: {},
  getters: {},
});
