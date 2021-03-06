import Parameter from './Parameter';
import Compiler  from './Compiler';

class Environment {
  public  compiler: Compiler;
  public local: {
    [keyof: string]: string[],
  };
  private state: any;
  private props: any;

  constructor(state: any, props: any) {
    this.local = {};
    this.state = state;
    this.props = props;
    this.compiler = new Compiler(this);
  }

  public getValue(parameter: Parameter): any {
    return this.getReference(parameter)[parameter.value[parameter.value.length - 1]];
  }

  public setLocal(key: string, value: string[]) {
    this.local[key] = value;
  }

  public getReference(parameter: Parameter): any {
    let current = this.state;
    for (let i = 0; i < parameter.value.length - 1; i += 1) {
      current = current[parameter.value[i]];
    }

    return current;
  }

  public subscribe(parameter: Parameter, callback: () => void) {
    let current = this.state;
    let i = 0;
    do {
      if (current.__stateLog__) {
        current.__stateLog__.on('set.' + parameter.value[i], callback);
      }
      current = current[parameter.value[i]];
      i += 1;
    } while (i < parameter.value.length);

    return current;
  }
}

export default Environment;
