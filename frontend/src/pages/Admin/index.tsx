import React, { useState } from 'react';

import api from '../../api';
import { ICategory } from '../../types';


export default () => {
    const [data, setData] = useState(new Array<ICategory>());

    api.category.list().then((response) => {
        const retData: Array<ICategory> = response.data;
        setData(retData);
        console.log('hello');
    })

    return (
        <div>admin</div>
    );
}