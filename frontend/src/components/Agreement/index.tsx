import React, { useState, useEffect } from 'react';
import marked from 'marked';

import { Modal, Button, Checkbox } from 'antd';

import api from '../../api';


export interface AgreementProps {
    visible: boolean;
    onOkClick: () => void;
};

export default (props: AgreementProps) => {
    const [content, setContent] = useState('加载中');
    const [confirm, setConfirm] = useState(false);

    useEffect(() => {
        api.agreement.retreive().then((response) => {
            const data: string = response.data.content;
            setContent(data);
        });
    }, []);

    return (
        <Modal
            wrapClassName="notice"
            title="新手上路"
            visible={props.visible}
            centered
            closable={false}
            width="70%"
            style={{
                margin:"10% 0"
            }}
            footer={[
                <Button
                    key='submit'
                    disabled={!confirm}
                    type='primary'
                    onClick={props.onOkClick}
                >同意</Button>
            ]}
        >
            <div
                style={{
                    overflow: "auto",
                    maxHeight: 400
                }}
                dangerouslySetInnerHTML={{
                    __html: marked(content)
                }}
            />
            <br />
            <Checkbox
                checked={confirm}
                onChange={() => setConfirm(confirm => !confirm)}
            >
                已经阅读用户协议
            </Checkbox>
        </Modal>
    );
};
