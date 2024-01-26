import React, { useState, useEffect } from 'react';
import dynamic from "next/dynamic";
const ReactQuill = dynamic(import('react-quill'), { ssr: false })
import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components'
import { InputLabel } from '../../styled-components/formInputs';

const Editor = styled.div`
.ql-editor{
    height: 350px;
}
`
const TextEditor = (props) => {
    const { value, onChange } = props
    const [editorValue, setEditorValue] = useState(value);

    useEffect(() => {
        if (value) {
            setEditorValue(value)
        }
    }, [value]);

    const handleChange = (value) => {
        setEditorValue(value);
        onChange(value.toString("markdown"));
    };

    return (
        <>
            <InputLabel required={true}>Content</InputLabel>
            <Editor>
                <ReactQuill
                    modules={TextEditor.modules}
                    theme="snow" value={editorValue} onChange={handleChange} />
            </Editor>
        </>

    );
};

export default TextEditor;

TextEditor.modules = {
    toolbar: [
        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' },
        { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image', 'video'],
        ['clean']
    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    }
}