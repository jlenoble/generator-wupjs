const getWriteGenerator = name => {
  switch (name) {
  case 'updated': case 'created':
    return ['write-license'];

  case 'author': case 'email': case 'license':
    return ['write-license', 'write-package'];

  case 'github': case 'name': case 'description': case 'libDir':
    return ['write-package'];

  default:
    return [];
  }
};

export default getWriteGenerator;
