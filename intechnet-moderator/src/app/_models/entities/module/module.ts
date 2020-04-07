import { LightweightSubscriptionPlan } from '../subscription-plan/lightweight-subscription-plan';
import { Tag } from './tag';

/**
 * @summary Module entity
 */
export class Module {

    /**
     * @summary module description
     */
    description: string;

    /**
     * @summary module's id
     */
    id: number;

    /**
     * @summary whether this module is active for the hub's attendees
     */
    isActive: boolean;

    /**
     * @summary basic data on the module subscription plan
     */
    moduleSubscriptionPlanDto: LightweightSubscriptionPlan;

    /**
     * @summary module name
     */
    name: string;

    /**
     * @summary associated tags
     */
    tags: Array<Tag>;

    constructor(fields?: Partial<Module>) {
        Object.assign(this, { ...fields });
    }

}
