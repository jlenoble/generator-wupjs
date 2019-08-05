import BaseGenerator from "./base-generator";
import ejs from "ejs";
import { CLIEngine } from "eslint";
import path from "path";
import fse from "fs-extra";

type Options = CLIEngine.Options;

let engine: CLIEngine;

export default function prettyWrite(
  gen: BaseGenerator,
  props: Wup.Props,
  fileName: string,
  destName: string
): void {
  let text = gen.fs.read(fileName);

  text = ejs.compile(text)(props);

  if (!engine) {
    if (gen.getProp("config:languages:typescript")) {
      try {
        fse.statSync(
          path.join(process.cwd(), "node_modules", "@typescript-eslint/parser")
        );

        engine = new CLIEngine({
          ...(gen.getProp("config:eslint") as Options),
          fix: true
        });
      } catch (e) {
        engine = new CLIEngine({
          ...(gen.getProp("config:eslint") as Options),
          parser: path.join(
            __dirname,
            "../../node_modules",
            "@typescript-eslint/parser"
          ),
          fix: true
        });
      }
    } else {
      engine = new CLIEngine({
        ...(gen.getProp("config:eslint") as Options),
        fix: true
      });
    }
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
