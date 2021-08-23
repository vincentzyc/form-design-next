import mitt from 'mitt';
const emitter = mitt();

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $bus: typeof emitter
    BASE_URL: typeof process.env
  }
}