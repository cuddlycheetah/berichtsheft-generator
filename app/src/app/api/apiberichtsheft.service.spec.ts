import { TestBed } from '@angular/core/testing';

import { APIBerichtsheftService } from './apiberichtsheft.service';

describe('APIBerichtsheftService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: APIBerichtsheftService = TestBed.get(APIBerichtsheftService);
    expect(service).toBeTruthy();
  });
});
