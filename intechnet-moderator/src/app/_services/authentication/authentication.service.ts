import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Moderator } from 'src/app/_models/authentication/login';
import { LocalStorageKeys } from '../localStorage/local-storage-keys';
import { LocalStorageService } from '../localStorage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentModeratorSubject: BehaviorSubject<Moderator>;

  public currentModerator$ = this.currentModeratorSubject.asObservable();

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
  ) {
    this.currentModeratorSubject = new BehaviorSubject<Moderator>(
      JSON.parse(
        this.localStorageService.get(
          LocalStorageKeys.CURRENT_MODERATOR)));
    this.currentModerator$ = this.currentModeratorSubject.asObservable();
  }

  public get currentModeratorValue(): Moderator {
    return this.currentModeratorSubject.value;
  }

  /**
   * @summary Attempt to authenticate the user
   * @param login Login to use; either the password or the mail
   * @param password Password to use
   */
  public login(login: string, password: string) {
    // @todo: https://github.com/cornflourblue/angular-8-registration-login-example/blob/master/src/app/_services/authentication.service.ts
    console.log(`attempted to authenticate with ${login}:${password}`);
  }

  /**
   * @summary Clear all data on the connected user
   */
  public logout() {
    this.localStorageService.clear(LocalStorageKeys.CURRENT_MODERATOR);
    this.currentModeratorSubject.next(null);
  }

}
