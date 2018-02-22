export declare enum ActionTypes {
    SET_CHANNELS = 0,
    ADD_CHANNEL = 1,
    REMOVE_CHANNEL = 2,
    SET_MESSAGES = 3,
    ADD_MESSAGE = 4,
    EDIT_MESSAGE = 5,
    SET_USERS = 6,
    ADD_USER = 7,
    REMOVE_USER = 8,
}
export declare class Action {
    type: ActionTypes;
    data: any;
    userId: string;
    channelId: string;
}
