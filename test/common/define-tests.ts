type Options = Wup.Options;

const sortTests = (assertContent: {
  [file: string]: RegExp[] | true;
}): { tests: Options; snapshots: string[] } => {
  const tests: { [k: string]: RegExp[] | true } = {
    ".yo-rc.json": [
      /"createdWith": "\d+\.\d+\.\d+"/,
      /"modifiedWith": "\d+\.\d+\.\d+"/,
      /"createdOn": "\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\.\d{3}Z"/,
      /"modifiedOn": "\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\.\d{3}Z"/
    ]
  };

  const snapshots: Set<string> = new Set([".yo-rc.json"]);

  if (Array.isArray(assertContent)) {
    tests[".yo-rc.json"] = (tests[".yo-rc.json"] as RegExp[]).concat(
      assertContent
    );
  } else {
    Object.keys(assertContent).forEach(
      (file: string): void => {
        tests[file] = Array.isArray(tests[file])
          ? (tests[file] as RegExp[]).concat(
              Array.isArray(assertContent[file])
                ? (assertContent[file] as RegExp[])
                : []
            )
          : assertContent[file];

        snapshots.add(file[0] !== "!" ? file : file.substring(1));
      }
    );
  }

  return { tests, snapshots: Array.from(snapshots) };
};

export default sortTests;
