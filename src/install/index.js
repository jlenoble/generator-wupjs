import Base from '../base';

export default class extends Base {
  constructor (args, opts) {
    const options = Object.assign({
      props: ['deps', 'devDeps', 'peerDeps'],
      generator: 'install',
    }, opts);

    super(args, options);
  }

  initializing () {
    const deps = this.get('deps') || {};
    const devDeps = this.get('devDeps') || {};
    const peerDeps = this.get('peerDeps') || {};

    this.set({deps, devDeps, peerDeps});
  }

  install () {
    // const deps = this.get('deps');
    // const devDeps = this.get('devDeps');
    // const peerDeps = this.get('peerDeps');

    // this.npmInstall(deps);
    // this.npmInstall(devDeps);
    // this.npmInstall(peerDeps);
  }
}
