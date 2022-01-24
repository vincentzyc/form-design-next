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
    }
  },
  mutations: {
    setPageData(state, payload) {
      state.pageData = payload;
    }
  }
})
