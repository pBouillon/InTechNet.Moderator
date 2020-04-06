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
   * @returns an observable containing a collection of all the modules this hub
   *          is allowed to select
   */
  public getAvailableModulesForHub(idHub: number): Observable<Array<Module>> {
    return this.http.get<Array<Module>>(
      `${environment.apiUrl}/Moderators/me/Hubs/${idHub}/Modules`);
  }
}
