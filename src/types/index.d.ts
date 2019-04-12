declare namespace Wup {
  type Cpu = string;
  type Description = string;
  type DotSlashPath = string;
  type Email = string;
  type GenName = string;
  type License = string;
  type Name = string;
  type NotCpu = string;
  type NotOs = string;
  type Option = string | object;
  type Os = string;
  type Path = string;
  type PropName = string;
  type PropValue = string | object;
  type RelGlob = string;
  type RelPath = string;
  type Url = string;
  type Version = string;
  type VersionRange = string;
  type YearRange = string;

  interface Dependencies {
    [name: string]: VersionRange;
  }

  interface Options {
    [key: string]: Option;
  }

  interface Package {
    name: Name;
    version: Version;
    description: Description;
    keywords: string[];
  }

  interface Person {
    name: Name;
    email?: Email;
    url?: Url;
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
