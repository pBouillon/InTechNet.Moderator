import { TestBed } from '@angular/core/testing';

import { HubService } from './hub.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { LightweightHub } from 'src/app/_models/entities/hub/lightweight-hub';

describe('HubService', () => {
  let service: HubService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ToastrModule,
      ]
    });
    service = TestBed.inject(HubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the expected shareable link', () => {
    const hubLink = 'abcdef';
    const pupilUrl = environment.pupilFrontUri;

    const hub = new LightweightHub();
    hub.link = hubLink;

    const result = service.getShareableLinkFor(hub);

    expect(result).toBe(`${pupilUrl}/Hubs/join?link=${hubLink}`);
  });
});
