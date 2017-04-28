import {dirs} from './index';

const extendProps = gen => {
  Object.assign(gen, {
    dirs: function (dir) {
      return dirs(dir, gen);
    },
  });
};

export default extendProps;
export const extendedProps = ['dirs'];
