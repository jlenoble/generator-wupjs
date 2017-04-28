import strgfy from 'json-stable-stringify';
import path from 'path';

const pattern = pat => pat === '**' ? '**/*' : '*';

const fullDir = ({rel, dir}, gen) => {
  return dir.split(',').map(dir => rel ?
    path.join(rel, gen.dirs(dir + 'Dir')) :
    gen.dirs(dir + 'Dir'));
};

const fullExt = ({rel, ext, dir, pat}, gen) => {
  const _pat = pattern(pat) + '.';

  if (ext) {
    if (/.*js$/.test(ext) && gen.has('React') &&
      rel !== gen.dirs('buildDir', gen)) {
      return [_pat + ext, _pat + ext + 'x'];
    }

    return _pat + ext;
  }

  switch(dir) {
  case 'sass':
    return _pat + 'scss';

  default:
    return _pat + dir;
  }
};

const nodeDeps = (hint, gen) => {
  return strgfy(gen.get(hint), {space: 2})
    .replace(/\n/g, '\n  ').replace(/\{\s*\}/, '{}');
};

const stringify = (obj, gen) => {
  return strgfy(obj, {space: 2}).replace(/"/g, `'`);
};

export {fullDir, fullExt, nodeDeps, stringify};
