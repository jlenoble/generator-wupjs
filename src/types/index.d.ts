declare namespace Wup {
  type Gen = string;
  type GenName = string;
  type PropName = string;
  type Option = string | object;
  type Path = string;
  type PropValue = string | object;

  interface Options {
    [key: string]: Option;
  }

  interface Prop {
    name: PropName;
    value: PropValue;
  }

  interface Props {
    [key: string]: PropValue;
  }

  interface BaseGenerator {
    readonly generatorName: GenName;
    getProp(name: PropName): PropValue | undefined;
    setProp(name: PropName | Props, value?: PropValue): void;
  }

  interface GeneratorNode {
    readonly generator: BaseGenerator;
    readonly name: GenName;
    addChild(name: GenName): this;
    addParent(name: GenName): this;
    getFirstAncestors(nodesLeft: Set<GeneratorNode>): Set<GeneratorNode>;
    hasAncestor(name?: GenName): boolean;
    hasChild(name?: GenName): boolean;
    hasDescendant(name?: GenName): boolean;
    hasParent(name?: GenName): boolean;
  }

  interface GeneratorNodes {
    config: Config | undefined;
  }

  interface Config {
    add(name: PropName, value: PropValue): void;
    addGen(nameOrGen: GenName | BaseGenerator): void;
    generators(): IterableIterator<GeneratorNode>;
    get(name: PropName): PropValue | undefined;
    has(name: PropName): boolean;
    link(parentGen: GenName, childGen: GenName): void;
    set(name: PropName, value: PropValue): void;
  }
}
