import {testGenerator} from './helpers';

testGenerator('license', {license: 'GPL-3.0'}, {
  '.yo-rc.json': [/"license": "GPL-3.0"/],
  'LICENSE': [/GPL-3.0 License/],
  'package.json': [/"license": "GPL-3.0"/],
});
