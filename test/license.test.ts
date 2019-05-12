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
