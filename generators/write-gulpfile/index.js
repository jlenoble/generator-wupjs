'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _base = require('../base');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = class extends _base2.default {
  constructor(args, opts) {
    const options = Object.assign({
      props: ['gulpIncludes'],
      generator: 'write-gulpfile'
    }, opts);

    super(args, options);

    this.promptIfMissing(['gulpDir']);
    this.addDevDeps({
      'gulp': 'git://github.com/gulpjs/gulp.git#4.0',
      'plumb-gulp': '*',
      'autoreload-gulp': '*'
    });
  }

  initializing() {
    this.set({ gulpIncludes: this.get('gulpIncludes') || [] });
  }

  writing() {
    const props = this.getProps();

    this.fs.copyTpl(this.templatePath('gulpfile.ejs'), this.destinationPath('gulpfile.babel.js'), props);
  }
};
module.exports = exports['default'];