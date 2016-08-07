'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  prompting: function() {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the beautiful ' + chalk.red('generator-wupjs') + ' generator!'
    ));
  },

  writing: function() {
  },

  install: function() {
    this.installDependencies();
  }
});
