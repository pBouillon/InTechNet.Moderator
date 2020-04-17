import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { LightweightHub } from 'src/app/_models/entities/hub/lightweight-hub';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Hub } from 'src/app/_models/entities/hub/hub';

/**
 * @summary Service for hub operations
 */
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
      `${environment.apiUrl}/Hubs`, { name, description });
  }

  /**
   * @summary given its id, delete the associated hub
   * @param id id of the hub to be deleted
   */
  public deleteHub(id: number) {
    return this.http.delete<any>(
      `${environment.apiUrl}/Hubs/${id}`);
  }

  /**
   * @summary get all managed hub by the current moderator
   * @returns an observable of a collection of light representation of all hubs
   *          managed by the current moderator
   */
  public getHubs(): Observable<Array<LightweightHub>> {
    return this.http.get<Array<LightweightHub>>(
      `${environment.apiUrl}/Hubs`);
  }

  /**
   * @summary given its id, retrieve all data of a hub
   * @param id id of the hub to retrieve
   * @returns an observable holding all the data of the requested hub
   */
  public getHub(id: number): Observable<Hub> {
    return this.http.get<Hub>(
      `${environment.apiUrl}/Hubs/${id}`);
  }

  /**
   * @summary Get the full shareable link of a hub
   * @param link link to be used in the shareable link
   */
  public getShareableLinkFor(link: string): string {
    return `${environment.pupilFrontUri}/hubs/join?link=${link}`;
  }

  /**
   * @summary Remove a pupil from a hub
   * @param idHub id of the hub to update
   * @param idPupil id of the pupil to be removed
   */
  public removePupil(idHub: number, idPupil: number) {
    const notSpecified = 0;

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        id: notSpecified,
        idPupil,
        idHub
      },
    };

    return this.http.delete<any>(
      `${environment.apiUrl}/Moderators/me/Hubs/${idHub}/Pupils/${idPupil}`, options);
  }

  /**
   * @summary Update a hub according to the parameters
   * @param idHub the id of the hub to update
   * @param hubName the new name of the hub
   * @param hubDescription the new description of the hub
   */
  public updateHub(idHub: number, name: string, description: string): Observable<any> {
    return this.http.put<any>(
      `${environment.apiUrl}/Hubs/${idHub}`, { name, description });
  }

}
