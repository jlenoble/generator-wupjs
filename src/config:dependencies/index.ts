import Base from "../common/base-generator";
import RefDeps, { Dep } from "../common/ref-deps";
import upgradePackage from "../common/upgrade-package";

type Dependencies = Wup.Dependencies;

export interface Deps {
  dependencies: Dependencies;
  devDependencies: Dependencies;
  peerDependencies: Dependencies;
  optionalDependencies: Dependencies;
}

enum DepName {
  prodDependencies = "dependencies",
  devDependencies = "devDependencies",
  peerDependencies = "peerDependencies",
  optionalDependencies = "optionalDependencies"
}

enum PropName {
  prodDependencies = "prodDependencies",
  devDependencies = "devDependencies",
  peerDependencies = "peerDependencies",
  optionalDependencies = "optionalDependencies"
}

export default class ConfigDependencies extends Base {
  protected dependencies: Deps;
  protected prodDependencies: Dependencies;
  protected devDependencies: Dependencies;
  protected peerDependencies: Dependencies;
  protected optionalDependencies: Dependencies;
  protected isBeforeWriting: boolean = false;

  public constructor(args: string | string[], options: {}) {
    super(
      args,
      Object.assign({}, options, {
        generatorName: "config:dependencies",
        willWrite: [
          "write:package.json",
          "write:eslintrc",
          "write:babelrc",
          "write:gulp"
        ]
      })
    );

    this.prodDependencies = {};
    this.devDependencies = {};
    this.peerDependencies = {};
    this.optionalDependencies = {};

    this.dependencies = {
      dependencies: this.prodDependencies, // _cleanUpDeps rely on this being first
      devDependencies: this.devDependencies,
      peerDependencies: this.peerDependencies,
      optionalDependencies: this.optionalDependencies
    };
  }

  public initializing(): void {
    try {
      const deps = this.fs.readJSON(
        this.destinationPath("package.json")
      ) as Deps;

      if (deps) {
        this._updateDeps(DepName.prodDependencies, deps.dependencies || {});
        this._updateDeps(DepName.devDependencies, deps.devDependencies || {});
        this._updateDeps(DepName.peerDependencies, deps.peerDependencies || {});
      }
    } catch (e) {}

    this.addProp(this.generatorName, this.dependencies);
  }

  protected _cleanUpDeps(): void {
    const depTypes = Object.keys(this.dependencies) as DepName[];

    // If a dep is present in first key ("dependencies"), remove it from
    // dev, peer, etc...
    const depType = depTypes.shift() as DepName;
    const deps = this.dependencies[depType];

    for (const dpType of depTypes) {
      const dps = this.dependencies[dpType];

      Object.keys(deps).forEach(
        (key): void => {
          if (dps[key]) {
            delete dps[key];
          }
        }
      );
    }

    this._sortDeps(depType, deps);
  }

  protected _addDep(name: string): void {
    if (!this.prodDependencies[name]) {
      this.prodDependencies[name] = "*";
    }
    this._filterDeps(this.prodDependencies);
    this._cleanUpDeps();
  }

  protected _addDevDep(name: string): void {
    if (!this.devDependencies[name]) {
      this.devDependencies[name] = "*";
    }
    this._filterDeps(this.devDependencies);
    this._cleanUpDeps();
  }

  protected _addPeerDep(name: string, version: string): void {
    if (!this.peerDependencies[name]) {
      this.peerDependencies[name] = version;
    }
    this._filterDeps(this.peerDependencies);
    this._cleanUpDeps();
  }

  public _isUserDep(dep: string): boolean {
    return /^file:.+$/.test(dep) || /^(?:[<>]=?)/.test(dep);
  }

  public _isPeerDep(version: string): boolean {
    return /[><]=?/.test(version);
  }

  protected _filterDeps(deps: Dependencies): void {
    const typescript = !!this.getProp("config:languages:typescript");
    const refDeps = Base.refDeps as RefDeps;

    const d = Object.keys(deps)
      .sort()
      .map((key): [string, string] => [key, deps[key]]);

    for (const [_dep, version] of d) {
      const dep = upgradePackage(_dep);

      if (!dep) {
        delete deps[_dep];
        return;
      }

      if (dep !== _dep) {
        delete deps[_dep];
      }

      refDeps.addDep(dep, { typescript }); // async, wait in this.afterConfiguring()

      if (this._isUserDep(version) || this._isPeerDep(version)) {
        continue;
      }

      if (refDeps.hasDep(dep)) {
        deps[dep] = "^" + (refDeps.getDep(dep) as Dep).latestVersion;

        const tsDep = `@types/${dep}`;

        if (typescript && refDeps.hasDep(tsDep)) {
          deps[tsDep] = "^" + (refDeps.getDep(tsDep) as Dep).latestVersion;
        }
      }
    }
  }

  protected _updateDeps(name: DepName, deps: Dependencies): void {
    this[
      name === DepName.prodDependencies ? PropName.prodDependencies : name
    ] = deps;
    this.dependencies[name] = deps;
  }

  protected _sortDeps(name: DepName, deps: Dependencies): void {
    const dps: Dependencies = {};
    const keys = Object.keys(deps).sort();

    for (const key of keys) {
      dps[key] = deps[key];
    }

    this._updateDeps(name, dps);
  }

  public async afterConfiguring(): Promise<void> {
    // afterConfiguring and not configuring because write:gulp and others
    // add new deps when configuring, so we wait for all requests (for last
    // versions to have completed) after all configurations are over.
    await (Base.refDeps as RefDeps).complete();

    this._filterDeps(this.prodDependencies);
    this._filterDeps(this.devDependencies);

    this._sortDeps(DepName.prodDependencies, this.prodDependencies);
    this._sortDeps(DepName.devDependencies, this.devDependencies);
  }

  public writing(): void {
    (Base.refDeps as RefDeps).writeJSON();
  }
}
