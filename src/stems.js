import path from 'path';

const dirs = (dir, gen) => {
  switch (dir) {
  case 'cssDir':
    return path.join(gen.get('buildDir'), 'css');
  case 'nodeDir':
    return 'node_modules';
  case 'staticDir':
    return path.join(gen.get('srcDir'), 'static');
  }
};

export {dirs};
