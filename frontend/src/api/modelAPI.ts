import axios from 'axios';

import host from './host';

import { Param, ParamList } from '../types';

export default class API<T> {
    private baseUrl: string = 'http://' + host + ':8000/api/';
    private name: string;

    public constructor(name: string) {
        this.name = name;
    }

    private detailUrl = (id: number): string =>
        this.baseUrl + this.name + '/' + id + '/';

    private listUrl = (params?: ParamList): string => {
        if (params) {
            let paramString: string = '?';
            params.forEach((param: Param, index: number): void => {
                if (index > 0) {
                    paramString += '&';
                }
                paramString += param.key + '=' + param.value;
            });
            return this.baseUrl + this.name + '/' + paramString;
        }
        return this.baseUrl + this.name + '/';
    }

    public list = (params?: ParamList) => axios.get(this.listUrl(params));
    public retreive = (id: number) => axios.get(this.detailUrl(id));
    public create = (data: T) => axios.post(this.listUrl(), data);
    public update = (id: number, data: T) => axios.put(this.detailUrl(id), data);
    public remove = (id: number) => axios.delete(this.detailUrl(id));
};
