import { TestBed } from '@angular/core/testing';

import { APIQueueService } from './apiqueue.service';

describe('APIQueueService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: APIQueueService = TestBed.get(APIQueueService);
    expect(service).toBeTruthy();
  });
});
