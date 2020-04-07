/**
 * @summary Lightweight version of the subscription plan DTO
 */
export class LightweightSubscriptionPlan {

    /**
     * @summary subscription plan's id
     */
    idSubscriptionPlan: number;

    /**
     * @summary subscription plan name
     */
    subscriptionPlanName: string;

    constructor(fields?: Partial<LightweightSubscriptionPlan>) {
        Object.assign(this, { ...fields });
    }

}
