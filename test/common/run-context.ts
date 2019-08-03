import { TestAdapter } from "./adapter";
import RunContext from "yeoman-test/lib/run-context";
import helpers from "yeoman-test";
import yeoman from "yeoman-environment";
import path from "path";
import fs from "fs-extra";
import _ from "lodash";
import chalk from "chalk";

console.warn(
  chalk.cyan(`
Changing definition of RunContext.prototype._run!
This affects permanently the way "yeoman-test" behaves.
Now generators may have an extension.`)
);

RunContext.prototype._run = function(): void {
  if (!this.inDirSet && this.settings.tmpdir) {
    this.inTmpDir();
  }

  if (this._asyncHolds !== 0 || this.ran) {
    return;
  }

  this.ran = true;
  let namespace;
  this.env = yeoman.createEnv([], {}, new TestAdapter());

  helpers.registerDependencies(this.env, this.dependencies);

  if (_.isString(this.Generator)) {
    try {
      const lstats = fs.lstatSync(this.Generator);

      if (lstats.isDirectory()) {
        const ext = path.extname(this.Generator);
        namespace = this.env.namespace(this.Generator) + ext;
      } else {
        namespace = this.env.namespace(this.Generator);
      }
    } catch (e) {
      namespace = this.env.namespace(this.Generator);
    }

    this.env.register(this.Generator);
  } else {
    namespace = this.settings.namespace;
    this.env.registerStub(this.Generator, namespace, this.settings.resolved);
  }

  this.generator = this.env.create(namespace, {
    arguments: this.args,
    options: this.options
  });

  helpers.mockPrompt(this.generator, this.answers);

  if (this.localConfig) {
    // only mock local config when withLocalConfig was called
    helpers.mockLocalConfig(this.generator, this.localConfig);
  }

  this.generator.on("error", (err: Error): void => {
    if (!this.emit("error", err)) {
      throw err;
    }
  });
  this.generator.once("end", (): void => {
    helpers.restorePrompt(this.generator);
    this.emit("end");
    this.completed = true;
  });

  this.emit("ready", this.generator);
  this.generator.run();
};

export default RunContext;
