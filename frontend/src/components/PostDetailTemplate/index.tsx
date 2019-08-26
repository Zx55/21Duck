import React, {useState, useEffect} from 'react';
import { withRouter } from 'react-router-dom';

import api from '../../api';
import MainFrame from './MainFrame';

import { RouteComponentProps } from 'react-router-dom';
import { RepostItem } from '../../types';
import { Param } from '../../types';

import './Template.css';


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

        const params: Param = {
            page: page,
            posting_id: postId,
        };

        api.repost.list(params).then((response) => {
            const reposts: Array<RepostItem> = response.data;
            console.log(reposts);
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
                reposts={reposts}
                repostNum={repostNum}
                getReposts={getReposts}
                loading={loading}
            />
        </div>
    );
});
