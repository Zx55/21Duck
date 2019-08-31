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

export function sleep(delay: number) {
    const start = (new Date()).getTime();
    while ((new Date()).getTime() - start < delay) {
      continue;
    }
};

export function getBase64(img: Blob, callback: { (imageUrl: any): any; (arg0: string | ArrayBuffer | null): void; }) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};
