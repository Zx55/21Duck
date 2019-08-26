import { useSelector } from 'react-redux';
import { getUser } from '../selectors';

import { IUser } from '../types';


export const useUser = (): IUser => {
    return useSelector(getUser);
};
