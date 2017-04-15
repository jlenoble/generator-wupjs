import {expect} from 'chai';
import Property from '../../generators/property';

describe('Testing class Property', function () {
  it('A property must have a name', function () {
    expect(() => new Property({defaultValue: 2})).to.throw(
      'Property has no name');
  });

  it('Setting a property', function () {
    const prop = new Property({
      name: 'version',
      defaultValue: 2,
    });

    expect(prop.name).to.equal('version');
    expect(prop.value).to.equal(2);
  });

  it('A property value can be changed', function () {
    const prop = new Property({
      name: 'version',
      defaultValue: 2,
    });

    prop.value = 3;

    expect(prop.value).to.equal(3);
  });

  it('A property emits on change', function (done) {
    const prop = new Property({
      name: 'version',
      defaultValue: 2,
    });

    prop.on('change', function (value) {
      expect(value).to.equal(3);
      done();
    });

    prop.value = 3;
  });
});
