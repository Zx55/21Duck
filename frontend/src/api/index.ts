import API from './modelAPI';
import login from './login';
import register from './register';

import { IPost, IRepost } from '../types';


export default {
    post: new API<IPost>('posting'),
    repost: new API<IRepost>('reposting'),
    login: login,
    register: register,
};
