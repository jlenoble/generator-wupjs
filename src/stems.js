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

const fullDir = ({rel, ext, dir, pat}, gen) => {
  return dir.split(',').map(dir => rel ?
    path.join(rel, gen.dirs(dir + 'Dir')) :
    gen.dirs(dir + 'Dir'));
};

const pattern = pat => pat === '**' ? '**/*' : '*';

const fullExt = ({rel, ext, dir, pat}, gen) => {
  const _pat = pattern(pat) + '.';

  if (ext) {
    if (/.*js$/.test(ext) && gen.has('React') &&
      rel !== dirs('buildDir', gen)) {
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

const globs = (globHint, gen) => {
  let [rel, hint] = globHint.split('#');
  if (!hint) {
    hint = rel;
    rel = undefined;
  }
  const [dir, pat, ext] = hint.split(':');
  const hints = {rel, dir, pat, ext};

  return stringify(
    joinGlobs(
      fullDir(hints, gen),
      fullExt(hints, gen)),
    {space: 2}
  ).replace(/"/g, `'`);
};

export {dirs, globs};
