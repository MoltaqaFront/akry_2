<template>
  <div class="side_nav_wrapper" :class="{ active: navIsActive }">
    <!-- Start:: Toggle Btn -->
    <button class="close_btn" @click="$emit('fireToggleNavDrawerEmit')">
      <i class="fal fa-times"></i>
    </button>
    <!-- End:: Toggle Btn -->

    <!-- Start:: Logo -->
    <div class="logo_wrapper">
      <router-link class="logo" to="/home">
        <img src="@/assets/media/logo/logo.png" alt="Logo" width="170" height="125" />
      </router-link>
    </div>
    <!-- End:: Logo -->

    <!-- Start:: Side Nav Links -->
    <div class="side_nav_links_wrapper">
      <!-- Start:: Home Route -->
      <div class="home_route" @click="$emit('fireToggleNavDrawerEmit')">
        <router-link to="/home">
          <span class="route_icon">
            <img src="@/assets/media/icons/ui_icons/home.svg" alt="icon" width="40" height="40" />
          </span>
          <span class="route_text">
            {{ $t("SIDENAV.dashboard") }}
          </span>
        </router-link>
      </div>
      <!-- End:: Home Route -->

      <!-- Start:: Side Nav Routes -->
      <div class="side_routes_wrapper">
        <!-- @openChange="onOpenChange" -->
        <a-menu style="width: 100%" mode="inline" :open-keys="openKeys">
          <!-- Start:: Side Nav Tab -->
          <a-sub-menu v-for="item in sideNavbarList" :key="item.key" :data-type="!item.children ? 'single_route' : ''">
            <template v-if="item.children">
              <!-- ========= Start:: Main Tab -->
              <span slot="title">
                <img :src="item.icon" alt="icon" width="35" height="35" />
                <span> {{ item.title }} </span>
              </span>
              <!-- ========= End:: Main Tab -->

              <!-- ========= Start:: Nested Tabs -->
              <a-menu-item v-for="childItem in item.children" :key="childItem.hey">
                <button class="text-start w-100" @click="$emit('fireToggleNavDrawerEmit')">
                  <router-link :to="childItem.route">
                    <i class="fad fa-circle"></i>
                    {{ childItem.title }}
                  </router-link>
                </button>
              </a-menu-item>
              <!-- ========= End:: Nested Tabs -->
            </template>

            <template v-else-if="!item.children">
              <!-- ========= Start:: Single Tab -->
              <button class="text-start d-flex w-100" slot="title" @click="$emit('fireToggleNavDrawerEmit')">
                <router-link :to="item.route">
                  <img :src="item.icon" alt="icon" width="35" height="35" />
                  <span> {{ item.title }} </span>
                </router-link>
              </button>
              <!-- ========= End:: Single Tab -->
            </template>
          </a-sub-menu>
          <!-- End:: Side Nav Tab -->

          <!-- Start:: Logout Tab -->
          <a-sub-menu key="logout" @titleClick="logoutConfirmationModalIsOpen = true">
            <!-- ========= Start:: Main Tab -->
            <span slot="title" class="logout_btn">
              <img src="../../assets/media/icons/ui_icons/logout.svg" alt="icon" width="35" height="35" />
              <span>
                {{ $t("SIDENAV.Logout.title") }}
              </span>
            </span>
            <!-- ========= End:: Main Tab -->
          </a-sub-menu>
          <!-- End:: Logout Tab -->
        </a-menu>
      </div>
      <!-- End:: Side Nav Routes -->

      <!-- Start:: Logout Confirmation Modal -->
      <v-dialog v-model="logoutConfirmationModalIsOpen">
        <v-card>
          <v-card-title class="text-h5 justify-center">
            {{ $t("TITLES.logoutConfirmingMessage") }}
          </v-card-title>
          <v-card-actions>
            <v-btn class="modal_confirm_btn" @click="logout">{{
              $t("BUTTONS.logout")
            }}</v-btn>

            <v-btn class="modal_cancel_btn" @click="logoutConfirmationModalIsOpen = false">{{ $t("BUTTONS.cancel")
            }}</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- End:: Logout Confirmation Modal -->
    </div>
    <!-- End:: Side Nav Links -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "SideNav",

  emits: ["fireToggleNavDrawerEmit"],

  props: {
    navIsActive: {
      type: Boolean,
      required: true,
    },
  },

  computed: {
    // Start:: Vuex Get Authenticated User Data
    ...mapGetters({
      getAuthenticatedUserData: "AuthenticationModule/getAuthenticatedUserData",
    }),
    // End:: Vuex Get Authenticated User Data

    // Start:: Extract Side Nav Keys
    extractSideNavItemsKeys() {
      let extractedKeys = [];
      this.sideNavbarList.forEach((element) => {
        extractedKeys.push(element["key"]);
      });
      return extractedKeys;
    },
    // End:: Extract Side Nav Keys
  },

  data() {
    return {
      // Start:: Controle Open Tabs Data
      openKeys: [],
      // End:: Controle Open Tabs Data

      // Start:: Side Navbar List
      sideNavbarList: [
        // {
        //   key: "clients",
        //   title: this.$t("SIDENAV.Clients.title"),
        //   icon: require("@/assets/media/icons/ui_icons/clients.svg"),
        //   route: "/clients/all",
        //   // hasPermission: false,
        // },
      ],
      // End:: Side Navbar List

      // Start:: Modal Controlling Data
      logoutConfirmationModalIsOpen: false,
      // End:: Modal Controlling Data
    };
  },

  methods: {
    // Start:: Vuex Auth Actions
    ...mapActions({
      logout: "AuthenticationModule/logout",
    }),
    // End:: Vuex Auth Actions

  },

  created() {
    // Start:: Fire Methods
    // End:: Fire Methods
  },
};
</script>
