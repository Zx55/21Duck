import React, { useState, useEffect } from 'react';
import marked from 'marked';
import { withRouter } from 'react-router-dom';

import { Modal, Checkbox, Button } from 'antd';

import api from '../../api';
import { useUser } from '../../hooks';
import RegisterForm from '../../components/RegisterForm';

import { RouteComponentProps } from 'react-router-dom';

import './Register.css';


export default withRouter((props: RouteComponentProps) => {
    const user = useUser();
    const [visible, setVisible] = useState(true);
    const [confirm, setConfirm] = useState(false);
    const [content, setContent] = useState('加载中');

    const onOkClick = () => {
        console.log('close');
        setVisible(false);
        props.history.push('/explore');
    }

    useEffect(() => {
        api.agreement.retreive().then((response) => {
            const data: string = response.data.content;
            setContent(data);
        });
    }, []);

    useEffect(() => {
        setVisible(true);
    }, [user.identity])

    return (
        <div className='register-root'>
            <RegisterForm />
            <Modal
                wrapClassName="notice"
                title="新手上路"
                visible={visible}
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
                        onClick={onOkClick}
                    >确认</Button>
                ]}
            >
                <div style={{
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
        </div>
    );
});
