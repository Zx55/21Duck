import { Store as S } from 'redux';
import { PersistPartial } from 'redux-persist';


export enum ActionTypes {
    LOGIN = 'LOGIN',
    LOGIN_ASYNC = 'LOGIN_ASYNC',
    LOGIN_SUCCESS = 'LOGIN_SUCCESS',
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
    posting_num: number;                    // totalPost
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

export class IUser {
    public userId: string = '';
    public nickName: string = '';
    public userHead: string = '';
    public identity: number = 0;
    public blocktime: number = 0;
    public scores: number = 0;
    public register: number = 0;

    public constructor(userId?: string, nickName?: string, userHead?: string,
        identity?: number, blocktime?: number, scores?: number, register?: number) {
        if (userId) {
            this.userId = userId;
        } else {
            this.userId = '';
        }
        if (nickName) {
            this.nickName = nickName;
        } else {
            this.nickName = '';
        }
        if (userHead) {
            this.userHead = userHead;
        } else {
            this.userHead = '';
        }
        if (identity) {
            this.identity = identity;
        } else {
            this.identity = 0;
        }
        if (blocktime) {
            this.blocktime = blocktime;
        } else {
            this.blocktime = 0;
        }
        if (scores) {
            this.scores = scores;
        } else {
            this.scores = 0;
        }
        if (register) {
            this.register = register;
        } else {
            this.register = 0;
        }
    }
};

export type IState = {
    user: IUser;
} & PersistPartial;

export type IStore = S<IState>;

export interface Param {
    [key: string]: string;
};
