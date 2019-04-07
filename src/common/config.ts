import fs from "fs";
import path from "path";
import EventEmitter from "events";
import config from "config";
import Property from "./property";

const genName = "generator-wupjs";

type Path = Wup.Path;
type Name = Wup.Name;
type Value = Wup.Value;
type Props = Wup.Props;

export default class Config extends EventEmitter {
  protected properties: Map<Name, Property> = new Map();

  public constructor() {
    super();

    const appDir: Path = process.cwd();
    const yoRcJson: Path = path.join(appDir, ".yo-rc.json");

    let yoConfig: Props;

    try {
      yoConfig = JSON.parse(fs.readFileSync(yoRcJson, "utf8"));
    } catch (e) {
      yoConfig = { [genName]: {} };
    }

    Object.entries(yoConfig[genName]).forEach(
      ([name, value]): void => {
        this.add(name, value);
      }
    );
  }

  public add(name: Name, value: Value): void {
    if (this.has(name)) {
      this.set(name, value);
      return;
    }

    const prop = new Property({ name, value });

    prop.on(
      "change",
      (): void => {
        this.emit("change", prop.name);
      }
    );

    this.properties.set(name, prop);
  }

  public has(name: Name): boolean {
    return this.properties.has(name);
  }

  public get(name: Name): Value | undefined {
    let prop: Property | undefined = this.properties.get(name);

    if (prop === undefined && config.has(name)) {
      const value: Value = config.get(name);

      if (value !== undefined) {
        this.add(name, value);
        prop = this.properties.get(name);
      }
    }

    return prop ? prop.value : undefined;
  }

  public set(name: Name, value: Value): void {
    const prop = this.properties.get(name);

    if (prop) {
      prop.value = value;
    }
  }
}
