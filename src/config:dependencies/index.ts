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

  protected _cleanUpDeps(): void {
    const dependencies: Deps = this.getProp(this.generatorName) as Deps;

    if (dependencies) {
      const depTypes = Object.keys(dependencies) as (keyof Deps)[];

      while (depTypes.length > 1) {
        const depType = depTypes.shift() as (keyof Deps);

        for (const dpType of depTypes) {
          const deps = dependencies[depType];
          const dps = dependencies[dpType];

          Object.keys(deps).forEach(
            (key): void => {
              if (dps[key]) {
                delete dps[key];
              }
            }
          );
        }
      }
    }
  }

  protected _addDep(name: string): void {
    const dependencies: Deps = this.getProp(this.generatorName) as Deps;

    if (dependencies) {
      const prodDependencies = this.getProp("config:dependencies:prod") as Set<
        string
      >;

      prodDependencies.add(name);
      dependencies.dependencies = this._filterDeps(prodDependencies);
      this._cleanUpDeps();
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
      this._cleanUpDeps();
    }
  }

  public _isUserDep(dep: string): boolean {
    return /^"file:.+"$/.test(dep);
  }

  protected _filterDeps(dependencies?: Set<string>): Dependencies {
    const deps: Dependencies = {};
    const typescript = !!this.getProp("config:languages:typescript");
    const refDeps = Base.refDeps as RefDeps;

    if (dependencies) {
      const d = Array.from(dependencies).sort();

      for (const dep of d) {
        refDeps.addDep(dep, { typescript }); // async, wait in "configuring"

        if (this._isUserDep(deps[dep])) {
          continue;
        }

        if (refDeps.hasDep(dep)) {
          deps[dep] = "^" + (refDeps.getDep(dep) as Dep).latestVersion;

          const tsDep = `@types/${dep}`;

          if (typescript && refDeps.hasDep(tsDep)) {
            deps[tsDep] = "^" + (refDeps.getDep(tsDep) as Dep).latestVersion;
          }
        } else {
          deps[dep] = "*";
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

  public async configuring(): Promise<void> {
    await (Base.refDeps as RefDeps).isPending();

    this.addProp(this.generatorName, {
      dependencies: this._filterDeps(this.getProp(
        "config:dependencies:prod"
      ) as Set<string>),
      devDependencies: this._filterDeps(this.getProp(
        "config:dependencies:dev"
      ) as Set<string>),
      peerDependencies: this.getProp("config:dependencies:peer") || {},
      optionalDependencies: this.getProp("config:dependencies:optional") || {}
    });
  }

  public writing(): void {
    (Base.refDeps as RefDeps).writeJSON();
  }
}
