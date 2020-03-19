import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Moderator } from '../_models/entities/moderator';
import { LocalStorageService } from './local-storage.service';
import { environment } from 'src/environments/environment';
import { LocalStorageKeys } from '../_models/local-storage/local-storage-keys';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  /**
   * @summary default constructor
   * @param http http service for HTTP requests
   * @param storageService service for local storage queries
   */
  constructor(
    private http: HttpClient,
    private storageService: LocalStorageService,
  ) {
    console.log(typeof (JSON.parse(
      this.storageService.get(LocalStorageKeys.CURRENT_MODERATOR))));
  }

  /**
   * @summary get current moderator
   * @returns a Moderator DTO
   */
  public get currentModerator(): Moderator {
    const parsedValue = JSON.parse(
      this.storageService.get(LocalStorageKeys.CURRENT_MODERATOR));

    return (parsedValue != null && parsedValue !== {})
      ? new Moderator(parsedValue)
      : null;
  }

  /**
   * @summary get the current moderator login state
   * @returns true if connected; false otherwise
   */
  public get isModeratorLoggedIn(): boolean {
    return this.currentModerator
      && !!this.currentModerator.token;
  }

  /**
   * @summary given its information, log in the moderator
   * @param login user's provided login value
   * @param password user's provided password value
   */
  login(login: string, password: string) {
    return this.http.post<any>(
      `${environment.apiUrl}/Moderator/authenticate`,
      { login, password })
      .pipe(
        map(user => {

          if (user && user.token) {
            this.storageService.store(
              LocalStorageKeys.CURRENT_MODERATOR, user);
          }

          return user;
      }));
  }

  /**
   * @summary log out the user
   */
  logout() {
    this.storageService.clear(LocalStorageKeys.CURRENT_MODERATOR);
  }

}
