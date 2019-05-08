import path from "path";
import Base from "../common/base-generator";

type Path = Wup.Path;

interface Props {
  grammar: string;
  rule: string;
  grammarDir: Path;
  dataDir: Path;
  parserDir: Path;
  listenerDir: Path;
  visitorDir: Path;
  listener: string;
  visitor: string;
  parsers: string[];
}

export default class WriteParser extends Base {
  protected props?: Props;

  public constructor(args: string | string[], options: {}) {
    super(
      args,
      Object.assign({}, options, {
        generatorName: "write:parser",
        dependsOn: ["config:paths", "config:parser"]
      })
    );
  }

  public configuring(): void {
    const grammar = this.getProp("config:parser:grammar") as string;
    const rule = this.getProp("config:parser:rule") as string;
    const grammarDir = this.getProp("config:paths:grammar") as Path;
    const dataDir = this.getProp("config:paths:data") as Path;
    const parserDir = this.getProp("config:paths:parser") as Path;
    const listenerDir = this.getProp("config:paths:listener") as Path;
    const visitorDir = this.getProp("config:paths:visitor") as Path;
    const listener = this.getProp("config:parser:listener") as string;
    const visitor = this.getProp("config:parser:visitor") as string;
    const parsers = this.getProp("config:parser:parsers") as string[];

    this.props = {
      grammar,
      rule,
      grammarDir,
      dataDir,
      parserDir,
      listenerDir,
      visitorDir,
      listener,
      visitor,
      parsers
    };
  }

  public writing(): void {
    if (this.getProp("config:languages:antlr4")) {
      const props: Props = this.props as Props;

      this.fs.copyTpl(
        this.templatePath("grammar.ejs"),
        this.destinationPath(
          path.join(props.grammarDir, `${props.grammar}.g4`)
        ),
        props
      );

      this.fs.copyTpl(
        this.templatePath("data.ejs"),
        this.destinationPath(path.join(props.dataDir, "data.txt")),
        props
      );

      if (props.parsers.includes("Listener")) {
        this.fs.copyTpl(
          this.templatePath("listener.ejs"),
          this.destinationPath(
            path.join(props.listenerDir, props.listener + ".js")
          ),
          props
        );
      }

      if (props.parsers.includes("Visitor")) {
        this.fs.copyTpl(
          this.templatePath("visitor.ejs"),
          this.destinationPath(
            path.join(props.visitorDir, props.visitor + ".js")
          ),
          props
        );
      }
    }
  }
}
