'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _base = require('../base');

var _base2 = _interopRequireDefault(_base);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = class extends _base2.default {
  constructor(args, opts) {
    const options = Object.assign({
      generator: 'class'
    }, opts);

    super(args, options);

    this.promptIfMissing(['srcDir', 'testDir', 'name']);
    this.addDevDeps({ muter: '*' });
  }

  initializing() {
    this.argument('className', { type: String, required: false });
  }

  configuring() {
    if (!this.className) {
      this.className = this.compute('className');
    }
  }

  writing() {
    const props = this.getProps();

    const filename = this.compute('fileStem') + '.js';
    const testFilename = this.compute('fileStem') + '.test.js';

    props.Class = this.compute('className');
    props.module = this.compute('module');

    this.fs.copyTpl(this.templatePath('class.ejs'), this.destinationPath(_path2.default.join(props.srcDir, filename)), props);

    this.fs.copyTpl(this.templatePath('class.test.ejs'), this.destinationPath(_path2.default.join(props.testDir, testFilename)), props);
  }
};
module.exports = exports.default;