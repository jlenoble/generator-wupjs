'use strict';

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

require('./gulp/build');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_gulp2.default.task('default', _gulp2.default.parallel('build'));