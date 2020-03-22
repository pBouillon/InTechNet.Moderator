import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { LightweightHub } from 'src/app/_models/entities/hub/lightweight-hub';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HubService {

  /**
   * @summary default constructor
   * @param http http service for HTTP requests
   * @param authentication authentication service to fetch the current user
   */
  constructor(
    private http: HttpClient
  ) { }

  /**
   * @summary create a hub for the current moderator
   * @param name name of the hub to be created
   * @param description optional description of the hub to be created
   */
  public createHub(name: string, description: string) {
    return this.http.post<any>(
      `${environment.apiUrl}/Hub`,
      { name, description });
  }

  /**
   * @summary get all managed hub by the current moderator
   * @returns an observable of a collection of light representation of all hubs
   *          managed by the current moderator
   */
  public getHubs(): Observable<Array<LightweightHub>> {
    return this.http.get<Array<LightweightHub>>(
        `${environment.apiUrl}/Hub`);
  }

}
