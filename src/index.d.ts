declare class JsonDb<T = any> {
  constructor(folderPath: string);
  #createFolderIfNotExists(): void;
  #createFileIfNotExists(key:string): void;
  #getFileName(name: string): string;
  insert(key: string, value: T): void;
  select(key: string, value: T): T | Array<Any>;
  update(
    key: string,
    where: null | Function,
    newData: Object | Function
  ): boolean;
  delete(key: string, where: T | undefined): void;
}

export = JsonDb;
