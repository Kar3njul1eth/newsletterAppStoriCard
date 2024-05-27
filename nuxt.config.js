import colors from 'vuetify/es5/util/colors';
import dotenv from 'dotenv';

dotenv.config();

export default {
  ssr: false,

  server: {
    port: process.env.PORT || 3000,
    host: 'localhost'
  },
  head: {
    titleTemplate: '%s - newsletter-app-storicard',
    title: 'newsletter-app-storicard',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  css: [],

  plugins: [],

  components: true,

  target: 'server',
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/vuetify',
    '@nuxtjs/dotenv',
  ],

  modules: [
    '@nuxtjs/axios',
  ],

  axios: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
  },

  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  build: {
    babel: {
      presets({ isServer }) {
        return [
          [
            require.resolve('@nuxt/babel-preset-app'),
            {
              buildTarget: isServer ? 'server' : 'client',
              corejs: { version: 3 }
            }
          ]
        ];
      },
      plugins: [
        ["@babel/plugin-proposal-decorators", { "legacy": true }],
        ["@babel/plugin-proposal-class-properties", { "loose": true }]
      ]
    },
  },
  serverMiddleware: [
    { path: '/api', handler: '~/server/index.ts' }
  ]
};
