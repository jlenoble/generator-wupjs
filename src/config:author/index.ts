import Base from "../generator";

export default class Author extends Base {
  protected readonly generatorName: string = "config:author";

  public initializing(): void {
    this.composeWith("config:author:name").composeWith("config:author:email");
  }
}
