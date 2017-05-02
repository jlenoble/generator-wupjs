import Base from '../base';

export default class extends Base {
  constructor (args, opts) {
    const options = Object.assign({
      props: ['grammar', 'listener', 'rule'],
      generator: 'parser',
    }, opts);

    super(args, options);

    this.composeWith('write-gulp-parse');
    this.addDeps({
      'antlr4': '*',
    });
    this.addDevDeps({
      'gulp-antlr4': '*',
    });
  }

  prompting () {
    const prompts = [{
      type: 'input',
      name: 'grammar',
      message: 'Grammar name:',
      default: this.get('grammar'),
    }, {
      type: 'input',
      name: 'rule',
      message: 'Parser\'s starting rule:',
      default: this.get('rule'),
    }, {
      type: 'input',
      name: 'listener',
      message: 'Translator/interpreter name:',
      default: this.get('listener'),
    }];

    return this.prompt(prompts).then(props => {
      this.set(props);
    });
  }
}
