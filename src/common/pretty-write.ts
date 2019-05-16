import BaseGenerator from "./base-generator";
import ejs from "ejs";
import { CLIEngine } from "eslint";

type Options = CLIEngine.Options;

let engine: CLIEngine;

export default function prettyWrite(
  gen: BaseGenerator,
  props: any,
  fileName: string,
  destName: string
): void {
  let text = gen.fs.read(fileName);

  text = ejs.compile(text)(props);

  if (!engine) {
    engine = new CLIEngine({
      ...(gen.getProp("config:eslint") as Options),
      fix: true
    });
  }

  const {
    results: [
      {
        // messages,
        // errorCount,
        // warningCount,
        // fixableErrorCount,
        // fixableWarningCount,
        output
      }
    ]
  } = engine.executeOnText(text);

  gen.fs.write(destName, output || text);
}
