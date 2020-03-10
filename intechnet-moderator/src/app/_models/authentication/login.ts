export class Moderator {

    public id: number;

    /**
     * @summary Provided data on the login form
     *          This can be either the mail or the nickname
     *          of the user
     */
    public login: string;

    public nickname: string;

    public mail: string;

    public password: string;

    public token: string;
}
