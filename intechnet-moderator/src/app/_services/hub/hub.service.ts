import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

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
   * @summary given its id, delete the associated hub
   * @param id id of the hub to be deleted
   */
  public deleteHub(id: number) {
    return this.http.delete<any>(
      `${environment.apiUrl}/Hub/${id}`);
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

  /**
   * @summary Get the full shareable link of a hub
   * @param hub hub's data
   */
  public getShareableLinkFor(hub: LightweightHub): string {
    return `${environment.pupilFrontUri}/hubs/join?${hub.link}`;
  }

}
