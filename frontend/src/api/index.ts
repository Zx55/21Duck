import API from './modelAPI';
import login from './login';
import register from './register';

import { IRequestPost, IRequestRepost, ICategory, IUser } from '../types';


export default {
    post: new API<IRequestPost>('posting'),
    repost: new API<IRequestRepost>('reposting'),
    category: new API<ICategory>('category'),
    user: new API<IUser>('user'),
    login: login,
    register: register,
};
