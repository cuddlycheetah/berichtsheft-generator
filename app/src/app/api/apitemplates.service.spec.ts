import { TestBed } from '@angular/core/testing';

import { APITemplatesService } from './apitemplates.service';

describe('APITemplatesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: APITemplatesService = TestBed.get(APITemplatesService);
    expect(service).toBeTruthy();
  });
});
