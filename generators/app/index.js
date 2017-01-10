'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var upperCamelCase = require('uppercamelcase');
var config = require('config');

module.exports = yeoman.Base.extend({
  initializing: function() {
    this.argument('moduleName', {type: String, required: false});
  },

  prompting: function() {
    this.log(yosay(
      'Welcome to our ' + chalk.red('generator-wupjs') +
        ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'module',
      message: 'Module name:',
      default: this.moduleName || this.appname.replace(/\s+/g, '-')
    }, {
      type: 'input',
      name: 'description',
      message: 'Description:',
      default: this.config.get('description')
    }, {
      type: 'input',
      name: 'author',
      message: 'Author\'s name:',
      default: this.config.get('author') || config.get('author')
    }, {
      type: 'input',
      name: 'email',
      message: 'Email address:',
      default: this.config.get('email') || config.get('email')
    }, {
      type: 'input',
      name: 'github',
      message: 'GitHub user name:',
      default: this.config.get('github') || config.get('github')
    }, {
      type: 'list',
      name: 'license',
      message: 'LICENSE:',
      choices: ['MIT', 'GPL-3.0'],
      default: this.config.get('license')
    }, {
      type: 'list',
      name: 'transpile',
      message: 'Ecmascript presets (Babel):',
      choices: ['none', 'es2015', 'es2016', 'es2017'],
      default: this.config.get('transpile')
    }, {
      type: 'checkbox',
      name: 'addons',
      message: 'Use vendor libraries:',
      choices: ['React'],
      default: this.config.get('addons')
    }];

    return this.prompt(prompts).then(function(props) {
      if (!/^[a-zA-Z]+.*/.test(props.module)) {
        props.Class = 'Wup' + props.module;
      } else {
        props.Class = upperCamelCase(props.module);
      }

      props.updated = new Date().getFullYear();
      props.created = this.config.get('created') || props.updated;
      if (props.created < props.updated) {
        props.year = props.created + '-'
      } else {
        props.year = '';
      }
      props.year += props.updated;

      this.props = props;
    }.bind(this));
  },

  configuring: function() {
    if (this.props.transpile !== 'none' ||
      this.props.addons.includes('React')) {
      this.fs.copyTpl(
        this.templatePath('babelrc'),
        this.destinationPath('.babelrc'),
        this.props
      );
    }

    this.fs.copy(
      this.templatePath('gitignore'),
      this.destinationPath('.gitignore')
    );

    this.fs.copy(
      this.templatePath('jscsrc'),
      this.destinationPath('.jscsrc')
    );

    this.fs.copyTpl(
      this.templatePath('LICENSE_' + this.props.license),
      this.destinationPath('LICENSE'),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('gulpfile.babel.js'),
      this.destinationPath('gulpfile.babel.js'),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('gulp/**/*.js'),
      this.destinationPath('gulp'),
      this.props
    );

    if (this.props.addons.includes('React')) {
      this.fs.copyTpl(
        this.templatePath('gulp_react/**/*.js'),
        this.destinationPath('gulp'),
        this.props
      );
    }

    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      this.props
    );

    this.config.set(this.props);
  },

  writing: function() {
    let jsExt = '.js';

    if (this.props.addons.includes('React')) {
      this.fs.copyTpl(
        this.templatePath('index.html'),
        this.destinationPath('src/index.html'),
        this.props
      );

      this.fs.copyTpl(
        this.templatePath('runner.html'),
        this.destinationPath('test/runner.html'),
        this.props
      );

      jsExt = '.jsx';
    }

    this.fs.copyTpl(
      this.templatePath('index.js'),
      this.destinationPath('src/index' + jsExt),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('rename_me.js'),
      this.destinationPath('src/' + this.props.module + jsExt),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('rename_me.test.js'),
      this.destinationPath('test/' + this.props.module + '.test' + jsExt),
      this.props
    );
  },

  install: function() {
    this.installDependencies();
    /*this.spawnCommandSync('git', [
      'remote',
      'set-url',
      'origin',
      `git@github.com:${this.props.github}/${this.props.module}.git`
    ]);*/
  }
});
