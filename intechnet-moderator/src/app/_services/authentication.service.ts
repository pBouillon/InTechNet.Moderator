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
  private currentUserSubject: BehaviorSubject<Moderator>;
  public currentUser: Observable<Moderator>;

  /**
   * @summary todo
   */
  constructor(
    private http: HttpClient,
    private storageService: LocalStorageService,
  ) {
    this.currentUserSubject = new BehaviorSubject<Moderator>(
      JSON.parse(
        localStorage.getItem(LocalStorageKeys.currentModerator)));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  /**
   * @summary todo
   */
  public get currentUserValue(): Moderator {
    return this.currentUserSubject.value;
  }

  /**
   * @summary todo
   */
  login(login: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/Moderator/login`, { login, password })
      .pipe(map(user => {
        if (user && user.token) {
          this.storageService.store(LocalStorageKeys.currentModerator, JSON.stringify(user));
          this.currentUserSubject.next(user);
        }

        return user;
      }));
  }

  /**
   * @summary todo
   */
  logout() {
    this.storageService.clear(LocalStorageKeys.currentModerator);
    this.currentUserSubject.next(null);
  }

}
