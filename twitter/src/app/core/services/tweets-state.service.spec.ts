import { TestBed } from '@angular/core/testing';

import { TweetsStateService } from './tweets-state.service';

describe('TweetsStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TweetsStateService = TestBed.get(TweetsStateService);
    expect(service).toBeTruthy();
  });
});
