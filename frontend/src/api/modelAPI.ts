import axios from 'axios';
import qs from 'qs';

import host from './host';

import { Param } from '../types';

export default class API<T> {
    private baseUrl: string = 'http://' + host + ':8000/api/';
    private name: string;

    public constructor(name: string) {
        this.name = name;
    }

    private detailUrl = (id: string, params?: Param): string => {
        if (params) {
            const paramString = '?' + qs.stringify(params);
            console.log(this.baseUrl + this.name + '/' + id + '/' + paramString)
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
    }

    public list = (params?: Param) => axios.get(this.listUrl(params));
    public retreive = (id: string, params?: Param) =>
        axios.get(this.detailUrl(id, params));
    public create = (data: T) => axios.post(this.listUrl(), data);
    public update = (id: string, data: T) => axios.put(this.detailUrl(id), data);
    public remove = (id: string) => axios.delete(this.detailUrl(id));
};
