import path from 'path';

export default function joinGlobs (...args) {
  const len = args.length;

  try {
    switch (len) {
    case 0:
      return [];

    case 1:
      {
        const [arg] = args;
        return Array.isArray(arg) ? arg : [arg];
      }

    case 2:
      {
        const [arg1, arg2] = args;
        if (Array.isArray(arg1)) {
          return arg1.map(arg => joinGlobs(arg, arg2)).reduce((arr1, arr2) => {
            return arr1.concat(arr2);
          }, []);
        } else if (Array.isArray(arg2)) {
          return arg2.map(arg => path.join(arg1, arg));
        } else {
          return [path.join(arg1, arg2)];
        }
      }

    default:
      {
        const arg1 = args[len - 2];
        const arg2 = args[len - 1];
        args.pop();
        args.pop();
        return joinGlobs(...args, joinGlobs(arg1, arg2));
      }
    }
  } catch (err) {
    if (err.message.match('Path must be a string')) {
      throw new TypeError('Failed to join globs, recieved: ' + args);
      return;
    }
    throw err;
  }
}
