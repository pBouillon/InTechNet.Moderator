import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Module } from 'src/app/_models/entities/module/module';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  /**
   * @summary default constructor
   * @param http http service for HTTP requests
   */
  constructor(
    private http: HttpClient
  ) { }

  /**
   * @summary retrieve all available modules for this hub
   * @param idHub id of the concerned hub
   * @returns an observable containing a collection of all the modules this hub
   *          is allowed to select
   */
  public getAvailableModulesForHub(idHub: number): Observable<Array<Module>> {
    return this.http.get<Array<Module>>(
      `${environment.apiUrl}/Moderators/me/Hubs/${idHub}/Modules`);
  }

  /**
   * @summary toggle the module availability for this hub
   * @param idHub id of the concerned hub
   * @param idModule id of the module with the status to be toggled
   * @returns an observable of the HTTP call
   */
  public toggleModuleAvailability(idHub: number, idModule: number): Observable<any> {
    return this.http.put<any>(
      `${environment.apiUrl}/Moderators/me/Hubs/${idHub}/Modules/${idModule}`,
      { });
  }
}
