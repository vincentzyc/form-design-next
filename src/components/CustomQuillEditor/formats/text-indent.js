import Quill from 'quill';
const Parchment = Quill.import('parchment');

class IndentStyleAttributor extends Parchment.Attributor.Style {}

const IndentStyle = new IndentStyleAttributor('textIndent', 'text-indent', {
  scope: Parchment.Scope.BLOCK,
  whitelist: ['0em', '1em', '2em', '3em', '4em', '5em'],
});

export default IndentStyle;
