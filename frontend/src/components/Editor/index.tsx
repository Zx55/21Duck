import React, { useState } from 'react';
import { render } from 'react-dom';
import MonacoEditor from 'react-monaco-editor';

const Editor=() => {
    
    const[code, setCode] = useState("这里输入正文");
    const[theme,setTheme]= useState("vs-light");
  
    const onChange = (newValue: any) => {
      console.log("onChange", newValue); // eslint-disable-line no-console
    };

    const options = {
      selectOnLineNumbers: true,
      roundedSelection: false,
      readOnly: false,
      cursorStyle: "line",
      automaticLayout: false,
      fontSize: 16,
      options:{
        minimap:{
          enabled: false,
          side: "left"
        }  
      }
    };
    return (
      <div id="editor">
        <MonacoEditor
          width="50%"
          height="600"
          value={code}
          options={options}
          theme={theme}
          onChange={(e)=>onChange(e)}
        />
      </div>
    );
}

export default Editor;