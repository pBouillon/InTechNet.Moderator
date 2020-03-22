/**
 * @summary Moderator DTO representing the backend representation of this entity
 */
export class Moderator {

    /**
     * @summary moderator's mail
     */
    email: string;

    /**
     * @summary moderator's id
     */
    id: number;

    /**
     * @summary moderator's nickname
     */
    nickname: string;

    /**
     * @summary current moderator's JWT
     */
    token: string;

    constructor(fields?: Partial<Moderator>) {
        Object.assign(this, {...fields});
    }

}
