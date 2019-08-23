import { IUser, IAction, ActionTypes } from '../types';


let initialState: IUser = new IUser();

export default (state: IUser = initialState, action: IAction): IUser => {
    switch(action.type) {
        case ActionTypes.LOGIN: {
            // TODO: add login reducer
        }
        case ActionTypes.REGISTER: {
            // TODO: add register reducer
        }
        case ActionTypes.LOGOUT: {
            return new IUser();
        }
        default:
            return state;
    }
};
