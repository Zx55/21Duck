import { IState, IUser } from '../types';


export const getUser = (state: IState): IUser => state.user;
export const getUserIdentity = (state: IState): number =>
    getUser(state).identity;
export const isLogin = (state: IState): boolean =>
    getUserIdentity(state) !== 0;
export const isAdmin = (state: IState): boolean =>
    getUserIdentity(state) !== 2;
export const isRegisterIn = (state: IState): boolean =>
    getUser(state).register === 1;

