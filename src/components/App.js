import React, { useState, useEffect } from 'react';
import logo from '../logo.svg';
import Editor from './Editor';
import useLocalStorage from '../hooks/useLocalStorage';


function App() {
  //* setting default data for the variables used to
  //* store the user data locally.
  const [html, setHTML] = useLocalStorage('html','');
  const [css, setCSS] = useLocalStorage('css','');
  const [js, setJS] = useLocalStorage('js','');
  const [srcDoc, setsrcDoc] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setsrcDoc(`
    <html>
    <body>${html}</body>
    <style>${css}</style>
    <script>${js}</script>
    </html>
  `)
    }, 250)
    return () => clearTimeout(timeout)
  }, [html, css, js])
  return (
   <>
      <div className="pane top-panel">
        <Editor
          language="xml"
          displayname="HTML"
          value={html}
          onChange={setHTML}
         />
        <Editor 
          language="css"
          displayname="CSS"
          value={css}
          onChange={setCSS}
        />
        <Editor 
          language="javascript"
          displayname="JAVASCRIPT"
          value={js}
          onChange={setJS}
        />
      </div>
      <div className="pane">

        <iframe 
        srcDoc={srcDoc}
        title="output"
        //* to only run scripts and nothing other
        //* than that.
          sandbox="allow-scripts"
          //* no borders.
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
   </>
  );
}

export default App;

//* iframe - An inline frame is used to embed another document 
//* within the current HTML document.

//* useState - A Hook is a special function that lets you “hook into” React features. 
//* For example, useState is a Hook that lets you add React state to function components.
//* Previously we used function components to render non changing components and
//* class components with changing data and state data.
//* but here we can use state and make the function component render with changing data.