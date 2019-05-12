import testGenerator from "./common/test-generator";
import { prompt } from "./common/default-options";

const toLicense = (licenses: Wup.License[]): Wup.License => {
  let license: Wup.License;

  if (licenses.length > 1) {
    license = `(${licenses
      .filter((license): boolean => license !== "UNLICENSED")
      .join(" OR ")})`;
  } else {
    license = licenses[0] || "UNLICENSED";
  }

  return license;
};

const testLICENSE = (licenses: Wup.License[]): void => {
  return testGenerator({
    title: `Testing LICENSE: ${toLicense(licenses)}`,
    command: "yo wupjs:write:LICENSE",
    prompt: {
      ...prompt,
      "config:license": licenses
    },
    assertContent: {
      "package.json": true,
      LICENSE: true
    }
  });
};

testLICENSE(["MIT"]);
testLICENSE(["ISC"]);
testLICENSE(["BSD-2-CLAUSE"]);
testLICENSE(["BSD-3-CLAUSE"]);
testLICENSE(["APACHE-2.0"]);
testLICENSE(["CC-BY-SA-4.0"]);
testLICENSE(["EUPL-1.2"]);

const testGplLICENSE = (licenses: Wup.License[], only: boolean): void => {
  return testGenerator({
    title: `Testing LICENSE: ${toLicense(licenses)}-${
      only ? "only" : "or-later"
    }`,
    command: "yo wupjs:write:LICENSE",
    prompt: {
      ...prompt,
      "config:license": licenses,
      "config:license:GPL-suffix": only
    },
    assertContent: {
      "package.json": true,
      LICENSE: true
    }
  });
};

for (const only of [true, false]) {
  for (const gpl of [
    "GPL-2.0",
    "GPL-3.0",
    "LGPL-2.1",
    "LGPL-3.0",
    "AGPL-3.0"
  ]) {
    testGplLICENSE([gpl], only);
  }
}
