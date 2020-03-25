
/**
 * @summary Pupil DTO representing the backend representation of this entity
 */
export class Pupil {

    /**
     * @summary pupil's id
     */
    id: number;

    /**
     * @summary pupil's nickname
     */
    nickname: string;

    constructor(fields?: Partial<Pupil>) {
        Object.assign(this, { ...fields });
    }

}
