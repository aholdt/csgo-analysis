export function RepositoryType(objectType: string) {
  return function <T extends { new (...constructorArgs: any[]) }>(constructor: T): any {
    constructor.prototype.objectType = objectType;
  };
}
