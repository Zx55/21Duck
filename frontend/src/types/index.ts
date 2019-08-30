import { Store as S } from 'redux';
import { PersistPartial } from 'redux-persist';


export enum ActionTypes {
    LOGIN = 'LOGIN',
    LOGIN_ASYNC = 'LOGIN_ASYNC',
    LOGIN_SUCCESS = 'LOGIN_SUCCESS',
    REGISTER = 'REGISTER',
    REGISTER_ASYNC = 'REGISTER_ASYNC',
    LOGOUT = 'LOGOUT',
    UPDATE_PROFILE = 'UPDATE_PROFILE',
    UPDATE_PROFILE_ASYNC = 'UPDATE_PROFILE_ASYNC',
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
    posting_thumb_num ?: number;
};

export interface IRequestRepost {
    reposting_user: string;
    main_posting: number;
    reposting_content: string;
    reposting_thumb_num?: number;
    reply_id?: number;
};

export interface IRequestUser {
    user_id?: string;
    nickname?: string;
    age?: number;
    school?: string;
    head?: string;
    profile?: string;
    identify?: number;
    blocktime?: number;
    scores?: number;
    register?: number;
    cover?: string;
}

// 接受后端相应的接口
export interface IResponseUser{
    age: number;
    blocktime: number;
    head: string;
    identify: number;
    nickname: string;
    profile: string;
    register: number;
    school: string;
    scores: number;
    user_id: string;
};

export interface IResponsePost {
    postings: Array<IPost>;
    posting_num: number;
    thumbs: Array<boolean>;
};

export interface IResponseRepost {
    repostings: Array<IRepost>;
    reposting_num: number;
    thumbs: Array<boolean>;
};

export interface IResponseDetailPost {
    posting: IPost;
    thumb: boolean;
};

export class IPost {
    posting_id: number = -1;                    // postId
    posting_user: string = '';                  // userId
    user_nickname: string = '';                 // userNickname
    user_head: string = '';                     // userHead
    theme: string = '';                         // postTitle
    formated_posting_time: string = '';         // postTime
    formated_reply_time: string = '';           // latestReplyTime
    posting_content: string = '';               // postContent
    posting_thumb_num: number = -1;             // postLike
    reply_num: number = -1;                     // postReplyNum
    category_id: number = -1;                   // postCategory
}

export class IRepost {
    reposting_id: number = -1;                  // repostId
    reposting_user: string = '';                // userId
    user_nickname: string = '';                 // userNickname
    user_head: string = '';                     // userHead
    reposting_content: string = '';             // repostContent
    formated_reposting_time: string = '';       // repostTime
    reposting_thumb_num: number = -1;           // repostLike
    reply_posting: null | Array<string> = [];   // replyPointer
    floor: number = -1;                         // repostFloor
    main_posting: number = -1;                  // postId
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

export class CategoryAdmin {
    user_id: string = '';
    nickname: string = '';
    head: string = '';
};

export class ICategory {
    category_id: number = -1;
    category_content: string = '';
    posting_num: number = -1;
    reposting_num: number = -1;
    formated_new_reply_time: string = '';
    manager: Array<CategoryAdmin> = [];
};

export type IState = {
    user: IUser;
} & PersistPartial;

export type IStore = S<IState>;

export interface Param {
    [key: string]: string;
};
