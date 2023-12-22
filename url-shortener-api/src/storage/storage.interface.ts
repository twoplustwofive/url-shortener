export interface StorageInterface {
  set(key: string, value: string): Promise<void>;
  get(key: string): Promise<string | null>;
}

export class StorageInterfaceImpl implements StorageInterface {
  set(key: string, value: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  get(key: string): Promise<string> {
    throw new Error('Method not implemented.');
  }
}
