import { defineComponent } from 'vue';
import Home from './components/Home';
import './assets/css/index.styl';
import './assets/css/widget.styl';
import './assets/css/config.styl';
import './assets/css/themes.styl';

export default defineComponent({
  name: 'App',
  setup() {
    return () => (
      <div id="app">
        <Home msg="Welcome to Your Vue.js + TypeScript App" />
      </div>
    )
  }
})
