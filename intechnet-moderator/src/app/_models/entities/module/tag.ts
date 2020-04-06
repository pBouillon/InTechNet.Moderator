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
    Name: string;

    constructor(fields?: Partial<Tag>) {
        Object.assign(this, { ...fields });
    }

}
