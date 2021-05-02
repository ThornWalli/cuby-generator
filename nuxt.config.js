
import pkg from './package.json';

const isDev = process.env.NODE_ENV === 'development';

export default {

  srcDir: 'src/',

  ssr: false,
  target: 'static',

  server: {
    port: getPort(),
    host: getHost()
  },

  generate: {
    crawler: false,
    dir: getDistPath()
  },

  router: {
    base: getBasePath(),
    trailingSlash: undefined
  },

  head: {
    title: 'cuby-generator',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  components: false,

  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    '@nuxtjs/pwa'
  ],

  pwa: {

    manifest: {
      name: pkg.name,
      description: pkg.description,
      short_name: pkg.name
    },
    meta: {
      name: pkg.name,
      description: pkg.description,
      theme_color: '#0066ff'
    }
  },

  speedkit: {
    fonts: [{
      family: 'BitFont',
      fallback: ['sans-serif'],
      variances: [
        {
          weight: 400,
          style: 'normal',
          sources: [{ src: '@/assets/fonts/BitFont.woff2', type: 'woff2' }]
        }
      ]
    }, {
      family: 'Open Sans',
      fallback: ['sans-serif'],
      variances: [
        {
          weight: 300,
          style: 'normal',
          sources: [{ src: '@/assets/fonts/open-sans-v18-latin/open-sans-v18-latin-300.woff2', type: 'woff2' }]
        },
        {
          weight: 300,
          style: 'italic',
          sources: [{ src: '@/assets/fonts/open-sans-v18-latin/open-sans-v18-latin-300Italic.woff2', type: 'woff2' }]
        },
        {
          weight: 400,
          style: 'normal',
          sources: [{ src: '@/assets/fonts/open-sans-v18-latin/open-sans-v18-latin-regular.woff2', type: 'woff2' }]
        },
        {
          weight: 400,
          style: 'italic',
          sources: [{ src: '@/assets/fonts/open-sans-v18-latin/open-sans-v18-latin-italic.woff2', type: 'woff2' }]
        },
        {
          weight: 600,
          style: 'normal',
          sources: [{ src: '@/assets/fonts/open-sans-v18-latin/open-sans-v18-latin-600.woff2', type: 'woff2' }]
        },
        {
          weight: 600,
          style: 'italic',
          sources: [{ src: '@/assets/fonts/open-sans-v18-latin/open-sans-v18-latin-600Italic.woff2', type: 'woff2' }]
        },
        {
          weight: 700,
          style: 'normal',
          sources: [{ src: '@/assets/fonts/open-sans-v18-latin/open-sans-v18-latin-700.woff2', type: 'woff2' }]
        },
        {
          weight: 700,
          style: 'italic',
          sources: [{ src: '@/assets/fonts/open-sans-v18-latin/open-sans-v18-latin-700Italic.woff2', type: 'woff2' }]
        },
        {
          weight: 800,
          style: 'normal',
          sources: [{ src: '@/assets/fonts/open-sans-v18-latin/open-sans-v18-latin-800.woff2', type: 'woff2' }]
        },
        {
          weight: 800,
          style: 'italic',
          sources: [{ src: '@/assets/fonts/open-sans-v18-latin/open-sans-v18-latin-800Italic.woff2', type: 'woff2' }]
        }
      ]
    }]
  },

  modules: [
    '@/modules/svg',
    'nuxt-speedkit'
  ],

  build: {
    babel: {
      presets ({ isServer, isModern }) {
        // TODO: Check performance issues (useBuiltIns, forceAllTransforms, shippedProposals, loose, bugfixes)
        return [
          [
            require.resolve('@nuxt/babel-preset-app'),
            {
              buildTarget: isServer ? 'server' : 'client',
              corejs: { version: 3, proposals: true },
              useBuiltIns: isModern ? 'entry' : 'usage',
              forceAllTransforms: !isDev && !isModern && !isServer,
              shippedProposals: true,
              loose: true,
              bugfixes: true,
              polyfills: [
                'es.promise',
                'es.symbol'
              ]
            }
          ]
        ];
      }
    },

    postcss: {
      plugins: {
        'postcss-nesting': {}
      }
    }

  }
};

function getBasePath () {
  return process.env.npm_config_base || process.env.BASE_PATH || '/';
}

function getHost () {
  return process.env.npm_config_host || process.env.HOST || 'localhost';
}

function getPort () {
  return process.env.npm_config_port || process.env.PORT || 3000;
}

function getDistPath () {
  return process.env.npm_config_dist || process.env.DIST_PATH || 'dist';
}
