import { TestBed } from '@angular/core/testing';

import { CogsHttpClient } from './cogs-http-client.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CogsAPIService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
    ],
  }));

  it('should be created', () => {
    const service: CogsHttpClient = TestBed.get(CogsHttpClient);
    expect(service).toBeTruthy();
  });
});
