import React, { useState, useEffect } from 'react';
import MonacoEditor from 'react-monaco-editor';
import './Editor.css'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css';

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

    marked.setOptions({
        highlight: function(code) {
          return hljs.highlightAuto(code).value;
        },
        pedantic: false,
        gfm: true,
        tables: true,
        breaks: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        xhtml: false
      }); 

    return (
        <div id="editor">
            <div className="editor-square">
                <MonacoEditor

                    height="600"
                    value={content}
                    options={options}
                    theme={theme}
                    onChange={onChange}
                />
            </div>
            <div className="preview-square">
                <div
                    className='preview-content'
                    dangerouslySetInnerHTML={{
                        __html: marked(content)
                    }}
                />
            </div>
        </div>
    );
}

export default Editor;
