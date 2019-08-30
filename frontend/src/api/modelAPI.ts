import axios from 'axios';
import qs from 'qs';

import host from './host';

import { Param } from '../types';


export interface PostThumbParams {
    user_id: string;
    posting_id: string;
};

export interface RepostThumbParams {
    user_id: string;
    reposting_id: string;
};

export default class API<T> {
    private baseUrl: string = 'http://' + host + ':8000/api/';
    private name: string;

    public constructor(name: string) {
        this.name = name;
    };

    private detailUrl = (id: string, params?: Param): string => {
        if (params) {
            const paramString = '?' + qs.stringify(params);
            return this.baseUrl + this.name + '/' + id + '/' + paramString;
        }
        return this.baseUrl + this.name + '/' + id + '/';
    };

    private listUrl = (params?: Param): string => {
        if (params) {
            const paramString = '?' + qs.stringify(params);
            return this.baseUrl + this.name + '/' + paramString;
        }
        return this.baseUrl + this.name + '/';
    };

    private checkThumb = (): boolean => {
        if (this.name !== 'posting' && this.name !== 'reposting') {
            console.log('no thumb method');
            return false;
        }
        return true;
    };

    public list = (params?: Param) => axios.get(this.listUrl(params));
    public retreive = (id: string, params?: Param) =>
        axios.get(this.detailUrl(id, params));
    public create = (data: T) => axios.post(this.listUrl(), data);
    public update = (id: string, data: T) => axios.put(this.detailUrl(id), data);
    public remove = (id: string) => axios.delete(this.detailUrl(id));
    public thumbUp = (params: PostThumbParams | RepostThumbParams) => {
        if (!this.checkThumb()) {
            return;
        }

        const url = this.baseUrl + this.name + '/thumb';
        return axios({
            url: url,
            method: 'post',
            data: params,
            transformRequest: [(data: PostThumbParams | RepostThumbParams | string): string => {
                data = qs.stringify(data as (PostThumbParams | RepostThumbParams));
                return data;
            }],
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    };

    public thumbDown = (params: PostThumbParams | RepostThumbParams) => {
        if (!this.checkThumb()) {
            return;
        }

        const url = this.baseUrl + this.name + '/thumb';
        return axios.delete(url + '?' + qs.stringify(params));
    };
};
