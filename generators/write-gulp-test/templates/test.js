'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.test = undefined;

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _gulpMocha = require('gulp-mocha');

var _gulpMocha2 = _interopRequireDefault(_gulpMocha);

var _globs = require('./globs');

require('./build');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var test = exports.test = function test() {
  return _gulp2.default.src(_globs.testBuildGlob).pipe((0, _gulpMocha2.default)());
};

_gulp2.default.task('test', _gulp2.default.series('build', test));