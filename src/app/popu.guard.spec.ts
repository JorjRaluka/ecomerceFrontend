import { TestBed } from '@angular/core/testing';

import { PopuGuard } from './popu.guard';

describe('PopuGuard', () => {
  let guard: PopuGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PopuGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
