import Base from '../base';

export default class extends Base {
  constructor (args, opts) {
    const options = Object.assign({
      props: ['created', 'updated'],
      generator: 'date',
    }, opts);

    super(args, options);
  }

  initializing () {
    const props = {};
    const created = this.get('created');

    props.updated = new Date();
    props.created = created ? new Date(created) : props.updated;

    this.set(props);
  }
}
