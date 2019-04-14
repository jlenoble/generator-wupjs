import testGenerator from "./common/test-generator";
import globalConfig from "./common/global-config";

testGenerator({
  command: "yo wupjs:config:author:name",
  prompt: {
    "config:author:name": "Me Me"
  },
  globalConfig,
  assertContent: {}
});
