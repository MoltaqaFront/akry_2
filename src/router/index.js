import Vue from "vue";
import VueRouter from "vue-router";

// Start:: Importing Middleware
import auth from "../middleware/auth.js";
// End:: Importing Middleware

// Start:: Importing Router Components
import Authentication from "../pages/Authentication.vue";
import LoginForm from "../views/Auth/LoginForm.vue";
import ChooseType from "../views/Auth/ChooseType.vue";
import OtpVerifyCode from "../views/Auth/otpVerifyCodeStatus.vue";
import ResetPasswordEmailForm from "../views/Auth/ResetPasswordEmailForm.vue";
import EmailVerificationForm from "../views/Auth/EmailVerificationForm.vue";
import ChangePhoneNumberForm from "../views/Auth/ChangePhoneNumber.vue";
import ResetPasswordForm from "../views/Auth/ResetPasswordForm.vue";
import AppContentWrapper from "../pages/AppContentWrapper.vue";

// ============== Start:: Home Page Route
import HomePage from "../pages/HomePage.vue";
// ============== End:: Home Page Route

// ============== Start:: Equipments Routes
import EquipmentsHome from "../views/Cruds/Equipments/Home.vue";
import AllEquipments from "../views/Cruds/Equipments/ShowAll.vue";
import CreateEquipments from "../views/Cruds/Equipments/Create.vue";
import EditEquipments from "../views/Cruds/Equipments/Edit.vue";
import ShowEquipments from "../views/Cruds/Equipments/Show.vue";
// ============== End:: Equipments Routes

// ============== Start:: Orders Routes
import OrdersHome from "../views/Cruds/Orders/Home.vue";
import AllOrders from "../views/Cruds/Orders/ShowAll.vue";
import ShowOrder from "../views/Cruds/Orders/Show.vue";
// ============== End:: Orders Routes

// ============== Start:: Chat Routes
import ChatHome from "../views/Cruds/Chat/Home.vue";
import AllChat from "../views/Cruds/Chat/ShowAll.vue";
import ShowChat from "../views/Cruds/Chat/Show.vue";
// ============== End:: Chat Routes

// ============== Start:: Wallet Routes
import WalletHome from "../views/Cruds/Wallet/Home.vue";
import AllWallet from "../views/Cruds/Wallet/ShowAll.vue";
import ShowWallet from "../views/Cruds/Wallet/Show.vue";
// ============== End:: Wallet Routes

// ============== Start:: Transport Routes
import TransportHome from "../views/Cruds/Transport/Home.vue";
import AllTransport from "../views/Cruds/Transport/ShowAll.vue";
import CreateTransport from "../views/Cruds/Transport/Create.vue";
import EditTransport from "../views/Cruds/Transport/Edit.vue";
import ShowTransport from "../views/Cruds/Transport/Show.vue";
// ============== End:: Transport Routes

// ============== Start:: Contact Routes
import ContactHome from "../views/Cruds/Contact/Home.vue";
import CreateContact from "../views/Cruds/Contact/Create.vue";
// ============== End:: Contact Routes

// ============== Start:: Terms Routes
import TermsHome from "../views/Cruds/Terms/index.vue";
// ============== End:: Terms Routes

// ============== Start:: NotificationHome Routes
import NotificationHome from "../views/Cruds/Notifications/index.vue";
// ============== End:: NotificationHome Routes

// ============== Start:: Terms Routes
import AboutHome from "../views/Cruds/About/index.vue";
// ============== End:: Terms Routes

// ============== Start:: Privacy Routes
import ChangePhone from "../views/Cruds/ChangePhone/index.vue";
// ============== End:: Terms Routes

import VerifyPhone from "../views/Cruds/VerifyPhoneCode/index.vue";

// ============== Start:: Privacy Routes
import PrivacyHome from "../views/Cruds/privacy/index.vue";
// ============== End:: Terms Routes

// ============== Start:: Privacy Routes
import FaqHome from "../views/Cruds/faq/index.vue";
// ============== End:: Terms Routes

// ============== Start:: Forbidden Route
import ForbiddenPage from "../pages/ForbiddenPage.vue";
// ============== End:: Forbidden Route

// ============== Start:: Not Found Route
import NotFoundPage from "../pages/NotFound.vue";
// ============== End:: Not Found Route
// End:: Importing Router Components

