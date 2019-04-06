import Base from "yeoman-generator";
import path from "path";
import config from "../config";

type Gen = Wup.Gen;
type Name = Wup.Name;
type Value = Wup.Value;
type Options = Wup.Options;
type Props = Wup.Props;

export default abstract class Generator extends Base {
  protected abstract get generatorName(): string;

  public composeWith(
    generator: Gen,
    options: Options = {},
    settings?: { local: string; link: "weak" | "strong" }
  ): this {
    let gen: Gen = generator;

    if (typeof generator === "string") {
      gen = path.join(__dirname, "..", generator);
    }

    super.composeWith(gen, options, settings);

    return this;
  }

  public get(name: Name): Value | undefined {
    return config.get(name);
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
