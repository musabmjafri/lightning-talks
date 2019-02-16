import { Inject, Injectable } from '@angular/core';
import { StorageService as NgxStorageService } from 'ngx-webstorage-service';
import { SERVICE_STORAGE } from '../../constants/storage.constant';

@Injectable({
  providedIn: 'root',
})
export class StorageService<T = any> implements Partial<NgxStorageService<T>> {
  constructor(
    @Inject(SERVICE_STORAGE) private storage: NgxStorageService,
  ) { }

  public has(key: string): boolean {
    return this.storage.has(key);
  }

  public get(key: string): T | undefined {
    return this.storage.get(key);
  }

  public set(key: string, value: T): void {
    return this.storage.set(key, value);
  }

  public remove(key: string): void {
    return this.storage.remove(key);
  }

  public clear(): void {
    return this.storage.clear();
  }
}
