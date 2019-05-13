import Base from "../common/base-generator";
import RefDeps, { Dep } from "../common/ref-deps";

type Dependencies = Wup.Dependencies;

interface Deps {
  dependencies: Dependencies;
  devDependencies: Dependencies;
  peerDependencies: Dependencies;
  optionalDependencies: Dependencies;
}

export default class ConfigDependencies extends Base {
  public constructor(args: string | string[], options: {}) {
    super(
      args,
      Object.assign({}, options, {
        generatorName: "config:dependencies",
        dependsOn: ["config:dependencies:dev", "config:dependencies:prod"]
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

  protected _addDep(name: string): void {
    const dependencies: Deps = this.getProp(this.generatorName) as Deps;

    if (dependencies) {
      const prodDependencies = this.getProp("config:dependencies:prod") as Set<
        string
      >;

      prodDependencies.add(name);
      dependencies.dependencies = this._filterDeps(prodDependencies);
    }
  }

  protected _addDevDep(name: string): void {
    const dependencies: Deps = this.getProp(this.generatorName) as Deps;

    if (dependencies) {
      const devDependencies = this.getProp("config:dependencies:dev") as Set<
        string
      >;

      devDependencies.add(name);
      dependencies.devDependencies = this._filterDeps(devDependencies);
    }
  }

  protected _filterDeps(dependencies?: Set<string>): Dependencies {
    const deps: Dependencies = {};
    const typescript = !!this.getProp("config:languages:typescript");
    const refDeps = Base.refDeps as RefDeps;

    if (dependencies) {
      const d = Array.from(dependencies).sort();

      for (const dep of d) {
        if (!deps[dep]) {
          refDeps.addDep(dep, { typescript }); // async

          if (refDeps.hasDep(dep)) {
            deps[dep] = "^" + (refDeps.getDep(dep) as Dep).latestVersion;

            const tsDep = `@types/${dep}`;

            if (refDeps.hasDep(tsDep) && typescript) {
              deps[tsDep] = "^" + (refDeps.getDep(tsDep) as Dep).latestVersion;
            }
          } else {
            deps[dep] = "*";
          }
        }
      }
    }

    const dps: Dependencies = {};
    const keys = Object.keys(deps).sort();

    for (const key of keys) {
      dps[key] = deps[key];
    }

    return dps;
  }

  public configuring(): void {
    this.addProp(this.generatorName, {
      dependencies: this._filterDeps(this.getProp(
        "config:dependencies:prod"
      ) as Set<string>),
      devDependencies: this._filterDeps(this.getProp(
        "config:dependencies:dev"
      ) as Set<string>),
      peerDependencies: this.getProp("config:dependencies:peer"),
      optionalDependencies: this.getProp("config:dependencies:optional")
    });
  }

  public writing(): void {
    (Base.refDeps as RefDeps).writeJSON();
  }
}
