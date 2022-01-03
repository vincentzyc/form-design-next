import '@vue/runtime-core'
declare module '@vue/runtime-core' {
  import mitt from 'mitt';
  const emitter = mitt();
  export interface ComponentCustomProperties {
    $bus: typeof emitter
    BASE_URL: typeof process.env
  }
}