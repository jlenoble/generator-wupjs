import Base from '../base';

export default class extends Base {
  constructor (args, opts) {
    const options = Object.assign({
      props: ['gulpIncludes'],
      generator: 'gulp-includes',
    }, opts);

    super(args, options);
  }

  initializing () {
    const gulpIncludes = this.get('gulpIncludes') || [];

    this.set({gulpIncludes});
  }
}
