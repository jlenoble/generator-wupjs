import chalk from "chalk";
import Base from "../common/base-generator";

export default class PackageKeywords extends Base {
  public constructor(args: string | string[], options: {}) {
    super(
      args,
      Object.assign({}, options, {
        generatorName: "config:package:keywords",
        willWrite: ["write:package.json"]
      })
    );
  }

  protected _isValid(keywords: string[]): boolean {
    let keyword = "";

    if (!keywords.length) {
      console.warn("You must enter at least one keyword");
    } else if (
      keywords.some(
        (kwd): boolean => {
          if (!/^[A-Za-zÀ-ÖØ-öø-ÿ]+(-[A-Za-zÀ-ÖØ-öø-ÿ]+)*\d*$/.test(kwd)) {
            keyword = kwd;
            return true;
          }
          return false;
        }
      )
    ) {
      const kwd = chalk.yellow(keyword);

      console.log(
        `you typed [${keywords.map(
          (k): string => (k === keyword ? kwd : k)
        )}] but ${kwd} is invalid`
      );
    } else {
      return true;
    }

    return false;
  }

  public initializing(): void {
    try {
      const keywords: string[] = this.fs.readJSON(
        this.destinationPath("package.json")
      ).keywords;

      this.addProp(this.generatorName, keywords);
    } catch (e) {
      this.addProp(this.generatorName, []);
    }
  }

  public async prompting(): Promise<void> {
    if (this._mustPrompt) {
      const prompts = [
        {
          type: "input",
          name: this.generatorName,
          message: "Package keywords (',' as separator, no brackets needed):",
          default: `[${(this.getProp(this.generatorName) as string[]).join(
            ", "
          )}]`
        }
      ];

      const props = await this.prompt(prompts);
      const keywords = props[this.generatorName]
        .replace(/[\]\[]/g, "")
        .split(/,\s*/);

      if (this._isValid(keywords)) {
        this.addProp(this.generatorName, keywords);
        return;
      }

      return this.prompting();
    }
  }
}
