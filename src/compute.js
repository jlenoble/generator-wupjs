import strgfy from 'json-stable-stringify';
import path from 'path';

const pattern = pat => pat === '**' ? '**/*' : '*';

const fullDir = ({rel, dir}, gen) => {
  return dir.split(',').map(dir => {
    const neg = dir[0] === '!';

    let _dir = neg ? dir.substring(1) : dir;
    _dir = gen.dirs(_dir + 'Dir');

    if (rel) {
      _dir = path.join(rel, _dir);
    }

    return neg ? '!' + _dir : _dir;
  });
};

const fullExt = ({rel, ext, dir, pat}, gen) => {
  if (!pat.includes('*')) {
     // Explicit filename, no actual pattern, so just return it
    return pat;
  }

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

const fullPaths = (pathHint, gen) => {
  let [rel, hint] = pathHint.split('#');

  if (!hint) {
    hint = rel;
    rel = undefined;
  }

  let [dir, file] = hint.split(':');
  dir += 'Dir';

  if (rel) {
    rel += 'Dir';
    return path.join(gen.dirs(rel), gen.dirs(dir), gen.filenames(file));
  }

  return path.join(gen.dirs(dir), gen.filenames(file));
};

const indent = ([str, n], gen) => {
  const indent = new Array(n);
  indent.fill(' ');
  return str.replace(/\n/g, '\n' + indent.join(''));
};

const nodeDeps = (hint, gen) => {
  return strgfy(gen.get(hint), {space: 2})
    .replace(/\n/g, '\n  ').replace(/\{\s*\}/, '{}');
};

const rel = (hint, gen) => {
  let [fromDir, toDir] = hint.split(':');
  fromDir = gen.dirs(fromDir + 'Dir');
  toDir = gen.dirs(toDir + 'Dir');
  return path.relative(fromDir, toDir);
};

const stringify = (obj, gen) => {
  if (Array.isArray(obj) && obj.length === 0) {
    return '[]';
  }

  if (Object.keys(obj).length === 0) {
    return '{}';
  }

  return strgfy(obj, {space: 2}).replace(/"/g, `'`);
};

export {fullDir, fullExt, fullPaths, indent, nodeDeps, rel, stringify};
