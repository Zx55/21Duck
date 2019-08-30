import API from './modelAPI';
import login from './login';
import register from './register';

import { IRequestPost, IRequestRepost, ICategory, IResponseUser } from '../types';


export default {
    post: new API<IRequestPost>('posting'),
    repost: new API<IRequestRepost>('reposting'),
    category: new API<ICategory>('category'),
    user: new API<IResponseUser>('user'),
    login: login,
    register: register,
};
