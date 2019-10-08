import { TestBed } from '@angular/core/testing';

import { APIBerichtshefteService } from './apiberichtshefte.service';

describe('APIBerichtshefteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: APIBerichtshefteService = TestBed.get(APIBerichtshefteService);
    expect(service).toBeTruthy();
  });
});
