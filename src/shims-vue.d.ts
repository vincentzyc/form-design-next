declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '@vue/runtime-core' {
  import mitt from 'mitt';
  const emitter = mitt();
  export interface ComponentCustomProperties {
    $bus: typeof emitter
    BASE_URL: typeof process.env
  }
}