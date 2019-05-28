import { Editor } from "mem-fs-editor";
import latestVersion from "latest-version";
import path from "path";
import semver from "semver";
import PromiseMap from "./promise-map";

export interface Dep {
  latestVersion: string;
  lastChecked: string;
  deprecated?: boolean;
}

export interface Deps {
  [k: string]: Dep;
}

export default class RefDeps {
  protected readonly depsFile: string = path.join(__dirname, "../../deps.json");
  protected readonly fs: Editor;
  protected readonly deps: Deps;
  protected readonly pending: PromiseMap = new PromiseMap();

  public constructor(fs: Editor) {
    this.fs = fs;
    this.deps = fs.readJSON(this.depsFile, {});
  }

  public mustUpdate(name: string): boolean {
    if (this.pending.has(name)) {
      return false;
    }

    const dep = this.deps[name];

    if (dep) {
      if (dep.deprecated) {
        return false;
      }

      const lastChecked = new Date(dep.lastChecked);

      if (isNaN(+lastChecked)) {
        return true;
      }

      const checkedRecently = Date.now() - lastChecked.getTime() < 86400000; // one day
      const checkedAWhileAgo = Date.now() - lastChecked.getTime() > 2592000000; // 30 days

      if (
        (!checkedRecently &&
          dep.latestVersion !== `Package \`${name}\` could not be found`) ||
        checkedAWhileAgo
      ) {
        return true;
      }

      return !dep.latestVersion;
    }

    return false;
  }

  public hasDep(name: string): boolean {
    const dep = this.deps[name];

    if (dep) {
      const { latestVersion } = dep;
      const lastChecked = new Date(dep.lastChecked);

      return !!semver.valid(latestVersion) && !isNaN(+lastChecked);
    }

    return false;
  }

  public getDep(name: string): Dep | undefined {
    return this.deps[name];
  }

  public isDeprecated(name: string): boolean {
    return !!(this.deps[name] && this.deps[name].deprecated);
  }

  public async addDep(
    name: string,
    { typescript = false }: { typescript: boolean } = { typescript: false }
  ): Promise<void> {
    let dep = this.deps[name];

    if (!dep) {
      dep = this.deps[name] = {
        latestVersion: "",
        lastChecked: new Date().toUTCString()
      };
    }

    if (!this.mustUpdate(name)) {
      return;
    }

    const ts = typescript && !name.includes("@types/");

    try {
      const vs = latestVersion(name);

      this.pending.set(name, vs);

      const version = await vs;

      dep.latestVersion = version;

      if (ts) {
        this.addDep(`@types/${name}`);
      }
    } catch (e) {
      dep.latestVersion = e.message;
    } finally {
      dep.lastChecked = new Date().toUTCString();
    }
  }

  public async complete(): Promise<void> {
    return this.pending.complete();
  }

  public writeJSON(): void {
    this.fs.writeJSON(this.depsFile, this.deps);
  }
}
