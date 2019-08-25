import axios from 'axios';
import qs from 'qs';

import host from './host';


const baseUrl = 'http://' + host + ':8000/api/login';

export interface loginParams {
    username: string;
    password: string;
}

export default (params: loginParams) =>
    axios({
        url: baseUrl,
        method: 'post',
        data: params,
        transformRequest: [(data: loginParams | string): string => {
            data = qs.stringify(data as loginParams);
            return data;
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
