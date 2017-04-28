import path from 'path';
import stringify from 'json-stable-stringify';
import joinGlobs from './join-globs';

const dirs = (dir, gen) => {
  switch (dir) {
  case 'cssDir':
    return path.join(gen.dirs('buildDir'), 'css');

  case 'nodeDir': case 'sassImportDir':
    return 'node_modules';

  case 'sassDir':
    return path.join(gen.dirs('staticDir'), 'scss');

  case 'staticDir':
    return path.join(gen.dirs('srcDir'), 'static');

  default:
    return gen.get(dir);
  }
};

const fullDir = (dir, gen) => {
  let [rel, dirs] = dir.split('#');
  if (!dirs) {
    dirs = rel;
    rel = undefined;
  }

  return dirs.split(',').map(dir => rel ?
    path.join(rel, gen.dirs(dir + 'Dir')) :
    gen.dirs(dir + 'Dir'));
};

const pattern = pat => pat === '**' ? '**/*' : '*';

const fullExt = ({ext, dir, pat}, gen) => {
  const _pat = pattern(pat) + '.';

  if (ext) {
    if (/js$/.test(ext) && gen.has('React')) {
      return [_pat + ext, _pat + 'jsx'];
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

const globs = (globHint, gen) => {
  const [dir, pat, ext] = globHint.split(':');

  return stringify(
    joinGlobs(
      fullDir(dir, gen),
      fullExt({dir, ext, pat}, gen)),
    {space: 2}
  ).replace(/"/g, `'`);
};

export {dirs, globs};
