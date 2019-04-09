declare namespace Wup {
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
    composeAll(): void;
    composeWith(): this;
    getProp(name: PropName): PropValue | undefined;
    setProp(name: PropName | Props, value?: PropValue): this;
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

  interface Config {
    addGen(nameOrGen: GenName | BaseGenerator): this;
    addProp(name: PropName, value: PropValue): this;
    generators(): IterableIterator<GeneratorNode>;
    getProp(name: PropName): PropValue | undefined;
    hasProp(name: PropName): boolean;
    linkGens(parentGen: GenName, childGen: GenName): this;
    setProp(name: PropName, value: PropValue): this;
  }
}
