import React, { useState } from 'react';

import { Upload, Icon, message } from 'antd';

import { getBase64 } from '../../utils';
import { UploadChangeParam } from 'antd/lib/upload';
import { useUser } from '../../hooks';



export default () => {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [fileType, setFileType] = useState('jpeg');

    const user = useUser();

    const beforeUpload = (file: { name: string; type: string; size: number; }) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJpgOrPng) {
            message.error('You can only upload JPG file!');
        }

        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        
        setFileType(file.type.slice(6));
        console.log(fileType);


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
            action="//114.115.204.217:8000/api/head"
            beforeUpload={beforeUpload}
            onChange={handleChange}
            data={{user_id:user.userId,file_type:fileType}}
        >
            {imageUrl ? <img src={imageUrl} alt="" /> : uploadButton}
        </Upload>
    );
}
