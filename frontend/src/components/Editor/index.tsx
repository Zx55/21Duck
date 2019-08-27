import React, { useState, useEffect } from 'react';
import MonacoEditor from 'react-monaco-editor';
import './Editor.css'
import marked from 'marked'
import * as monacoEditor from 'monaco-editor/esm/vs/editor/editor.api';


const Editor=() => {
    const[theme,setTheme] = useState("vs-light");
    const[content,setContent] = useState('// type your code... \n');
    
    const onChange=(newValue: string) => {
        setContent(newValue);
    };
  
    const options = {
        selectOnLineNumbers: true,
        roundedSelection: false,
        readOnly: false,
        cursorStyle: "line",
        automaticLayout: false,
        fontSize: 16,
    };

    return (
        <div id="editor">
            <div className="editor-square">
                <MonacoEditor
                    width="100%"
                    height="600"
                    value={content}
                    options={options}
                    theme={theme}
                    onChange={onChange}
                />
            </div>
            <div className="preview-square">
                <div
                    className='post-content'
                    dangerouslySetInnerHTML={{
                        __html: marked(content)
                    }}
                />
            </div>
        </div>
    );
}

export default Editor;