Vue.use(VueRouter);
const routes = [
  // ***************** Start:: Auth Routes Config
  {
    path: "/",
    component: Authentication,
    children: [
      {
        path: "/",
        component: ChooseType,
        name: "chooseType",
      },
      {
        path: "/OtpVerifyCode",
        component: OtpVerifyCode,
        name: "OtpVerifyCode",
      },
      {
        path: "/login",
        component: LoginForm,
        name: "LoginForm",
      },
      {
        path: "/reset-password-email",
        name: "ResetPasswordEmailForm",
        component: ResetPasswordEmailForm,
      },
      {
        path: "/email-verification/:verification_type",
        name: "EmailVerificationForm",
        component: EmailVerificationForm,
      },
      {
        path: "/chang-phone-number",
        name: "ChangePhoneNumberForm",
        component: ChangePhoneNumberForm,
      },
      {
        path: "/reset-password",
        name: "ResetPasswordForm",
        component: ResetPasswordForm,
      },
    ],
  },
  // ***************** End:: Auth Routes Config

  // ***************** Start:: Content Routes Config
  {
    path: "/home",
    component: AppContentWrapper,
    children: [
      // Start:: Home Route Config
      {
        path: "/home",
        component: HomePage,
        meta: {
          middleware: [auth],
        },
      },
      // End:: Home Route Config

      // Start:: Equipments Routes Config
      {
        path: "/equipments",
        name: "EquipmentsHome",
        component: EquipmentsHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllEquipments",
            component: AllEquipments,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "create",
            name: "CreateEquipments",
            component: CreateEquipments,
            props: true,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "show/:id",
            name: "ShowEquipments",
            component: ShowEquipments,
            props: true,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "edit/:id",
            name: "EditEquipments",
            component: EditEquipments,
            props: true,
            meta: {
              middleware: [auth],
            },
          },
        ],
      },
      // End:: Equipments Routes Config

      // Start:: Transport Routes Config
      {
        path: "/transport",
        name: "TransportHome",
        component: TransportHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllTransport",
            component: AllTransport,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "create",
            name: "CreateTransport",
            component: CreateTransport,
            props: true,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "show/:id",
            name: "ShowTransport",
            component: ShowTransport,
            props: true,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "edit/:id",
            name: "EditTransport",
            component: EditTransport,
            props: true,
            meta: {
              middleware: [auth],
            },
          },
        ],
      },
      // End:: Transport Routes Config

      // Start:: contact Routes Config
      {
        path: "/contact",
        name: "ContactHome",
        component: ContactHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "create",
            name: "CreateContact",
            component: CreateContact,
            meta: {
              middleware: [auth],
            },
          },
        ],
      },
      // End:: contact Routes Config

      // Start:: notification Routes Config
      {
        path: "/notification",
        name: "NotificationHome",
        component: NotificationHome,
        meta: {
          middleware: [auth],
        },
      },
      // End:: contact Routes Config

      // Start:: Orders Routes Config
      {
        path: "/orders",
        name: "OrdersHome",
        component: OrdersHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllOrders",
            component: AllOrders,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "show/:id",
            name: "ShowOrder",
            component: ShowOrder,
            props: true,
            meta: {
              middleware: [auth],
            },
          },
        ],
      },
      // End:: Orders Routes Config

      // Start:: Chat Routes Config
      {
        path: "/chat",
        name: "ChatHome",
        component: ChatHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllChat",
            component: AllChat,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "show/:id",
            name: "ShowChat",
            component: ShowChat,
            props: true,
            meta: {
              middleware: [auth],
            },
          },
        ],
      },
      // End:: Chat Routes Config

      // Start:: Wallets Routes Config
      {
        path: "/wallet",
        name: "WalletHome",
        component: WalletHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllWallet",
            component: AllWallet,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "show/:id",
            name: "ShowWallet",
            component: ShowWallet,
            props: true,
            meta: {
              middleware: [auth],
            },
          },
        ],
      },
      // End:: Wallets Routes Config

      // Start:: terms Routes Config
      {
        path: "/terms",
        name: "TermsHome",
        component: TermsHome,
        meta: {
          middleware: [auth],
        },
      },
      // End:: terms Routes Config

      // Start:: changePhone Routes Config
      {
        path: "/change-phone",
        name: "ChangePhone",
        component: ChangePhone,
        meta: {
          middleware: [auth],
        },
      },
      // End:: changePhone Routes Config

      // Start:: verify-phone Routes Config
      {
        path: "/verify-phone",
        name: "verify-phone",
        component: VerifyPhone,
        meta: {
          middleware: [auth],
        },
      },
      // End:: verify-phone Routes Config

      // Start:: about Routes Config
      {
        path: "/about",
        name: "AboutHome",
        component: AboutHome,
        meta: {
          middleware: [auth],
        },
      },
      // End:: about Routes Config

      // Start:: privacy Routes Config
      {
        path: "/privacy",
        name: "PrivacyHome",
        component: PrivacyHome,
        meta: {
          middleware: [auth],
        },
      },
      // End:: privacy Routes Config

      // Start:: faq Routes Config
      {
        path: "/faq",
        name: "FaqHome",
        component: FaqHome,
        meta: {
          middleware: [auth],
        },
      },
      // End:: faq Routes Config
    ],
  },
  // ***************** End:: Content Routes Config

  // ***************** Start:: Forbidden Route Config
  {
    path: "/forbidden",
    name: "ForbiddenPage",
    component: ForbiddenPage,
  },
  // ***************** End:: Forbidden Route Config

  // ***************** Start:: Not Found Route Config
  {
    path: "/:notFound(.*)",
    name: "NotFoundPage",
    component: NotFoundPage,
  },
  // ***************** End:: Not Found Route Config
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior(to) {
    document.getElementById("app").scrollIntoView({ behavior: "smooth" });
    if (to.hash) {
      return {
        selector: to.hash,
      };
    }
  },
  routes,
});

// Start:: Middleware And Router Guards
function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index];
  if (!subsequentMiddleware) return context.next;

  return (...parameters) => {
    context.next(...parameters);
    const nextMiddleware = nextFactory(context, middleware, index + 1);
    subsequentMiddleware({ ...context, next: nextMiddleware });
  };
}

router.beforeEach((to, from, next) => {
  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware)
      ? to.meta.middleware
      : [to.meta.middleware];

    const context = {
      from,
      next,
      router,
      to,
    };
    const nextMiddleware = nextFactory(context, middleware, 1);
    return middleware[0]({ ...context, next: nextMiddleware });
  } else if (localStorage.getItem("akry_dashboard_user_token")) {
    if (
      to.name == "chooseType" ||
      to.name == "LoginForm" ||
      to.name == "ResetPasswordEmailForm" ||
      to.name == "PhoneVerification" ||
      to.name == "ChangePhoneNumberForm" ||
      to.name == "ResetPasswordForm"
    ) {
      return next("/home");
    } else {
      return next();
    }
  }
  return next();
});
// End:: Middleware And Router Guards

export default router;
