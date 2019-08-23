import API from './modelAPI';
import { IPost, IRepost } from '../types';


export default {
    post: new API<IPost>('posting'),
    repost: new API<IRepost>('reposting'),
};
