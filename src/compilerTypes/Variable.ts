import ParserBlock from '../parserTypes/ParserBlock';
import CompilerBlock from './CompilerBlock';
import document from '../helper/document';
import Environment from '../helper/Environment';

const VARIABLE_INDEX = 0;

class Variable extends CompilerBlock {
  element: Text;
  constructor(block: ParserBlock, environment: Environment, parentBlock?: CompilerBlock) {
    super(block, environment, parentBlock);
    this.element = document.createText(this.getParameterValue(VARIABLE_INDEX));
    this.appendToParent(this.element);
    this.subscribe(VARIABLE_INDEX, this.update.bind(this));
  }

  update() {
    this.element.textContent = this.getParameterValue(VARIABLE_INDEX);
  }
}

export default Variable;
