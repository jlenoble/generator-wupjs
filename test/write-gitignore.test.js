import {testGenerator} from './helpers';

testGenerator('write-gitignore', undefined, {
  '.gitignore': true,
  '!.gitignore': [
    /\.sass-cache/,
  ],
});

testGenerator('write-gitignore', {preprocessors: ['Compass']}, {
  '.gitignore': [
    /\.sass-cache/,
  ],
});
