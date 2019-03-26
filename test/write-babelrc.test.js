import {testGenerator} from './helpers';

testGenerator('write-babelrc', {babel: ['env']}, {
  '.yo-rc.json': [
    /"babel-plugin-add-module-exports": "\^\d+\.\d+\.\d+"/,
  ],
  'package.json': [
    /"babel-plugin-add-module-exports": "\^\d+\.\d+\.\d+"/,
  ],
  '.babelrc': [
    /"presets": \[\s+\["@babel\/preset-env", \{\s+"targets": \{\s+"node": "current"\s+\}\s+\}\]\s+\]/,
    /"plugins": \[\s+"add-module-exports"\s+\]/,
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
    /"presets": \[\s+\["@babel\/preset-env", \{\s+"targets": \{\s+"node": "current"\s+\}\s+\}\]\s+,\s+"@babel\/preset-react"\s+\]/,
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
    /"presets": \[\s+\["@babel\/preset-env", \{\s+"targets": \{\s+"node": "current"\s+\}\s+\}\],\s+"@babel\/preset-react"\s+\]/,
    /"plugins": \[\s+"add-module-exports"\s+\]/,
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
