import moment from 'moment';


export const getRelativeTime = (formatedTime: string): string =>
    moment(formatedTime, 'YYYY-MM-DD HH:mm:ss').fromNow();

export function newArrayWithItems<T>(num: number, item: T): Array<T> {
    let array = new Array<T>();
    for (let i = 0; i < num; ++i) {
        array.push(item);
    }
    return array;
};
