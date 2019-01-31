import { TestBed } from '@angular/core/testing';

import { ApigftService } from './apigft.service';

describe('ApigftService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApigftService = TestBed.get(ApigftService);
    expect(service).toBeTruthy();
  });
});
