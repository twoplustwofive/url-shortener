export interface StorageInterface {
    set(key: string, value: string): Promise<void>;
    get(key: string): Promise<string | null>;
}
