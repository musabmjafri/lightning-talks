import { InjectionToken } from '@angular/core';
import { StorageService } from 'ngx-webstorage-service';

export const SERVICE_STORAGE =
  new InjectionToken<StorageService>('SERVICE_STORAGE');
