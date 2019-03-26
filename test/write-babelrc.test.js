import {testGenerator} from './helpers';

testGenerator('write-babelrc', {babel: ['env']}, {
  '.yo-rc.json': [
    /"babel-plugin-add-module-exports": "\^\d+\.\d+\.\d+"/,
  ],
  'package.json': [
    /"babel-plugin-add-module-exports": "\^\d+\.\d+\.\d+"/,
  ],
  '.babelrc': [
    /"presets": \["@babel\/preset-env"\]/,
    /"plugins": \["add-module-exports"\]/,
  ],
  '!.yo-rc.json': [
    /"@babel\/preset-react":\s*"\^\d+\.\d+\.\d+"/,
    /"react": "\^\d+\.\d+\.\d+"/,
    /"react-dom": "\^\d+\.\d+\.\d+"/,
  ],
  '!package.json': [
    /"@babel\/preset-react":\s*"\^\d+\.\d+\.\d+"/,
    /"react": "\^\d+\.\d+\.\d+"/,
    /"react-dom": "\^\d+\.\d+\.\d+"/,
  ],
  '!.babelrc': [
    /"presets": \["@babel\/preset-env", "@babel\/preset-react"\]/,
  ],
});

testGenerator('write-babelrc', {babel: ['env'], addons: ['React']}, {
  '.yo-rc.json': [
    /"@babel\/preset-react":\s*"\^\d+\.\d+\.\d+"/,
    /"babel-plugin-add-module-exports": "\^\d+\.\d+\.\d+"/,
    /"react": "\^\d+\.\d+\.\d+"/,
    /"react-dom": "\^\d+\.\d+\.\d+"/,
  ],
  'package.json': [
    /"@babel\/preset-react":\s*"\^\d+\.\d+\.\d+"/,
    /"babel-plugin-add-module-exports": "\^\d+\.\d+\.\d+"/,
    /"react": "\^\d+\.\d+\.\d+"/,
    /"react-dom": "\^\d+\.\d+\.\d+"/,
  ],
  '.babelrc': [
    /"presets": \["@babel\/preset-env", "@babel\/preset-react"\]/,
    /"plugins": \["add-module-exports"\]/,
  ],
});

testGenerator('write-babelrc', {babel: []}, {
  '!.yo-rc.json': [
    /"@babel\/preset-react":\s*"\^\d+\.\d+\.\d+"/,
    /"babel-plugin-add-module-exports": "\^\d+\.\d+\.\d+"/,
    /"react": "\^\d+\.\d+\.\d+"/,
    /"react-dom": "\^\d+\.\d+\.\d+"/,
  ],
  '!package.json': [
    /"@babel\/preset-react":\s*"\^\d+\.\d+\.\d+"/,
    /"babel-plugin-add-module-exports": "\^\d+\.\d+\.\d+"/,
    /"react": "\^\d+\.\d+\.\d+"/,
    /"react-dom": "\^\d+\.\d+\.\d+"/,
  ],
  '.babelrc': false,
});
