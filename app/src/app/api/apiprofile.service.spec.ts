import { TestBed } from '@angular/core/testing';

import { APIProfileService } from './apiprofile.service';

describe('APIProfileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: APIProfileService = TestBed.get(APIProfileService);
    expect(service).toBeTruthy();
  });
});
