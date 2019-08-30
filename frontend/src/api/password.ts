import axios from 'axios';
import qs from 'qs';

import host from './host';


const baseUrl = 'http://' + host + ':8000/api/password';

export interface PasswordParam {
    username: string;
    old_password: string;
    new_password: string;
}

export default (params: PasswordParam) =>
    axios({
        url: baseUrl,
        method: 'post',
        data: params,
        transformRequest: [(data: PasswordParam | string): string => {
            data = qs.stringify(data as PasswordParam);
            return data;
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
