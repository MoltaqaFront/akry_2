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

          <a-sub-menu v-for="item in filteredList" :key="item.key" :data-type="!item.children ? 'single_route' : ''">

            <template v-if="item.children">
              <!-- ========= Start:: Main Tab -->
              <span slot="title">
                <img :src="item.icon" alt="icon" width="35" height="35" />
                <span> {{ item.title }} </span>
              </span>

              <!-- ========= Start:: Nested Tabs -->
              <a-menu-item v-for="childItem in item.children" :key="childItem.key">
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

    filteredList() {
      const selectedType = localStorage.getItem('main_type');
      const otherRoutes = this.sideNavbarList.filter(item => item.key !== 'Equipments' && item.key !== 'transport');

      // Create a function to recursively flatten the menu items
      function flattenMenuItems(items) {
        let flattened = [];
        items.forEach(item => {
          flattened.push(item);
          if (item.children) {
            flattened = flattened.concat(flattenMenuItems(item.children));
          }
        });
        return flattened;
      }

      if (selectedType === 'equipement') {
        // Include Equipments and their children
        return flattenMenuItems([
          ...this.sideNavbarList.filter(item => item.key === 'Equipments'),
          ...otherRoutes,
        ]);
      } else if (selectedType === 'transport') {
        // Include Transport and their children
        return flattenMenuItems([
          ...this.sideNavbarList.filter(item => item.key === 'transport'),
          ...otherRoutes,
        ]);
      } else {
        // Handle other cases where selectedType is neither 'equipment' nor 'transport'
        return otherRoutes; // Only include other routes
      }
    }


  },

  data() {
    return {
      // Start:: Controle Open Tabs Data
      openKeys: [],
      // End:: Controle Open Tabs Data

      // Start:: Side Navbar List
      sideNavbarList: [
        {
          key: "Equipments",
          title: this.$t("PLACEHOLDERS.el_equipments"),
          icon: require("@/assets/media/icons/ui_icons/product.svg"),
          route: "/Equipments/all",
        },
        {
          key: "transport",
          title: this.$t("PLACEHOLDERS.transport"),
          icon: require("@/assets/media/icons/ui_icons/car.svg"),
          route: "/transport/all",
        },
        {
          key: "orders",
          title: this.$t("TITLES.orders"),
          icon: require("@/assets/media/icons/ui_icons/booking.svg"),
          route: "/orders/all",
        },
        {
          key: "chat",
          title: this.$t("PLACEHOLDERS.chat"),
          icon: require("@/assets/media/icons/ui_icons/messages.svg"),
          route: "/chat/all",
        },
        {
          key: "wallet",
          title: this.$t("PLACEHOLDERS.wallet"),
          icon: require("@/assets/media/icons/ui_icons/service.svg"),
          route: "/wallet/all",
        },
        {
          key: "about",
          title: this.$t("PLACEHOLDERS.about"),
          icon: require("@/assets/media/icons/ui_icons/users.svg"),
          route: "/about",
        },
        {
          key: "terms",
          title: this.$t("PLACEHOLDERS.terms"),
          icon: require("@/assets/media/icons/ui_icons/flag.svg"),
          route: "/terms",
          // hasPermission: false,
        },
        {
          key: "privacy",
          title: this.$t("PLACEHOLDERS.privacy"),
          icon: require("@/assets/media/icons/ui_icons/cycle_arrows.svg"),
          route: "/privacy",
          // hasPermission: false,
        },
        {
          key: "faq",
          title: this.$t("PLACEHOLDERS.faq"),
          icon: require("@/assets/media/icons/ui_icons/service_type.svg"),
          route: "/faq",
          // hasPermission: false,
        },
        {
          key: "contact",
          title: this.$t("PLACEHOLDERS.contact_us"),
          icon: require("@/assets/media/icons/ui_icons/messages.svg"),
          route: "/contact/create",
          // hasPermission: false,
        },
        // {
        //   key: "appContent",
        //   title: this.$t("SIDENAV.AppContent.title"),
        //   icon: require("@/assets/media/icons/ui_icons/book_mark.svg"),
        //   children: [
        //     {
        //       key: "about",
        //       title: this.$t("PLACEHOLDERS.about"),
        //       icon: require("@/assets/media/icons/ui_icons/users.svg"),
        //       route: "/about",
        //     },
        //     {
        //       key: "terms",
        //       title: this.$t("PLACEHOLDERS.terms"),
        //       icon: require("@/assets/media/icons/ui_icons/flag.svg"),
        //       route: "/terms",
        //       // hasPermission: false,
        //     },
        //     {
        //       key: "privacy",
        //       title: this.$t("PLACEHOLDERS.privacy"),
        //       icon: require("@/assets/media/icons/ui_icons/cycle_arrows.svg"),
        //       route: "/privacy",
        //       // hasPermission: false,
        //     },
        //     {
        //       key: "faq",
        //       title: this.$t("PLACEHOLDERS.faq"),
        //       icon: require("@/assets/media/icons/ui_icons/service_type.svg"),
        //       route: "/faq",
        //       // hasPermission: false,
        //     },
        //     {
        //       key: "contact",
        //       title: this.$t("PLACEHOLDERS.contact_us"),
        //       icon: require("@/assets/media/icons/ui_icons/messages.svg"),
        //       route: "/contact/create",
        //       // hasPermission: false,
        //     },
        //   ],
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

    // Start:: Controle Open Tabs
    onOpenChange(openKeys) {
      const latestOpenKey = openKeys.find(
        (key) => this.openKeys.indexOf(key) === -1
      );
      if (this.extractSideNavItemsKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys;
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    },
    // End:: Controle Open Tabs

  },

  created() {
    // Start:: Fire Methods
    // End:: Fire Methods
  },
};
</script>