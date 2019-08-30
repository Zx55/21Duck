import axios from 'axios';
import qs from 'qs';

import host from './host';


export interface AgreementParams {
    content: string;
};

export default class Agreement {
    private baseUrl: string = 'http://' + host + ':8000/api/agreement';

    public retreive = () => axios.get(this.baseUrl);
    public update = (params: AgreementParams) => {
        return axios({
            url: this.baseUrl,
            method: 'post',
            data: params,
            transformRequest: [(data: AgreementParams | string): string => {
                data = qs.stringify(data as AgreementParams);
                return data;
            }],
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    };
};