import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Moderator } from '../_models/moderator';
import { LocalStorageService } from './local-storage.service';
import { environment } from 'src/environments/environment';
import { LocalStorageKeys } from '../_models/local-storage/local-storage-keys';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  /**
   * @summary moderator's current value
   */
  private currentModeratorSubject: BehaviorSubject<Moderator>;

  /**
   * @summary observable of the handled moderator
   */
  public currentModerator: Observable<Moderator>;

  /**
   * @summary default constructor
   * @param http http service for HTTP requests
   * @param storageService service for local storage queries
   */
  constructor(
    private http: HttpClient,
    private storageService: LocalStorageService,
  ) {
    const storedModerator = localStorage.getItem(
      LocalStorageKeys.currentModerator);

    this.currentModeratorSubject = new BehaviorSubject<Moderator>(
      JSON.parse(storedModerator));

    this.currentModerator = this.currentModeratorSubject.asObservable();
  }

  /**
   * @summary get current moderator
   * @returns a Moderator DTO
   */
  public get currentModeratorValue(): Moderator {
    return this.currentModeratorSubject.value;
  }

  /**
   * @summary get the current moderator login state
   * @returns true if connected; false otherwise
   */
  public get isModeratorLoggedIn(): boolean {
    return this.currentModeratorValue && !!this.currentModeratorValue.token;
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
              LocalStorageKeys.currentModerator,
              JSON.stringify(user));
            this.currentModeratorSubject.next(user);
          }

          return user;
      }));
  }

  /**
   * @summary log out the user
   */
  logout() {
    this.storageService.clear(LocalStorageKeys.currentModerator);
    this.currentModeratorSubject.next(null);
  }

}
