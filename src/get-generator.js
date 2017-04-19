const getGenerator = name => {
  switch (name) {
  case 'author': case 'email':
    return 'who';

  case 'github':
    return 'github';

  case 'license':
    return 'license';

  case 'name': case 'description':
    return 'module';
  }
};

export default getGenerator;
