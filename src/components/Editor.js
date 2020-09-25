import React, { useState } from 'react';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
//* xml or html code compile support
import 'codemirror/mode/xml/xml';
//* javascript code compile support
import 'codemirror/mode/javascript/javascript';
//* css code compile support
import 'codemirror/mode/css/css';
import { Controlled as ControlledEditor } from 'react-codemirror2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompressAlt, faExpandAlt } from '@fortawesome/free-solid-svg-icons';

export default function Editor(props) {
    const { displayname,
        language,
        value,
        onChange } = props;
        const [open, setOpen] = useState(true)
        const onBeforeChange = (editor, data, value) => {
            onChange(value);
        }
    return (
        <div className={`editor-container ${ open ? '': 'collapsed' }`}>
            <div className="editor-title">
                { displayname }
                <button
                type="button"
                className="expand-collapse-button"
                onClick={() => {
                    setOpen(prevOpen => !prevOpen)
                }}
                >
                    <FontAwesomeIcon icon={ open ? faCompressAlt: faExpandAlt }/>
                </button>
            </div>
            <ControlledEditor
                onBeforeChange={onBeforeChange}
                value={value}
                className="code-mirror-wrapper"
                options={{
                    lineWrapping: true,
                    lint: true,
                    mode: language,
                    theme: 'material',
                    lineNumbers: true
                }}
            />
        </div>
    );
}

//* the onBeforeChange method works same as onChange
//*  but the thing is they run before the change.