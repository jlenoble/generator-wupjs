import testGenerator from "./common/test-generator";

testGenerator({
  command: "yo wupjs:config:license",
  prompt: {
    "config:license": []
  },
  assertContent: {
    "package.json": true,
    LICENSE: true
  }
});

testGenerator({
  command: "yo wupjs:config:license",
  prompt: {
    "config:license": ["MIT"]
  },
  assertContent: {
    "package.json": true,
    LICENSE: true
  }
});

testGenerator({
  command: "yo wupjs:config:license",
  prompt: {
    "config:license": ["MIT", "APACHE-2.0"]
  },
  assertContent: {
    "package.json": true,
    LICENSE: true
  }
});

testGenerator({
  command: "yo wupjs:config:license",
  prompt: {
    "config:license": ["GPL-3.0"],
    "config:license:GPL-suffix": false
  },
  assertContent: {
    "package.json": true,
    LICENSE: true
  }
});

testGenerator({
  command: "yo wupjs:config:license",
  prompt: {
    "config:license": ["GPL-3.0"],
    "config:license:GPL-suffix": true
  },
  assertContent: {
    "package.json": true,
    LICENSE: true
  }
});

testGenerator({
  command: "yo wupjs:config:license",
  prompt: {
    "config:license": ["SEE IN FILE"],
    "config:license:SEE": "CUSTOM_LICENSE"
  },
  assertContent: {
    "package.json": true,
    LICENSE: true
  }
});
