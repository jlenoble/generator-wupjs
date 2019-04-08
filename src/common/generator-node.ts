type GenName = Wup.GenName;

export default class GeneratorNode {
  public readonly name: GenName;
  protected readonly nodes: Map<GenName, GeneratorNode>;
  protected readonly parents: Set<GeneratorNode> = new Set();
  protected readonly children: Set<GeneratorNode> = new Set();

  private static n: number = 15;

  public static *generators(
    nodes: IterableIterator<GeneratorNode>
  ): IterableIterator<GeneratorNode> {
    const leftNodes: Set<GeneratorNode> = new Set(nodes);
    console.log(nodes, leftNodes);

    for (const leftNode of leftNodes) {
      console.log(leftNode.name);
      while (leftNodes.has(leftNode)) {
        console.log(GeneratorNode.n, ">>", leftNode.name, ">>", leftNodes.size);
        GeneratorNode.n--;
        yield* leftNode.getFirstAncestors(leftNodes);
        if (!GeneratorNode.n) return;
      }
    }
  }

  public constructor(name: GenName, nodes: Map<GenName, GeneratorNode>) {
    if (nodes.has(name)) {
      throw new Error(`GeneratorNode ${name} is already defined`);
    }

    this.name = name;
    this.nodes = nodes;
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

  public addParent(name: GenName): this {
    // No need to add if an ancestor already has name as parent
    if (!this.hasAncestor(name)) {
      let gen: GeneratorNode | undefined = this.nodes.get(name);

      if (!gen) {
        gen = new GeneratorNode(name, this.nodes);
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

  public addChild(name: GenName): this {
    // No need to add if a descendant already has name as child
    if (!this.hasDescendant(name)) {
      let gen: GeneratorNode | undefined = this.nodes.get(name);

      if (!gen) {
        gen = new GeneratorNode(name, this.nodes);
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
}
