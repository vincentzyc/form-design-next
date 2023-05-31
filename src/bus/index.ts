import mitt from 'mitt';

const eventBus = mitt();

export const emitCustomWidgetsSave = (data: any) => eventBus.emit('emitCustomWidgetsSave', data);
export const onCustomWidgetsSave = (cb: (data: any) => void) => eventBus.on('emitCustomWidgetsSave', cb);
