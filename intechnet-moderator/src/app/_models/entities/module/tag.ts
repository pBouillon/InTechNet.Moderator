/**
 * @summary Tag dto for module topics
 */
export class Tag {

    /**
     * @summary tag's id
     */
    id: number;

    /**
     * @summary tag name
     */
    name: string;

    constructor(fields?: Partial<Tag>) {
        Object.assign(this, { ...fields });
    }

}
