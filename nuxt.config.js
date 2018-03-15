module.exports = {
  router: {
    middleware: [
      'page-init',
    ]
  },
  build: {
    vendor: [
        'axios',
        'vue-lazyload',
        'element-ui',
        '~/assets/font/iconfont.js',
    ]
  },
  babel: {
    plugins: [['component', [{
      libraryName: 'element-ui',
      styleLibraryName: 'theme-chalk'
    }]]]
  },
  plugins: [
    { src: '~/plugins/swiper.js', ssr: false },
    { src: '~/plugins/axios.js'},
    { src: '~/plugins/vue-lazyload.js', ssr: false },
    { src: '~/plugins/element-ui.js', ssr: false },
  ],
  css: [
    'element-ui/lib/theme-chalk/index.css',
    'swiper/dist/css/swiper.css'
  ],
}