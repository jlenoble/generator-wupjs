import {testGenerator} from './helpers';

testGenerator('write-scss', {preprocessors: ['Compass']}, {
  'src/static/scss/style.scss': true,
});
