const getWriteGenerators = name => {
  switch (name) {
  case 'updated': case 'created':
    return ['write-license'];

  case 'author': case 'email': case 'license':
    return ['write-license', 'write-package'];

  case 'github': case 'name': case 'description': case 'libDir':
  case 'deps': case 'devDeps': case 'peerDeps':
    return ['write-package'];

  case 'babel':
    return ['write-babelrc', 'write-package'];

  case 'linters':
    return ['write-package'];

  default:
    return [];
  }
};

export default getWriteGenerators;
