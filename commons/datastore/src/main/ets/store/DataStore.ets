export class DataStore {
  static set<T>(key: string, value: T): void {
    AppStorage.setOrCreate(key, value);
  }

  static get<T>(key: string, defaultValue?: T): T | undefined {
    return AppStorage.get<T>(key) ?? defaultValue;
  }

  static has(key: string): boolean {
    return AppStorage.has(key);
  }

  static delete(key: string): void {
    AppStorage.delete(key);
  }

  static clear(): void {
    AppStorage.clear();
  }
}