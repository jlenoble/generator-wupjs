import {testGenerator} from './helpers';

testGenerator('github', {github: 'me'}, {
  '.yo-rc.json': [/"github": "me"/],
  'package.json': [
    /"repository": \{\s*"type": "git",\s*"url": "git:\/\/github\.com\/me\/[0-9a-f]{40}\.git"\s*\}/,
  ],
});
