declare namespace Wup {
  interface PackageJson {
    name: Name;
    version: Version;
    description: Description;
    keywords: string[];
    homepage?: Url;
    bugs?: Bugs;
    license: License;
    author: Name | Person;
    contributors?: (Name | Person)[];
    files?: RelGlob[];
    main?: RelPath;
    types?: string;
    browser?: RelPath;
    bin?: DotSlashPath | { [name: string]: DotSlashPath };
    man?: DotSlashPath | DotSlashPath[];
    directories?: {
      lib?: RelPath;
      bin?: RelPath;
      man?: RelPath;
      doc?: RelPath;
      example?: RelPath;
      test?: RelPath;
    };
    repository: Repository;
    scripts?: Record<string, unknown>;
    config?: Record<string, unknown>;
    dependencies?: Dependencies;
    devDependencies?: Dependencies;
    peerDependencies?: Dependencies;
    bundledDependencies?: Name[];
    optionalDependencies?: Dependencies;
    engines?: { node: VersionRange; npm?: VersionRange };
    os?: (Os | NotOs)[];
    cpu?: (Cpu | NotCpu)[];
    private?: true;
    publishConfig?: Record<string, unknown>;
  }
}
