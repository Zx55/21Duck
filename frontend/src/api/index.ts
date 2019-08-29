import API from './modelAPI';
import login from './login';
import register from './register';

import { IRequestPost, IRequestRepost, ICategory } from '../types';


export default {
    post: new API<IRequestPost>('posting'),
    repost: new API<IRequestRepost>('reposting'),
    category: new API<ICategory>('category'),
    login: login,
    register: register,
};
