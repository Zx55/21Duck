import React, { useState, useEffect } from 'react';
import Editor from 'for-editor';

const MyEditor=() => {
    
    const[content,setContent] = useState('');
    const handleChange=(value) => {
        setContent(value)
    }

    return <Editor value={content} preview={true} subfield={true} onChange={value => handleChange(value)} />
}

export default MyEditor;
