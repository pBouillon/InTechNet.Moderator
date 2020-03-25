/**
 * @summary Defines all routes constants
 */
export enum RouteName {
    // Authentication
    LOGIN = 'login',
    REGISTER = 'register',

    // Board to manage the moderator's hubs
    BOARD = 'board',
    HUB_DETAILS = 'hubs/details/:id',
    NEW_HUB = 'hubs/new',

    // Global / Homepage
    CONTACT = 'contact',
    HOMEPAGE = 'index',
    ROOT = ''
}
