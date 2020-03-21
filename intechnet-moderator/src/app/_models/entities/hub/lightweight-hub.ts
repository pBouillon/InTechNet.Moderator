/**
 * @summary Light hub DTO representing the backend representation of this entity
 */
export class LightweightHub {

    /**
     * @summary hub's id
     */
    id: number;

    /**
     * @summary hub's name
     */
    name: string;

    /**
     * @summary hub shareable link
     */
    link: string;

    /**
     * @summary number of pupils attending this hub
     */
    attendeesCount: string;

    constructor(fields?: Partial<LightweightHub>) {
        Object.assign(this, { ...fields });
    }

}
