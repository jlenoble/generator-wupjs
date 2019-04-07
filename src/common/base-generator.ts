import Base from "yeoman-generator";
import path from "path";
import Config from "./config";

type Gen = Wup.Gen;
type GenName = Wup.GenName;
type Name = Wup.Name;
type Value = Wup.Value;
type Options = Wup.Options;
type Props = Wup.Props;

const config = new Config();

export default abstract class Generator extends Base {
  // abstract: Make sure all children define their names
  protected abstract get generatorName(): string;

  public composeWith(
    generator: Gen,
    options: Options = {},
    settings?: { local: string; link: "weak" | "strong" }
  ): this {
    return super.composeWith(this.getGen(generator), options, settings);
  }

  public get(name: Name): Value | undefined {
    return config.get(name);
  }

  public getGen(generator: GenName | Gen): Gen {
    let gen: Gen = generator;

    if (typeof generator === "string") {
      gen = path.join(__dirname, "..", generator);
    }

    return gen;
  }

  public set(name: Name | Props, value?: Value): void {
    let props: Props;

    if (typeof name === "object") {
      props = name;
    } else if (value !== undefined) {
      props = { [name]: value };
    } else {
      throw new Error(`Cannot assign value ${value} to key ${name}`);
    }

    Object.keys(props).forEach(
      (name): void => {
        config.set(name, props[name]);
      }
    );
  }
}
