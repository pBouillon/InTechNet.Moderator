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
   * @summary todo
   */
  private currentModeratorSubject: BehaviorSubject<Moderator>;

  /**
   * @summary todo
   */
  public currentModerator: Observable<Moderator>;

  /**
   * @summary todo
   */
  constructor(
    private http: HttpClient,
    private storageService: LocalStorageService,
  ) {
    this.currentModeratorSubject = new BehaviorSubject<Moderator>(
      JSON.parse(
        localStorage.getItem(LocalStorageKeys.currentModerator)));
    this.currentModerator = this.currentModeratorSubject.asObservable();
  }

  /**
   * @summary todo
   */
  public get currentModeratorValue(): Moderator {
    return this.currentModeratorSubject.value;
  }

  /**
   * @summary todo
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
   * @summary todo
   */
  logout() {
    this.storageService.clear(LocalStorageKeys.currentModerator);
    this.currentModeratorSubject.next(null);
  }

}
