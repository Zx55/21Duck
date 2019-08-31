import React, { useState } from 'react';

import { Upload, Icon, message } from 'antd';

import { getBase64 } from '../../utils';
import { UploadChangeParam } from 'antd/lib/upload';



export default () => {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState('');

    const beforeUpload = (file: { type: string; size: number; }) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJpgOrPng) {
            message.error('You can only upload JPG file!');
        }

        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }

        return isJpgOrPng && isLt2M;
    }

    const handleChange = (info: UploadChangeParam) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }

        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj as Blob, (imageUrl: any) => {
                setImageUrl(imageUrl);
                setLoading(false);
            });
        }
    }
    const uploadButton = (
        <div>
            <Icon type={loading ? 'loading' : 'plus'} />
            <div className="ant-upload-text">Upload</div>
        </div>
    );
    return (
        <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="//jsonplaceholder.typicode.com/posts/"
            beforeUpload={beforeUpload}
            onChange={handleChange}
        >
            {imageUrl ? <img src={imageUrl} alt="" /> : uploadButton}
        </Upload>
    );
}
