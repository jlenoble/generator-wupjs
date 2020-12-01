/* eslint-disable @typescript-eslint/no-explicit-any */

const empty = (): void => {
  // noop
};

export default class PromiseMap extends Map<any, Promise<any>> {
  public set(key: any, value: any): this {
    const promise = this.has(key)
      ? (this.get(key) as Promise<any>)
          .then(empty, empty)
          .finally((): Promise<any> => value)
      : Promise.resolve(value);

    super.set(key, promise);

    promise.then(empty, empty).finally((): void => {
      this.delete(key);
    });

    return this;
  }

  public async complete(): Promise<void> {
    const promises = Array.from(this.values());

    return Promise.all(promises)
      .then(empty, empty)
      .finally(
        async (): Promise<void> => {
          // Before all promises are resolved, more promises may have been added
          // so check on that.
          if (this.size) {
            // There are new pending promises in the queue, wait for them
            return this.complete();
          }
        }
      );
  }
}
