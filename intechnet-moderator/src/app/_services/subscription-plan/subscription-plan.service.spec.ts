import { TestBed } from '@angular/core/testing';

import { SubscriptionPlanService } from './subscription-plan.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SubscriptionPlanService', () => {
  let service: SubscriptionPlanService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ]
    });
    service = TestBed.inject(SubscriptionPlanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
