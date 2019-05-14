/* eslint-disable @typescript-eslint/no-explicit-any */

export default class PromiseMap extends Map<any, Promise<any>> {
  public set(key: any, value: any): this {
    const promise = this.has(key)
      ? (this.get(key) as Promise<any>)
          .then((): void => {}, (): void => {})
          .finally((): Promise<any> => value)
      : Promise.resolve(value);

    super.set(key, promise);

    promise
      .then((): void => {}, (): void => {})
      .finally(
        (): void => {
          this.delete(key);
        }
      );

    return this;
  }

  public async complete(): Promise<void> {
    const promises = Array.from(this.values());

    return Promise.all(promises).then(
      async (): Promise<void> => {
        // Before all promises are resolved, more promises may have been added
        // so check on that.
        if (this.size) {
          return this.complete();
        }
      }
    );
  }
}
