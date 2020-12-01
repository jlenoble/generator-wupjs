import semver from "semver";
import path from "path";
import Base from "../common/base-generator";

type Version = Wup.Version;

export default class GeneratorVersion extends Base {
  public constructor(args: string | string[], options: Wup.Options) {
    super(
      args,
      Object.assign({}, options, {
        generatorName: "config:generator:version",
      })
    );
  }

  protected _isValid(version: Version, modifiedWith: Version): boolean {
    if (!semver.valid(version)) {
      this.log(
        "Generator version format doesn't follow SemVer: 1.2.3(-4|-alpha.5|-beta.6)"
      );
    } else if (semver.valid(modifiedWith) && semver.lt(version, modifiedWith)) {
      this.log(
        `Current generator version (${version}) is lower than that used last time (${modifiedWith})
Upgrade generator-wupjs before proceeding further`
      );
    } else {
      return true;
    }

    return false;
  }

  public initializing(): void {
    let createdWith: Version = this.config.get("createdWith");
    let modifiedWith: Version = this.config.get("modifiedWith");

    const version: Version | undefined = (this.fs.readJSON(
      path.join(__dirname, "../../package.json")
    ) as Wup.PackageJson).version;

    if (!createdWith) {
      createdWith = version;
    }

    if (!modifiedWith) {
      modifiedWith = version;
    }

    if (
      this._isValid(version, modifiedWith) &&
      this._isValid(modifiedWith, createdWith)
    ) {
      this.addProp(this.generatorName, { createdWith, modifiedWith });
      this.addProp(this.generatorName + ":created", createdWith);
      this.addProp(this.generatorName + ":modified", version);

      this.config.set("createdWith", createdWith);
      this.config.set("modifiedWith", version);
    } else {
      throw new Error(`Unrecognized or outdated generator-wupjs@${version}`);
    }
  }
}
