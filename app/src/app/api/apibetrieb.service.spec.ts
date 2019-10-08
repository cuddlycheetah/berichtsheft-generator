import { TestBed } from '@angular/core/testing';

import { APIBetriebService } from './apibetrieb.service';

describe('APIBetriebService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: APIBetriebService = TestBed.get(APIBetriebService);
    expect(service).toBeTruthy();
  });
});
