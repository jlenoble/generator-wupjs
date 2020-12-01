import { DummyPrompt, TestAdapter } from "yeoman-test/lib/adapter";
import chalk from "chalk";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore Path is relative to build directory after transpilation
import stringify from "../../../generators/common/stringify";

console.warn(
  chalk.cyan(`
Changing definition of DummyPrompt.prototype.run!
This affects permanently the way "yeoman-test" behaves.
"validate" and "filter" options are now NOT ignored any more.`)
);

const run = DummyPrompt.prototype.run;

DummyPrompt.prototype.run = async function (): Promise<void> {
  let answer = await run.call(this);
  let msg: true | string = true;

  const { validate, filter } = this.question;

  try {
    if (filter) {
      answer = filter(answer);
    }

    if (validate) {
      msg = validate(answer);
    }
  } catch (e) {
    return e.message;
  }

  if (msg !== true) {
    answer = `[VALIDATION ERROR] ${msg}
[ANSWER] ${stringify(answer)}`;
  }

  return answer;
};

export { DummyPrompt, TestAdapter };
