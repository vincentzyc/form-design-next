import Quill from 'quill';
const Parchment = Quill.import('parchment');

class BoldStyleAttributor extends Parchment.Attributor.Style {
  value(domNode) {
    let value = super.value(domNode);
    console.log(value);
    return domNode.style.fontWeight === 'bold' ? true : undefined;
  }
  //   add(node, value) {
  //     if (value) {
  //       node.style.fontWeight = 'bold';
  //     } else {
  //       node.style.fontWeight = '';
  //     }
  //   }
}

const BoldStyle = new BoldStyleAttributor('bold', 'font-weight', {
  scope: Parchment.Scope.INLINE,
  whitelist: ['normal', 'bold'],
});
export default BoldStyle;
