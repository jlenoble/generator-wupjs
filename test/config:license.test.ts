import testGenerator from "./common/test-generator";

testGenerator({
  title: "Setting no license",
  command: "yo wupjs:config:license",
  prompt: {
    "config:license": []
  }
});

testGenerator({
  title: "Setting MIT license",
  command: "yo wupjs:config:license",
  prompt: {
    "config:license": ["MIT"]
  }
});

testGenerator({
  title: "Setting dual license",
  command: "yo wupjs:config:license",
  prompt: {
    "config:license": ["MIT", "APACHE-2.0"]
  }
});

testGenerator({
  title: "Setting GPL license with 'only' suffix",
  command: "yo wupjs:config:license",
  prompt: {
    "config:license": ["GPL-3.0"],
    "config:license:GPL-suffix": false
  }
});

testGenerator({
  title: "Setting GPL license with 'or-later' suffix",
  command: "yo wupjs:config:license",
  prompt: {
    "config:license": ["GPL-3.0"],
    "config:license:GPL-suffix": true
  }
});

testGenerator({
  title: "Setting license pointing to custom file",
  command: "yo wupjs:config:license",
  prompt: {
    "config:license": ["SEE IN FILE"],
    "config:license:SEE": "CUSTOM_LICENSE"
  }
});
