import {dirs} from './index';

const extendProps = gen => {
  Object.assign(gen, {
    dirs: function (dir) {
      return dirs(dir, this);
    },
  });
};

export default extendProps;
