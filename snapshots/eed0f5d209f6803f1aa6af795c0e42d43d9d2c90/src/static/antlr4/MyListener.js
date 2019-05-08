import path from "path";

const base = process.cwd();
const rel = path.relative(base, "src/static/antlr4/parsers");
const {MyGrammarListener} = require(path.join(base, rel,
  "MyGrammarListener"));

export class MyListener extends MyGrammarListener {
  enterExpr () {
    process.stdout.write("hello");
  }

  exitExpr () {
    process.stdout.write("bye");
  }
}
