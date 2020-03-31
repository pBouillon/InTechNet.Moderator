import { TestBed } from '@angular/core/testing';

import { ModeratorService } from './moderator.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ModeratorService', () => {
  let service: ModeratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ]
    });
    service = TestBed.inject(ModeratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
