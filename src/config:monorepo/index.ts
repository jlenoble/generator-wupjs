import fs from "fs-extra";
import path from "path";
import dependencyTree from "dependency-tree";
import Base from "../common/base-generator";
import { validate } from "../config:paths";

type Path = Wup.Path;

const getMain = (gen: Base, packageDir: Path): string => {
  return path.join(
    packageDir,
    ((gen.fs.readJSON(
      path.join(packageDir, "package.json"),
      {}
    ) as unknown) as Wup.PackageJson).main || "MISSING"
  );
};

const getPackage = (
  p: Path,
  packageDir: Path,
  activePackages: string[]
): string => {
  const chunks = p.split("node_modules/");
  const chunk = chunks[chunks.length - 1];

  if (!chunk.includes(`${packageDir}/`)) {
    const pck = chunk.match(/^([^/]+)/);
    if (pck !== null && activePackages.includes(pck[1])) {
      return pck[1];
    }
  }

  return "";
};

export default class Mono extends Base {
  public constructor(args: string | string[], options: Wup.Options) {
    super(
      args,
      Object.assign({}, options, {
        generatorName: "config:monorepo",
        dependsOn: ["config:paths"],
        willWrite: ["write:monorepo"],
      })
    );
  }

  public initializing(): void {
    this.addProp(this.generatorName, this.config.get("monorepo") || false);

    if (this.getProp(this.generatorName)) {
      this.addProp(
        "config:paths:packages",
        this.config.get("packagesDir") || "packages"
      );

      this.addProp(
        this.generatorName + ":packages",
        this.config.get("activePackages") || []
      );
    }
  }

  public async prompting(): Promise<void> {
    if (this.mustPrompt) {
      let prompts: Wup.Options[] = [
        {
          type: "confirm",
          name: this.generatorName,
          message: "Will this be a monorepository ?",
          default: this.getProp(this.generatorName) as boolean,
        },
      ];

      this.addProp(await this.prompt(prompts));

      this.config.set("monorepo", this.getProp(this.generatorName));

      if (this.config.get("monorepo")) {
        prompts = [
          {
            type: "input",
            name: "config:paths:packages",
            message: "Packages directory:",
            default: this.getProp("config:paths:packages") || "packages",
            validate,
          },
        ];

        this.addProp(await this.prompt(prompts));

        const dir = this.getProp("config:paths:packages") as Path;

        this.config.set("packagesDir", dir);

        try {
          const links = [];

          for (const file of await fs.readdir(dir)) {
            const fullPath = path.join(dir, file);
            const stats = await fs.lstat(fullPath);

            if (stats.isSymbolicLink()) {
              links.push(file);
            }
          }

          prompts = [
            {
              type: "checkbox",
              name: this.generatorName + ":packages",
              message: "Activate/deactivate TDD for packages:",
              choices: links,
              default:
                (this.getProp(this.generatorName + ":packages") as string[]) ||
                [],
            },
          ];

          this.addProp(await this.prompt(prompts));
        } catch (e) {
          // empty
        } finally {
          this.config.set(
            "activePackages",
            this.getProp(this.generatorName + ":packages") || []
          );
        }
      }
    }
  }

  public configuring(): void {
    if (this.getProp(this.generatorName)) {
      const packagesDir =
        (this.getProp("config:paths:packages") as Path) || "packages";
      const activePackages =
        (this.getProp(this.generatorName + ":packages") as string[]) || [];
      const active: string[] = [];
      const deps: { [k: string]: string[] } = {};

      activePackages.forEach((pack): void => {
        const packageDir = path.join(packagesDir, pack);
        const filename = getMain(this, packageDir);

        const tree = dependencyTree({
          filename,
          directory: packageDir,
          filter: (p): boolean => {
            return !!getPackage(p, packageDir, activePackages);
          },
        });

        const dependencies =
          Object.keys(tree).map((p): string[] => {
            return Object.keys(tree[p])
              .map((p): string => getPackage(p, packageDir, activePackages))
              .map((pck): string =>
                path.join(
                  packagesDir,
                  pck,
                  "mochawesome-report/mochawesome.json"
                )
              );
          })[0] || [];

        if (dependencies.length) {
          const pck = `${path.join(packagesDir, pack)}`;
          active.push(pck);
          deps[pck] = dependencies;
        }
      });

      this.addProp("config:monorepo:active", active);
      this.addProp("config:monorepo:deps", deps);
    }
  }
}
