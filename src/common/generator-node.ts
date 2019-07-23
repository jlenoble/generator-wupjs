import { DepMesh, DepMeshOptions } from "organon";
import BaseGenerator from "./base-generator";

type GenName = Wup.GenName;

interface Options extends Wup.Options, DepMeshOptions<BaseGenerator> {}

export default class GeneratorNode extends DepMesh<BaseGenerator> {
  public readonly generator: BaseGenerator;

  private static n: number = 15;

  public static reset(): void {
    GeneratorNode.n = 15;
  }

  public static *generators(
    links: IterableIterator<GeneratorNode>
  ): IterableIterator<GeneratorNode> {
    const leftNodes: Set<GeneratorNode> = new Set(links);

    for (const leftNode of leftNodes) {
      while (leftNodes.has(leftNode)) {
        GeneratorNode.n--;
        yield* leftNode.getFirstAncestors(leftNodes);
        if (GeneratorNode.n <= 0) return;
      }
    }
  }

  public constructor(
    nameOrGen: GenName | BaseGenerator,
    links: Map<GenName, GeneratorNode>,
    options: Options
  ) {
    super(nameOrGen, links, options);

    this.generator =
      nameOrGen instanceof BaseGenerator
        ? nameOrGen
        : this.createGen(this.name);
  }

  public createGen(name: GenName): BaseGenerator {
    if (this.links.has(name)) {
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
}
