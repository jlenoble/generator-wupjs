import Base from "../common/base-generator";

type Dependencies = Wup.Dependencies;

export default class ConfigDependencies extends Base {
  public constructor(args: string | string[], options: {}) {
    super(
      args,
      Object.assign({}, options, {
        generatorName: "config:dependencies",
        dependsOn: ["config:dependencies:dev"]
      })
    );
  }

  public initializing(): void {
    this.addProp(this.generatorName, {
      dependencies: {},
      devDependencies: {},
      peerDependencies: {},
      optionalDependencies: {}
    });
  }

  protected _addTypeScript(dependencies: Set<string> = new Set()): Set<string> {
    if (!this.getProp("config:languages:typescript")) {
      return dependencies;
    }

    const set: Set<string> = new Set(dependencies);

    dependencies.forEach(
      (dep): void => {
        if (!dep.includes("@babel/") && !dep.includes("@types/")) {
          set.add(`@types/${dep}`);
        }
      }
    );

    set.add("@babel/preset-typescript");

    return new Set([...set].sort());
  }

  protected _filterDeps(dependencies?: Set<string>): Dependencies {
    const deps: Dependencies = {};

    if (dependencies) {
      const d = this._addTypeScript(dependencies);

      for (const dep of d) {
        deps[dep] = "*";
      }
    }

    return deps;
  }

  public configuring(): void {
    this.addProp(this.generatorName, {
      dependencies: this.getProp("config:dependencies:prod"),
      devDependencies: this._filterDeps(this.getProp(
        "config:dependencies:dev"
      ) as Set<string>),
      peerDependencies: this.getProp("config:dependencies:peer"),
      optionalDependencies: this.getProp("config:dependencies:optional")
    });
  }
}
