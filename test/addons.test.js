import {testGenerator} from './helpers';

testGenerator('addons', {addons: ['React']}, {
  '.yo-rc.json': [
    /"addons"/,
    /"React"/,
  ],
  'package.json': [
    /"babel-preset-react": "\*"/,
    /"react": "\*"/,
    /"react-dom": "\*"/,
  ],
});
