import path from 'path';

const dirs = (dir, gen) => {
  switch (dir) {
  case 'cssDir':
    return path.join(gen.get('buildDir'), 'css');

  case 'nodeDir': case 'sassImportDir':
    return 'node_modules';

  case 'sassDir':
    return path.join(gen.dirs('staticDir'), 'scss');

  case 'staticDir':
    return path.join(gen.get('srcDir'), 'static');

  default:
    return gen.get(dir);
  }
};

export {dirs};