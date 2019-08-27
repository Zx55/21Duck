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
export class PostItem {
    posting_num: number = 15;                   // totalPost
    posting_id: number = -1;                    // postId
    posting_user: string = '';                  // userId
    user_nickname: string = '';                 // userNickname
    user_head: string = '';                     // userHead
    theme: string = '';                         // postTitle
    relative_posting_time: string = '';         // latestPostEditedTime
    relative_reply_time: string = ''            // latestRepostedTime
    posting_content: string = '';               // postContent
    posting_thumb_num: number = -1;             // postLike
    reply_num: number = -1;                     // postReplyNum
    category_id: number = -1;                   // postCategory
}

export class RepostItem {
    reposting_num: number = 15;                 // TotalRepost
    reposting_id: number = -1;                  // repostId
    reposting_user: string = '';                // userId
    user_nickname: string = '';                 // userNickname
    user_head: string = '';                     // userHead
    reposting_content: string = '';             // repostContent
    relative_reposting_time: string = '';       // latestRepostedTime
    reposting_thumb_num: number = -1;           // repostLike
    reply_posting: null | Array<string> = [];   // replyPointer
};

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
