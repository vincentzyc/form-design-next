import Quill from 'quill';
const Parchment = Quill.import('parchment');

class BoldStyleAttributor extends Parchment.Attributor.Style {
  value(node) {
    console.log(node);
    return node.style.fontWeight === 'bold' || super.value(node);
  }

  add(node, value) {
    node.style.fontWeight = 'bold';
  }

  remove(node) {
    if (node.style.fontWeight === 'bold') {
      node.style.fontWeight = '';
    } else {
      super.remove(node);
    }
  }
}

const BoldStyle = new BoldStyleAttributor('bold', 'font-weight', {
  scope: Parchment.Scope.INLINE,
  whitelist: ['normal', 'bold'],
});
export default BoldStyle;
