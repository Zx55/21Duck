import axios from 'axios';

import host from './host';

import { IUser } from '../types';


const baseUrl = 'http://' + host + ':8000/api/reposting/';
const detailUrl = (id: number): string => baseUrl + id + '/';
const listUrl = () => + baseUrl + 'reposting/';

const list = () => axios.get(listUrl());
const retreive = (id: number) => axios.get(detailUrl(id));
const create = (data: IUser) => axios.post(listUrl(), data);
const update = (id: number, data: IUser) => axios.put(detailUrl(id), data);
const remove = (id: number) => axios.delete(detailUrl(id));


export default {
    list, retreive, create, update, remove
};
