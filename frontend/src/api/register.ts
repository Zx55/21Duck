import axios from 'axios';
import qs from 'qs';

import host from './host';


const baseUrl = 'http://' + host + ':8000/api/register';

export interface registerParams {
    username: string;
    nickname: string;
    password: string;
}

export default (params: registerParams) =>
    axios({
        url: baseUrl,
        method: 'post',
        data: params,
        transformRequest: [(data: registerParams | string): string => {
            data = qs.stringify(data as registerParams);
            return data;
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
