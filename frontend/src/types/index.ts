import { Store as S } from 'redux';


export enum ActionTypes {
    LOGIN = 'LOGIN',
    LOGIN_ASYNC = 'LOGIN_ASYNC',
    REGISTER = 'REGISTER',
    REGISTER_ASYNC = 'REGISTER_ASYNC',
    LOGOUT = 'LOGOUT',
};

export interface IPayload {
    [propsName: string]: any;
};

export interface IAction {
    type: ActionTypes;
    payload: IPayload;
};

export class IUser {
    public userId: number = -1;
    public nickName: string = '';
    public userHead: string = '';
    public identity: number = 0;
    public blocktime: number = 0;
    public scores: number = 0;
    public register: number = 0;
};

export interface IPost {
    userId: number,
    postTitle: string,
    postContent: string,
    postCategory: string,
};

export interface IRepost {
    replyId: number,
    postId: number,
    repostContent: string,
};

export interface IState {
    user: IUser;
};

export type IStore = S<IState>;
