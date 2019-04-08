declare namespace Wup {
  type Gen = string;
  type GenName = string;
  type Name = string;
  type Option = string | object;
  type Path = string;
  type Value = string | object;

  interface Options {
    [key: string]: Option;
  }

  interface Prop {
    name: Name;
    value: Value;
  }

  interface Props {
    [key: string]: Value;
  }

  interface BaseGenerator {
    readonly generatorName: GenName;
    get(name: Name): Value | undefined;
    set(name: Name | Props, value?: Value): void;
  }

  interface GeneratorNode {
    readonly name: GenName;
    readonly generator: BaseGenerator;
    hasAncestor(name?: GenName): boolean;
    hasChild(name?: GenName): boolean;
    hasDescendant(name?: GenName): boolean;
    hasParent(name?: GenName): boolean;
    addParent(name: GenName): this;
    addChild(name: GenName): this;
    getFirstAncestors(nodesLeft: Set<GeneratorNode>): Set<GeneratorNode>;
  }

  interface GeneratorNodes {
    config: Config | undefined;
  }

  interface Config {
    add(name: Name, value: Value): void;
    addGen(nameOrGen: GenName | BaseGenerator): void;
    generators(): IterableIterator<GeneratorNode>;
    get(name: Name): Value | undefined;
    has(name: Name): boolean;
    link(parentGen: GenName, childGen: GenName): void;
    set(name: Name, value: Value): void;
  }
}
