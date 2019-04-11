import chalk from "chalk";
import Base from "../common/base-generator";

export default class Datetime extends Base {
  public constructor(args: string | string[], options: {}) {
    super(
      args,
      Object.assign({}, options, {
        generatorName: "config:date"
      })
    );
  }

  protected _isValid(createdOn: Date, modifiedOn: Date): boolean {
    if (!(createdOn instanceof Date)) {
      this.log(
        chalk.red("You need to fix by hand the date 'createdOn' in .yo-rc.json")
      );
    } else if (createdOn > modifiedOn) {
      this.log(
        `Dates are inconsistent: createdOn (${createdOn}) > modifiedOn (${modifiedOn}).
You need to fix by hand the date 'createdOn' in .yo-rc.json`
      );
    } else {
      return true;
    }

    return false;
  }

  public initializing(): void {
    let createdOn = new Date(this.config.get("createdOn"));
    const modifiedOn = new Date();

    if (!createdOn) {
      createdOn = modifiedOn;
    }

    if (this._isValid(createdOn, modifiedOn)) {
      const date = { createdOn, modifiedOn };

      this.addProp(this.generatorName, date);
      this.addProp(this.generatorName + ":created", createdOn);
      this.addProp(this.generatorName + ":modified", modifiedOn);

      this.config.set("createdOn", createdOn);
      this.config.set("modifiedOn", modifiedOn);
    } else {
      throw new Error(`Invalid date ${createdOn}`);
    }
  }
}
