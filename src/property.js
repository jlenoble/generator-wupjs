import EventEmitter from 'events';

export default class Property extends EventEmitter {
  constructor (options = {}) {
    const {name, defaultValue} = options;

    if (typeof name !== 'string') {
      throw new Error('Property has no name');
    }

    super();

    let _value = defaultValue;
    let _prevValue;

    Object.defineProperties(this, {
      value: {
        get () {
          return _value;
        },
        set (value) {
          if (value === undefined) {
            throw new Error('Argument is missing or undefined');
          }

          if (value === _prevValue) {
            return;
          }

          _prevValue = _value;
          _value = value;
          this.emit('change', value);
        },
      },

      name: {
        value: name,
      },
    });
  }
}
