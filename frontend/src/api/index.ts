import API from './modelAPI';
import login from './login';
import register from './register';

import { IRequestPost, IRequestRepost } from '../types';


export default {
    post: new API<IRequestPost>('posting'),
    repost: new API<IRequestRepost>('reposting'),
    login: login,
    register: register,
};
