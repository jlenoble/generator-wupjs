import path from 'path';

const dirs = (dir, gen) => {
  switch (dir) {
  case 'staticDir':
    return path.join(gen.get('srcDir'), 'static');
  }
};

export {dirs};
