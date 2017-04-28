import {nodeDeps} from './compute';
import {dirs, globs} from './stems';

const makeMethod = (fn, gen) => function (arg) {
  return fn(arg, gen);
};

const funcs = [dirs, globs, nodeDeps];

export const extendedProps = funcs.map(fn => fn.name);

const extendProps = gen => {
  funcs.forEach(fn => {
    Object.assign(gen, {[fn.name]: makeMethod(fn, gen)});
  });
};

export default extendProps;
