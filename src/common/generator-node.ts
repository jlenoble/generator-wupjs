import BaseGenerator from "./base-generator";

type GenName = Wup.GenName;
type Options = Wup.Options;

export default class GeneratorNode implements Wup.GeneratorNode {
  protected readonly children: Set<GeneratorNode> = new Set();
  public readonly generator: BaseGenerator;
  public readonly name: GenName;
  protected readonly nodes: Map<GenName, GeneratorNode>;
  protected readonly options: Options;
  protected readonly parents: Set<GeneratorNode> = new Set();

  private static n: number = 15;

  public static *generators(
    nodes: IterableIterator<GeneratorNode>
  ): IterableIterator<GeneratorNode> {
    const leftNodes: Set<GeneratorNode> = new Set(nodes);

    for (const leftNode of leftNodes) {
      while (leftNodes.has(leftNode)) {
        GeneratorNode.n--;
        yield* leftNode.getFirstAncestors(leftNodes);
        if (!GeneratorNode.n) return;
      }
    }
  }

  public constructor(
    nameOrGen: GenName | BaseGenerator,
    nodes: Map<GenName, GeneratorNode>,
    options: Options
  ) {
    const name =
      typeof nameOrGen === "string" ? nameOrGen : nameOrGen.generatorName;

    if (nodes.has(name)) {
      throw new Error(`GeneratorNode ${name} is already defined`);
    }

    this.name = name;
    this.nodes = nodes;
    this.options = options;
    this.generator =
      nameOrGen instanceof BaseGenerator ? nameOrGen : this.createGen(name);
  }

  public addChild(name: GenName): this {
    // No need to add if a descendant already has name as child
    if (!this.hasDescendant(name)) {
      let gen: GeneratorNode | undefined = this.nodes.get(name);

      if (!gen) {
        gen = new GeneratorNode(name, this.nodes, this.options);
      } else {
        // Node already defined; Prevent circularity
        if (this.hasAncestor(name)) {
          throw new Error(
            `Cannot add ${name} as child to ${
              this.name
            } as it is already an ancestor`
          );
        }
      }

      this.children.add(gen);
      gen.parents.add(this);
    }

    return this;
  }

  public addParent(name: GenName): this {
    // No need to add if an ancestor already has name as parent
    if (!this.hasAncestor(name)) {
      let gen: GeneratorNode | undefined = this.nodes.get(name);

      if (!gen) {
        gen = new GeneratorNode(name, this.nodes, this.options);
      } else {
        // Node already defined; Prevent circularity
        if (this.hasDescendant(name)) {
          throw new Error(
            `Cannot add ${name} as parent to ${
              this.name
            } as it is already a descendant`
          );
        }
      }

      this.parents.add(gen);
      gen.children.add(this);
    }

    return this;
  }

  public createGen(name: GenName): BaseGenerator {
    if (this.nodes.has(name)) {
      throw new Error(`Creating subgenerator ${name} twice`);
    }

    let gen: BaseGenerator;

    try {
      // Method .create() does exist; .env is an instance of Yeoman Environment
      // @ts-ignore
      gen = this.options.env.create(`wupjs:${name}`, this.options);
    } catch (e) {
      // yeoman-test, unlike yo, does not collect subgenerators: fix that!
      // @ts-ignore
      this.options.env.lookup((): void => {});

      // @ts-ignore
      gen = this.options.env.create(`wupjs:${name}`, this.options);
    }

    return gen;
  }

  public getFirstAncestors(nodesLeft: Set<GeneratorNode>): Set<GeneratorNode> {
    const ancestors: Set<GeneratorNode> = new Set();

    if (nodesLeft.has(this)) {
      for (const parent of this.parents.values()) {
        for (const ancestor of parent.getFirstAncestors(nodesLeft)) {
          ancestors.add(ancestor);
        }
      }
      ancestors.add(this);
      nodesLeft.delete(this);
    }

    return ancestors;
  }

  public hasAncestor(name?: GenName): boolean {
    return (
      this.hasParent(name) ||
      Object.values(this.parents).some(
        (parent: GeneratorNode): boolean => parent.hasAncestor(name)
      )
    );
  }

  public hasChild(name?: GenName): boolean {
    return Object.values(this.children).some(
      (child: GeneratorNode): boolean => {
        return child.name === name;
      }
    );
  }

  public hasDescendant(name?: GenName): boolean {
    return (
      this.hasChild(name) ||
      Object.values(this.children).some(
        (child: GeneratorNode): boolean => child.hasDescendant(name)
      )
    );
  }

  public hasParent(name?: GenName): boolean {
    return Object.values(this.parents).some(
      (parent: GeneratorNode): boolean => {
        return parent.name === name;
      }
    );
  }
}
