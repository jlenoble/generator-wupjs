declare namespace Wup {
  interface BaseGenerator {
    readonly generatorName: GenName;
    get(name: Name): Value | undefined;
    set(name: Name | Props, value?: Value): void;
  }

  type Gen = string;
  type GenName = string;
  type Name = string;
  type Option = string | object;

  interface Options {
    [key: string]: Option;
  }

  type Path = string;

  interface Prop {
    name: Name;
    value: Value;
  }

  interface Props {
    [key: string]: Value;
  }

  type Value = string | object;
}
