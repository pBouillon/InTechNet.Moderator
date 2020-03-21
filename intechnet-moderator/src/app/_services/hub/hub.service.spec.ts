import { TestBed } from '@angular/core/testing';

import { HubService } from './hub.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HubService', () => {
  let service: HubService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(HubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
