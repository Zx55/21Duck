import React from 'react';
import Markdown from 'react-markdown';


export interface PostContentProps {
    content: string;
};

export default (props: PostContentProps) => (
    <div className='post-content'>
        <Markdown source={props.content} />
    </div>
);