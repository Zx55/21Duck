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

// 请求后端的接口
export interface IRequestPost {
    posting_user: string;
    theme: string;
    posting_content: string;
    category_id: number;
};

export interface IRequestRepost {
    reposting_user: string;
    main_posting: number;
    reposting_content: string;
    reposting_thumb_num?: number;
    reply_id?: number;
};

// 接受后端相应的接口
export class IPost {
    posting_num: number = 15;                   // totalPost
    posting_id: number = -1;                    // postId
    posting_user: string = '';                  // userId
    user_nickname: string = '';                 // userNickname
    user_head: string = '';                     // userHead
    theme: string = '';                         // postTitle
    relative_posting_time: string = '';         // relativePostTime
    formated_posting_time: string = '';         // postTime
    relative_reply_time: string = ''            // RepostTime
    posting_content: string = '';               // postContent
    posting_thumb_num: number = -1;             // postLike
    reply_num: number = -1;                     // postReplyNum
    category_id: number = -1;                   // postCategory
}

export class IRepost {
    reposting_num: number = 15;                 // TotalRepost
    reposting_id: number = -1;                  // repostId
    reposting_user: string = '';                // userId
    user_nickname: string = '';                 // userNickname
    user_head: string = '';                     // userHead
    reposting_content: string = '';             // repostContent
    relative_reposting_time: string = '';       // relativeRepostTime
    formated_reposting_time: string = '';       // RepostTime
    reposting_thumb_num: number = -1;           // repostLike
    reply_posting: null | Array<string> = [];   // replyPointer
    floor: number = -1;                         // repostFloor
};

export interface INotFound {
    detail: string;
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
