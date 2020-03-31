/**
 * @summary Subscription plan DTO representing the subscription of a moderator
 */
export class SubscriptionPlan {

    /**
     * @summary subscription plan name
     */
    subscriptionPlanName: string;

    /**
     * @summary subscription plan's id
     */
    idSubscriptionPlan: number;

    /**
     * @summary maximum allowed hub for the current moderator for
     *          its subscription plan
     */
    maxHubPerModeratorAccount: number;

    /**
     * @summary maximum modules allowed to be active at the same time per hub
     */
    maxModulePerHub: number;

    /**
     * @summary maximum allowed attendees per hub for the current moderator for
     *          its subscription plan
     */
    maxAttendeesPerHub: number;

    /**
     * @summary monthly price of the current moderator subscription plan
     */
    subscriptionPlanPrice: number;

    constructor(fields?: Partial<SubscriptionPlan>) {
        Object.assign(this, { ...fields });
    }

}
