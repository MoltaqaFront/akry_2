module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/provider" : "/",

  pwa: {
    name: "Akry Provider Dashboard",
    description: "",
    startUrl: "index.html",
    scope: ".",
    display: "standalone",
    orientation: "portrait-primary",
    lang: "ar-KSA",
    themeColor: "#F6A513",
    msTileColor: "#F6A513",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "#F6A513",
    // iconPaths: {
    //   faviconSVG: "img/icons/favicon.svg",
    //   favicon256: "img/icons/favicon-256x256.png",
    //   favicon196: "img/icons/favicon-196x196.png",
    //   favicon172: "img/icons/favicon-172x172.png",
    //   favicon128: "img/icons/favicon-128x128.png",
    //   favicon114: "img/icons/favicon-114x114.png",
    //   favicon64: "img/icons/favicon-64x64.png",
    //   favicon32: "img/icons/favicon-32x32.png",
    //   favicon16: "img/icons/favicon-16x16.png",
    //   androidChrome192: "android-chrome-192x192.png",
    //   androidChrome512: "android-chrome-512x512.png",
    //   appleTouchIcon: "img/icons/apple-touch-icon-152x152.png",
    //   maskIcon: "img/icons/safari-pinned-tab.svg",
    //   msTileImage: "img/icons/msapplication-icon-144x144.png",
    // },
  },

  css: {
    loaderOptions: {
      scss: {
        additionalData: `
            @import "~@/assets/sass/abstracts/_variables.scss";
            @import "~@/assets/sass/abstracts/_mixins.scss";
          `,
      },
    },
  },

  transpileDependencies: ["vuetify"],

  pluginOptions: {
    i18n: {
      locale: undefined,
      fallbackLocale: undefined,
      localeDir: undefined,
      enableInSFC: undefined,
    },
  },
};
