import BaseGenerator from "./base-generator";
import ejs from "ejs";
import prettier from "prettier";

export default function prettyWrite(
  gen: BaseGenerator,
  props: any,
  fileName: string,
  destName: string
): void {
  let text = gen.fs.read(fileName);
  text = ejs.compile(text)(props);
  text = prettier.format(text, { parser: "babel" });
  gen.fs.write(destName, text);
}
