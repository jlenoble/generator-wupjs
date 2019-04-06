declare namespace Wup {
  type Gen = string;
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
