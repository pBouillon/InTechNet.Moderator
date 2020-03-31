import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModeratorService {

  /**
   * @summary default constructor
   * @param http http service for HTTP requests
   * @param authentication authentication service to fetch the current user
   */
  constructor(
    private http: HttpClient
  ) { }

  /**
   * @summary Delete the current account of the moderator
   */
  public deleteCurrentAccount(): Observable<any> {
    return this.http.delete<any>(
      `${environment.apiUrl}/Moderators`);
  }

}
