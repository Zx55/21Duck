import React, { useState, useEffect } from 'react';
import CopyToClipboard from "react-copy-to-clipboard";

import { message } from 'antd';

import MiniButton from './MiniButton';
import host from '../../api/host';


import api from '../../api';
import { useUser } from '../../hooks';

import { match } from 'react-router-dom';
import * as H from 'history';
import { IPost } from '../../types';


import axios from 'axios';
import { resetWarningCache } from 'prop-types';


export interface PostFooterProps {
    post: IPost;
    detail: boolean;
    thumb: boolean;
    history: H.History;
    match: match;
};

export default (props: PostFooterProps) => {
    const [liked, setLiked] = useState(props.thumb);
    const [likeNum, setLikeNum] = useState(props.post.posting_thumb_num);
    const user = useUser();

    useEffect(()=>{
        setLiked(props.thumb);
    },[props.thumb])

    const onLikeClick = () => {
        console.log('in:',liked,likeNum);
        if (liked) {
            const newThumb = {
                posting_id: props.post.posting_id.toString(),
                user_id: user.userId
            };
            api.post.thumbDown(newThumb);
            setLikeNum(likeNum - 1);
            setLiked(!liked);
        } else {
            const newThumb = {
                posting_id: props.post.posting_id.toString(),
                user_id: user.userId
            };
            api.post.thumbUp(newThumb);
            setLikeNum(likeNum + 1);
            setLiked(!liked);
        }
        console.log('out:',liked,likeNum);

    };

    const onShareClick = () => {
        message.config({ top: 75 });
        message.success('链接复制成功');
    };

    const onCollectClick = () => {
        console.log('collect');
    };

    const onReportClick = () => {
        console.log('report');
    };

    return (
        <div className='post-footer'>
            <span className='interaction-bar'>
                <MiniButton
                    name='like'
                    icon='like'
                    filled={liked ? true : false}
                    text={likeNum.toString()}
                    onClick={onLikeClick}
                />
                <CopyToClipboard
                    text={host + props.match.url}
                    onCopy={onShareClick}>
                    <MiniButton
                        name='share'
                        icon='export'
                        text='分享'
                        onClick={() => 0}
                    />
                </CopyToClipboard>
                <MiniButton
                    name='favorite'
                    icon='star'
                    text='收藏'
                    onClick={onCollectClick}
                />
                <MiniButton
                    name='report'
                    icon='exclamation-circle'
                    text='举报'
                    onClick={onReportClick}
                />
                {props.post.category_id===5 &&
                    <MiniButton
                        name='download'
                        icon='download'
                        text='下载'
                        onClick={() => {
                            if(user.identity === 0){
                                message.error('游客请先登录')
                            }else if(user.identity === 3){
                                message.error('请先阅读新手上路')
                            }else if(user.blocktime !== 0){
                                message.error('你已被禁言!请联系管理员')
                            }else{
                                axios.get("http://114.115.204.217:8000/api/resource?posting_id="+props.post.posting_id).then((response)=>{
                                console.log('dw:',response.data.url);
                                const aLink=document.createElement('a');//创建a链接
                                aLink.style.display='none';
                                aLink.href=response.data.url;
                                aLink.download='download';
                                document.body.appendChild(aLink);
                                aLink.click();
                                document.body.removeChild(aLink);//点击完成后记得删除创建的链接 
                            })
                            }
                        }}
                    />
                }
            </span>
            {props.detail ? null :
                <span className='read-more-bar'>
                    <MiniButton
                        name='read-more'
                        icon='select'
                        text='更多'
                        onClick={() => {
                            if(user.identity === 0){
                                message.error('游客请先登录')
                            }else if(user.identity === 3){
                                message.error('请先阅读新手上路')
                            }else if(user.blocktime !== 0){
                                message.error('你已被禁言!请联系管理员')
                            }else{
                                props.history.push(`${props.match.path}/${props.post.posting_id}`)
                            }
                        }}
                    />
                </span>
            }
            <span className='post-reply-num'>{props.post.reply_num} 条回复</span>
        </div>
    );
};
