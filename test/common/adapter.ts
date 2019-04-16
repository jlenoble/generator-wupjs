import { DummyPrompt, TestAdapter } from "yeoman-test/lib/adapter";
import chalk from "chalk";

console.warn(
  chalk.cyan(`
Changing definition of DummyPrompt.prototype.run!
This affects permanently the way "yeoman-test" behaves.
"validate" and "filter" options are now NOT ignored any more.`)
);

const run = DummyPrompt.prototype.run;

DummyPrompt.prototype.run = async function(): Promise<void> {
  let answer = await run.call(this);

  const { validate, filter } = this.question;

  if (filter) {
    answer = filter(answer);
  }

  if (validate) {
    const msg = validate(answer);
    if (msg !== true) {
      answer = msg;
    }
  }

  return answer;
};

export { DummyPrompt, TestAdapter };
