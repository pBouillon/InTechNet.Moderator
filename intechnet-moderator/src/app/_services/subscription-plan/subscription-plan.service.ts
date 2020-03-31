import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SubscriptionPlan } from 'src/app/_models/entities/subscription-plan/subscription-plan';
import { environment } from 'src/environments/environment';

/**
 * @summary Service for subscription plan operations
 */
@Injectable({
  providedIn: 'root'
})
export class SubscriptionPlanService {

  /**
   * @summary default constructor
   * @param http http service for HTTP requests
   */
  constructor(
    private http: HttpClient
  ) { }

  /**
   * @summary Get a list of all available subscriptions
   * @returns An observable of a collection containing all available
   *          subscription plans
   */
  public getSubscriptionPlans(): Observable<Array<SubscriptionPlan>> {
    return this.http.get<Array<SubscriptionPlan>>(
      `${environment.apiUrl}/SubscriptionPlans`);
  }

}
