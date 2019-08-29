import React from 'react';
import Vcode from 'react-vcode';

export default ({ width, height, onChange }) => (
    <Vcode height={height} width={width} onChange={onChange} />
);
