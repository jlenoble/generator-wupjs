import path from 'path';
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

const globs = (globHint, gen) => {
  let [rel, hint] = globHint.split('#');
  if (!hint) {
    hint = rel;
    rel = undefined;
  }
  const [dir, pat, ext] = hint.split(':');
  const hints = {rel, dir, pat, ext};

  return gen.stringify(joinGlobs(gen.fullDir(hints), gen.fullExt(hints)));
};

export {dirs, globs};
