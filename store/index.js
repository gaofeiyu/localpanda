import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => new Vuex.Store({  
  state: {
    docVersion: '',
    ghVersion: '',
    visibleHeader: false,
    visibleAffix: false,
    apiURI: '',
    locale: 'en',
    lang: {},
    menu: {}
  },
  mutations: {
  }
})

export default store