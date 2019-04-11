import semver from "semver";
import path from "path";
import Base from "../common/base-generator";

type Version = Wup.Version;

export default class GeneratorVersion extends Base {
  public constructor(args: string | string[], options: {}) {
    super(
      args,
      Object.assign({}, options, {
        generatorName: "config:generator:version"
      })
    );
  }

  protected _isValid(version: Version, previousVersion: Version): boolean {
    if (!semver.valid(version)) {
      this.log(
        "Generator version format doesn't follow SemVer: 1.2.3(-4|-alpha.5|-beta.6)"
      );
    } else if (
      semver.valid(previousVersion) &&
      semver.lt(version, previousVersion)
    ) {
      this.log(
        `Current generator version (${version}) is lower than that used last time (${previousVersion})
Upgrade generator-wupjs before proceeding further`
      );
    } else {
      return true;
    }

    return false;
  }

  public initializing(): void {
    const previousVersion: Version = this.config.get("genVersion");

    const version: Version = this.fs.readJSON(
      path.join(__dirname, "../../package.json")
    ).version;

    if (this._isValid(version, previousVersion)) {
      this.addProp(this.generatorName, version);
      this.config.set("genVersion", version);
    } else {
      throw new Error(`Unrecognized or outdated generator-wupjs@${version}`);
    }
  }
}
