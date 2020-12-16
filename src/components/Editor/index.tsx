import { onMounted, onBeforeUnmount, ref, watch } from 'vue';

export default {
  name: 'wangEditor',
  props: {
    modelValue: String
  },
  setup(props, { emit }) {
    const editor = ref();

    let instance, curContent;

    function htmlChange(newHtml) {
      curContent = newHtml
      emit('update:modelValue', newHtml)
    }

    function initialize() {
      instance = new window.wangEditor(editor.value);
      Object.assign(instance.config, {
        menus: [
          'head',
          'bold',
          'fontSize',
          'fontName',
          'italic',
          'underline',
          'strikeThrough',
          'indent',
          'lineHeight',
          'foreColor',
          'backColor',
          'link',
          // 'list',
          'justify',
          // 'quote',
          'emoticon',
          // 'image',
          // 'video',
          // 'table',
          // 'code',
          'splitLine',
          // 'undo',
          // 'redo',
        ],
        onchange: htmlChange,
      });
      instance.create();
      instance.txt.html(props.modelValue)
    }

    watch(() => props.modelValue, newVal => {
      if (instance) {
        if (newVal && newVal !== curContent) {
          htmlChange(newVal)
          instance.txt.html(newVal)
        } else if (!newVal) {
          instance.txt.html('')
        }
      }
    })
    onMounted(() => initialize());

    onBeforeUnmount(() => {
      instance.destroy();
      instance = null;
    });

    return () => (
      <div class="wangEditor">
        <div ref={editor}></div>
      </div>
    );
  },
};