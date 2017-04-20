'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _base = require('../base');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Base) {
  _inherits(_class, _Base);

  function _class(args, opts) {
    _classCallCheck(this, _class);

    var options = Object.assign({
      props: ['deps', 'devDeps', 'peerDeps'],
      generator: 'install'
    }, opts);

    return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, args, options));
  }

  _createClass(_class, [{
    key: 'initializing',
    value: function initializing() {
      var deps = this.get('deps') || {};
      var devDeps = this.get('devDeps') || {};
      var peerDeps = this.get('peerDeps') || {};

      this.set({ deps: deps, devDeps: devDeps, peerDeps: peerDeps });
    }
  }, {
    key: 'install',
    value: function install() {
      // const deps = this.get('deps');
      // const devDeps = this.get('devDeps');
      // const peerDeps = this.get('peerDeps');

      // this.npmInstall(deps);
      // this.npmInstall(devDeps);
      // this.npmInstall(peerDeps);
    }
  }]);

  return _class;
}(_base2.default);

exports.default = _class;
module.exports = exports['default'];