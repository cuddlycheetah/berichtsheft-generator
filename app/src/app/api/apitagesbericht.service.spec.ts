import { TestBed } from '@angular/core/testing';

import { APITagesberichtService } from './apitagesbericht.service';

describe('APITagesberichtService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: APITagesberichtService = TestBed.get(APITagesberichtService);
    expect(service).toBeTruthy();
  });
});
