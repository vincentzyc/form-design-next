import { createStore } from 'vuex'

export default createStore({
  state: {
    pageData: {
      list: [],
      title: "云忆网络",
      statsCode: "",
      theme: "theme1",
      fixedTop: [],
      fixedBottom: [],
      fixedCustom: [],
      style: {
        backgroundColor: "#fff",
        backgroundImage: "",
      },
      hijackBack: {
        isHijack: false,
        alertImg: '',
        alertLink: ''
      }
    },
    dragWg: {},
    selectWg: {},
    selectWgIndex: null,
    selectWginList: [],
    configTab: 'page',
    wgCollapse: "base",
    predefineColors: [
      '#000000',
      '#666666',
      '#cccccc',
      '#ffffff',
      'rgba(255, 255, 255, 0)',
      '#ff0000',
      '#ff4500',
      '#ff8c00',
      '#ffd700',
      '#90ee90',
      '#00ced1',
      '#1e90ff',
      '#c71585'
    ]
  },
  mutations: {
    setDragWg(state, payload) {
      state.dragWg = payload;
    },
    setPageData(state, payload) {
      state.pageData = payload;
    },
    setSelectWg(state, payload) {
      state.selectWg = payload;
    },
    setConfigTab(state, payload) {
      state.configTab = payload;
    },
    setWgCollapse(state, payload) {
      state.wgCollapse = payload;
    }
  }
  // actions: {
  // },
  // modules: {
  // }
})
