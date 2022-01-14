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
    // dragWg: {},
    selectWg: {},
    selectWgIndex: null,
    selectWginList: [],
    configTab: 'page',
    wgCollapse: "base"
  },
  mutations: {
    // setDragWg(state, payload) {
    //   state.dragWg = payload;
    // },
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
