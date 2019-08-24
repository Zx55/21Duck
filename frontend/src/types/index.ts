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

// 发送后端接口
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
    userId: number;
    postTitle: string;
    postContent: string;
    postCategory: string;
    postThumbup: number;
};

export interface IRepost {
    replyId: number;
    postId: number;
    repostUserId: number;
    repostContent: string;
    repostThumbup: number;
};

// 接受后端接口
export interface PostItem {
    posting_num: number;                    // totalPostN
    posting_id: number;                     // postId
    posting_user: number;                   // userId
    user_nickname: string;                  // userNickname
    user_head: string;                      // userHead
    theme: string;                          // postTitle
    related_posting_time: string;           // latestPostEditedTime
    related_reply_time: string              // latestRepostedTime
    posting_content: string;                // postContent
    posting_thumb_num: number;              // postLike
}

export interface IState {
    user: IUser;
};

export type IStore = S<IState>;

export interface Param {
    key: string;
    value: string;
};

export type ParamList = Array<Param>;
