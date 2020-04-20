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

    // Personal
    PROFILE = 'profile',

    // Global / Homepage
    CONTACT = 'contact',
    HOW_DOES_IT_WORK = 'how-does-it-work',
    HOMEPAGE = 'index',
    ROOT = ''
}
