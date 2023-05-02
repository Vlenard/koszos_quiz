import AuthError from "../errors/AuthError";
import Error from "../errors/Error";

export type RequestedPlayerData = {
    data?: PlayerData;
    err?: Error<AuthError>;
};

export type PlayerData = {
    name: string;
    uid: string;
};