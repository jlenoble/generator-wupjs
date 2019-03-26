import {formatArray, fullDir, fullExt, fullPaths, indent, nodeDeps,
  rel, stringify} from './compute';
import {dirs, filenames, filepaths, globs} from './stems';

const makeMethod = (fn, gen) => function (arg) {
  return fn(arg, gen);
};

const funcs = [dirs, filenames, filepaths, formatArray, fullDir, fullExt,
  fullPaths, indent, globs, nodeDeps, rel, stringify];

export const extendedProps = funcs.map(fn => fn.name);

const extendProps = gen => {
  funcs.forEach(fn => {
    Object.assign(gen, {[fn.name]: makeMethod(fn, gen)});
  });
};

export default extendProps;
