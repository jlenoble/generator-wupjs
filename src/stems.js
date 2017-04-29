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

const filenames = (file, gen) => {
  switch (file) {
  case 'bundleRoot':
    return 'demo.js';

  case 'testBundleRoot':
    return 'index.test.js';

  case 'bundle':
    return 'bundle.js';

  case 'testBundle':
    return 'test-bundle.js';

  case 'indexPage':
    return 'index.html';

  case 'runnerPage':
    return 'runner.html';
  }
};

const filepaths = (pathHint, gen) => {
  switch (pathHint) {
  case 'bundleRoot':
    return gen.fullPaths('build#src:bundleRoot');

  case 'testBundleRoot':
    return gen.fullPaths('build#test:testBundleRoot');

  case 'testBundle':
    return gen.fullPaths('build:testBundle');

  case 'indexPage':
    return gen.fullPaths('static:indexPage');

  case 'runnerPage':
    return gen.fullPaths('test:runnerPage');
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

export {dirs, filenames, filepaths, globs};
