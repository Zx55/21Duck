import React, {useState, useEffect} from 'react';
import { withRouter } from 'react-router-dom';

import api from '../../api';
import MainFrame from './MainFrame';

import { RouteComponentProps } from 'react-router-dom';
import { RepostItem, PostItem } from '../../types';
import { Param } from '../../types';

import './Template.css';


const post: PostItem = {
    posting_id: 177,
    user_head: "https://b-ssl.duitang.com/uploads/item/201805/31/20180531220859_wufxi.jpg",
    posting_num: 24,
    posting_user: "123457",
    user_nickname: "泊进之介",
    relative_posting_time: "10 天之前",
    relative_reply_time: "1 天之前",
    reply_num: 61,
    theme: "西北工业大学",
    posting_content: "凉西省开元市墩探路2712号歹相小区18单元147室",
    category_id: 1,
    posting_thumb_num: 97
};

export interface PageDetailTemplate extends RouteComponentProps {
    name: string;
    category: string;
}

export default withRouter((props: PageDetailTemplate) => {
    let initReposts = new Array<RepostItem>();
    for (let i = 0; i < 15; ++i) {
        initReposts.push(new RepostItem());
    }

    const postId = (props.match.params as { postId: string }).postId;
    const [reposts, setReposts] = useState(initReposts);
    const [repostNum, setRepostNum] = useState(0);
    const [loading, setLoading] = useState(true);

    const getReposts = (page: string): void => {
        setLoading(true);

        // Todo: 传入一个category_id进行验证
        const params: Param = {
            page: page,
            posting_id: postId,
        };

        api.repost.list(params).then((response) => {
            const reposts: Array<RepostItem> = response.data;
            setRepostNum(reposts.length === 0 ? 0 : reposts[0].reposting_num);
            setReposts(reposts);
            setLoading(false);
        }).catch(err => console.log(err));
    };

    useEffect(() => {
        getReposts('0');
    }, []);

    return (
        <div className={`${props.name}-detail-root`}>
            <MainFrame
                name={props.name}
                post={post}
                reposts={reposts}
                repostNum={repostNum}
                getReposts={getReposts}
                loading={loading}
            />
        </div>
    );
});
