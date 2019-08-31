import { IUser, IAction, ActionTypes } from '../types';


let initialState: IUser = new IUser();

export default (state: IUser = initialState, action: IAction): IUser => {
    switch(action.type) {
        case ActionTypes.LOGIN:
        case ActionTypes.REGISTER: {
            const {
                userId, nickName, userHead, identity, blocktime, scores, register
            } = action.payload;
            return new IUser(userId, nickName, userHead, identity,
                blocktime, scores, register);
        }
        case ActionTypes.LOGOUT: {
            return new IUser();
        }
        case ActionTypes.UPDATE_PROFILE: {
            const { userNickname } = action.payload;
            return {
                ...state,
                nickName: userNickname,
            };
        }
        case ActionTypes.AGREE: {
            return {
                ...state,
                identity: 1,
            };
        }
        default:
            return state;
    }
};
