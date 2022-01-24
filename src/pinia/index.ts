import { defineStore } from 'pinia'

// main is the name of the store. It is unique across your application
// and will appear in devtools
export const useMainStore = defineStore('main', {
  // a function that returns a fresh state
  state: () => ({
    counter: 0,
    name: 'Eduardo',
    configTab: 'page',
    selectWg: null as Record<string, any> | null,
    dragWg: null as Record<string, any> | null,
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
    } as Record<string, any> | null,
    predefineColors: ['#000000', '#666666', '#cccccc', '#ffffff', 'rgba(255, 255, 255, 0)', '#ff0000', '#ff4500', '#ff8c00', '#ffd700', '#90ee90', '#00ced1', '#1e90ff', '#c71585']
  }),
  // optional getters
  getters: {
    // getters receive the state as first parameter
    doubleCount: (state) => state.counter * 2,
    // use getters in other getters
    doubleCountPlusOne(): number {
      return this.doubleCount * 2 + 1
    },
  },
  // optional actions
  actions: {
    setDragWg(payload: Record<string, any> | null) {
      this.dragWg = payload;
    },
    setSelectWg(payload: Record<string, any> | null) {
      this.selectWg = payload;
    },
    setConfigTab(payload: string) {
      this.configTab = payload;
    },
    setPageData(payload: Record<string, any> | null) {
      this.pageData = payload;
    },
    reset() {
      // `this` is the store instance
      this.counter = 0
    },
  },
})