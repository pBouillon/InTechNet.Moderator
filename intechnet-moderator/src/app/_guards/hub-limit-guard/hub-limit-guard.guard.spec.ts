import { TestBed } from '@angular/core/testing';

import { HubLimitGuard } from './hub-limit-guard.guard';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('HubLimitGuard', () => {
  let guard: HubLimitGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ]
    });
    guard = TestBed.inject(HubLimitGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
