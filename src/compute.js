import stringify from 'json-stable-stringify';

const nodeDeps = (hint, gen) => {
  return stringify(gen.get(hint), {space: 2})
    .replace(/\n/g, '\n  ').replace(/\{\s*\}/, '{}');
};

export {nodeDeps};
