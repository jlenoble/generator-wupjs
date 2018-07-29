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
      generator: 'write-src-html'
    }, opts);

    super(args, options);

    this.promptIfMissing(['buildDir', 'addons']);
    this.composeWith('write-gulp-bundle');
  }

  writing() {
    const props = this.getProps();
    props.bundleGlob = this.compute('bundleGlob');

    this.fs.copyTpl(this.templatePath('index.ejs'), this.destinationPath(this.filepaths('indexPage')), props);
  }
};
module.exports = exports['default'];