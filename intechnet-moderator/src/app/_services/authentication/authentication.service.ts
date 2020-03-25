import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Moderator } from '../../_models/entities/moderator/moderator';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { environment } from 'src/environments/environment';
import { LocalStorageKeys } from '../../_models/local-storage/local-storage-keys';
import { CredentialsChecks } from 'src/app/_models/entities/authentication/credentials-checks/CredentialsChecks';

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
  ) { }

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
   * @summary Check if the email is in use
   * @param email user's provided login value
   * @returns a boolean
   */
  isEmailInUse(email: string): Observable<CredentialsChecks> {
    const parameters = new HttpParams()
      .set('email', email);

    return this.http.get<CredentialsChecks>(
      `${environment.apiUrl}/Moderators/identifiers-checks`,
      { params: parameters });
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
   * @summary Check if the nickname is in use
   * @param nickname user's provided login value
   * @returns a boolean
   */
  isNickNameInUse(nickname: string): Observable<CredentialsChecks> {
    const parameters = new HttpParams()
      .set('nickname', nickname);

    return this.http.get<CredentialsChecks>(
      `${environment.apiUrl}/Moderators/identifiers-checks`,
      { params: parameters });
  }

  /**
   * @summary given its information, log in the moderator
   * @param login user's provided login value
   * @param password user's provided password value
   */
  login(login: string, password: string) {
    return this.http.post<any>(
      `${environment.apiUrl}/Moderators/authenticate`,
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

  /**
   * @summary given their information, register the moderator and log them in
   * @param login user's provided login value
   * @param email user's provided email value
   * @param password user's provided password value
   */
  register(nickname: string, email: string, password: string) {
    return this.http.post<any>(
      `${environment.apiUrl}/Moderators`,
      { nickname, email, password })
      .pipe(
        map(user => {

          if (user && user.token) {
            this.storageService.store(
              LocalStorageKeys.CURRENT_MODERATOR, user);
          }

          return user;
      }));
  }

}
