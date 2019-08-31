import API from './modelAPI';
import login from './login';
import register from './register';

import { IRequestPost, IRequestRepost, ICategory, IRequestUser } from '../types';
import Agreement from './agreement';
import password from './password';


export default {
    post: new API<IRequestPost>('posting'),
    repost: new API<IRequestRepost>('reposting'),
    category: new API<ICategory>('category'),
    user: new API<IRequestUser>('user'),
    agreement: new Agreement(),
    login: login,
    register: register,
    password: password,
};
