import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

/**
 * @summary service for moderator related operations and API calls
 */
@Injectable({
  providedIn: 'root'
})
export class ModeratorService {

  /**
   * @summary default constructor
   * @param http http service for HTTP requests
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
