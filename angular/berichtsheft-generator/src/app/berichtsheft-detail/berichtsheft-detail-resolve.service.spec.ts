import { TestBed } from '@angular/core/testing';

import { BerichtsheftDetailResolveService } from './berichtsheft-detail-resolve.service';

describe('BerichtsheftDetailResolveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BerichtsheftDetailResolveService = TestBed.get(BerichtsheftDetailResolveService);
    expect(service).toBeTruthy();
  });
});
