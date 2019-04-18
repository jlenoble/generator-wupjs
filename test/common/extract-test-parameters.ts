type Options = Wup.Options;

const extractTestParameters = (assertContent: {
  [file: string]: RegExp[] | true;
}): {
  matchFiles: Options;
  snapshotFiles: string[];
  expectedFiles: string[];
  rejectedFiles: string[];
} => {
  const matchFiles: { [k: string]: RegExp[] } = {
    ".yo-rc.json": [
      /"createdWith": "\d+\.\d+\.\d+"/,
      /"modifiedWith": "\d+\.\d+\.\d+"/,
      /"createdOn": "\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\.\d{3}Z"/,
      /"modifiedOn": "\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\.\d{3}Z"/
    ]
  };

  const expectedFiles: Set<string> = new Set([".yo-rc.json"]);
  const rejectedFiles: Set<string> = new Set();
  const snapshotFiles: Set<string> = new Set();

  if (Array.isArray(assertContent)) {
    matchFiles[".yo-rc.json"] = (matchFiles[".yo-rc.json"] as RegExp[]).concat(
      assertContent
    );
  } else {
    Object.keys(assertContent).forEach(
      (file: string): void => {
        const patterns = Array.isArray(assertContent[file])
          ? (assertContent[file] as RegExp[])
          : [];

        if (patterns.length) {
          matchFiles[file] = Array.isArray(matchFiles[file])
            ? (matchFiles[file] as RegExp[]).concat(patterns)
            : patterns.concat();
        }

        file = file[0] !== "!" ? file : file.substring(1);

        if (assertContent[file] === true) {
          snapshotFiles.add(file);
        }

        if (assertContent[file] !== false) {
          expectedFiles.add(file);
        } else {
          rejectedFiles.add(file);
        }
      }
    );
  }

  return {
    matchFiles,
    snapshotFiles: Array.from(snapshotFiles),
    expectedFiles: Array.from(expectedFiles),
    rejectedFiles: Array.from(rejectedFiles)
  };
};

export default extractTestParameters;
