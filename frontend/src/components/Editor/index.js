import React from 'react';
import ForEditor from 'for-editor';


export default ({ content, setContent }) => (
    <ForEditor
        value={content}
        preview={true}
        subfield={true}
        onChange={(content) => setContent(content)}
    />
);
