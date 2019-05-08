import path from "path";
import latestVersion from "latest-version";
import Base from "../common/base-generator";

type Dependencies = Wup.Dependencies;

interface Deps {
  dependencies: Dependencies;
  devDependencies: Dependencies;
  peerDependencies: Dependencies;
  optionalDependencies: Dependencies;
}

export default class ConfigDependencies extends Base {
  protected depsRef: {
    [k: string]: { latestVersion?: string; lastChecked?: Date };
  } = {};

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
    this.depsRef = this.fs.readJSON(
      path.join(__dirname, "../../deps.json"),
      this.depsRef
    );

    const noTypes: Set<string> = new Set();

    this.addProp(this.generatorName + ":no-types", noTypes);

    noTypes
      .add("gulp-wrap")
      .add("babel-plugin-add-module-exports")
      .add("muter")
      .add("markdown-include");

    this.addProp(this.generatorName, {
      dependencies: {},
      devDependencies: {},
      peerDependencies: {},
      optionalDependencies: {}
    });
  }

  protected _addDep(name: string, addTypings: boolean): void {
    const dependencies: Deps = this.getProp(this.generatorName) as Deps;

    if (dependencies) {
      const prodDependencies = this.getProp("config:dependencies:prod") as Set<
        string
      >;

      prodDependencies.add(name);

      if (!addTypings) {
        const noTypes = this.getProp("config:dependencies:no-types") as Set<
          string
        >;
        noTypes.add(name);
      }

      dependencies.dependencies = this._filterDeps(prodDependencies);
    }
  }

  protected _addDevDep(name: string, addTypings: boolean): void {
    const dependencies: Deps = this.getProp(this.generatorName) as Deps;

    if (dependencies) {
      const devDependencies = this.getProp("config:dependencies:dev") as Set<
        string
      >;

      devDependencies.add(name);

      if (!addTypings) {
        const noTypes = this.getProp("config:dependencies:no-types") as Set<
          string
        >;
        noTypes.add(name);
      }

      dependencies.devDependencies = this._filterDeps(devDependencies, true);
    }
  }

  protected _addTypeScript(dependencies: Set<string> = new Set()): Set<string> {
    if (!this.getProp("config:languages:typescript")) {
      return dependencies;
    }

    const set: Set<string> = new Set(dependencies);
    const noTypes = this.getProp("config:dependencies:no-types") as Set<string>;

    dependencies.forEach(
      (dep): void => {
        if (
          !dep.includes("@babel/") &&
          !dep.includes("@types/") &&
          !noTypes.has(dep)
        ) {
          set.add(`@types/${dep}`);
        }
      }
    );

    set.add("@babel/preset-typescript");

    return new Set([...set].sort());
  }

  protected _filterDeps(dependencies?: Set<string>, dev = false): Dependencies {
    const deps: Dependencies = {};

    if (dependencies) {
      const d = Array.from(
        dev ? this._addTypeScript(dependencies) : dependencies
      ).sort();

      for (const dep of d) {
        if (!deps[dep]) {
          if (this.depsRef[dep]) {
            deps[dep] = this.depsRef[dep].latestVersion || "*";
            if (deps[dep][0] !== "^" && deps[dep] !== "*") {
              deps[dep] = "^" + deps[dep];
            }
          } else {
            deps[dep] = "*";
            this.depsRef[dep] = {};
          }
        }
      }
    }

    return deps;
  }

  public configuring(): void {
    this.addProp(this.generatorName, {
      dependencies: this._filterDeps(this.getProp(
        "config:dependencies:prod"
      ) as Set<string>),
      devDependencies: this._filterDeps(
        this.getProp("config:dependencies:dev") as Set<string>,
        true
      ),
      peerDependencies: this.getProp("config:dependencies:peer"),
      optionalDependencies: this.getProp("config:dependencies:optional")
    });
  }

  public writing(): void {
    Promise.all(
      Object.keys(this.depsRef)
        .filter(
          (key): boolean => {
            const latestV = this.depsRef[key].latestVersion;
            // @ts-ignore
            const lastChecked = new Date(this.depsRef[key].lastChecked);

            return (
              !latestV ||
              isNaN(lastChecked) ||
              Date.now() - lastChecked.getTime() > 86400000
            );
          }
        )
        .map(
          async (key): Promise<void> => {
            try {
              const version = await latestVersion(key);
              this.depsRef[key] = {
                latestVersion: version,
                lastChecked: new Date()
              };
            } catch (e) {}
          }
        )
    )
      .then(
        (): void => {
          const keys = Object.keys(this.depsRef);
          for (const key of keys) {
            if (Object.keys(this.depsRef[key]).length === 0) {
              delete this.depsRef[key];
            }
          }
        }
      )
      .then(
        (): void => {
          this.fs.writeJSON(
            path.join(__dirname, "../../deps.json"),
            this.depsRef
          );
        }
      );
  }
}
