import React, { useState, useEffect } from 'react';

import api from '../../api';
import MainFrame from './MainFrame';
import Loading from '../../components/Loading';

import { PostItem } from '../../types';
import { Param } from '../../types';

import './Template.css';


export interface IndexTemplateProps {
    name: string;
    category: string;
};

export default (props: IndexTemplateProps) => {
    const [posts, setPosts] = useState(new Array<PostItem>());
    const [postNum, setPostNum] = useState(0);
    const [loading, setLoading] = useState(true);

    const getPosts = (page: string): void => {
        setLoading(true);

        const params: Param = {
            page: page,
            category: props.category,
        };

        api.post.list(params).then((response) => {
            const posts: Array<PostItem> = response.data;
            setPostNum(posts[0].posting_num);
            setPosts(posts);
            setLoading(false);
        }).catch(err => console.log(err));
    };

    useEffect(() => {
        getPosts('0');
    }, []);

    return (
        <div className={`${props.name}-root`}>
            <div>{props.name}</div>
            {loading ? <Loading /> :
                <MainFrame
                    name={props.name}
                    posts={posts}
                    postNum={postNum}
                    getPosts={getPosts}
                />}
        </div>
    );
};
