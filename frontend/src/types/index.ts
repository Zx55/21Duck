import { Store as S } from 'redux';


export enum ActionTypes {
    LOGIN = 'LOGIN',
    LOGIN_ASYNC = 'LOGIN_ASYNC',
    REGISTER = 'REGISTER',
    REGISTER_ASYNC = 'REGISTER_ASYNC',
    LOGOUT = 'LOGOUT',
}

export interface IPayload {
    [propsName: string]: any;
};

export interface IAction {
    type: ActionTypes;
    payload: IPayload;
};

export class IUser {
    public userId: string = '';
    public nickName: string = '';
    public userHead: string = '';
    public identity: number = 0;
    public blocktime: number = 0;
    public scores: number = 0;
    public register: number = 0;
}

export interface IUser {
    userId: string;
    nickName: string,
    userHead: string,
    identity: number,
    blocktime: number,
    scores: number,
    register: number,
};

export interface IState {
    user: IUser;
};

export type IStore = S<IState>;
