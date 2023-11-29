import {OpenedFileDetails} from "./files";
import IStandaloneCodeEditor = editor.IStandaloneCodeEditor;
import {editor} from "monaco-editor";

export type OpenedEditor = {
    monacoEditor?:IStandaloneCodeEditor,
    opened:boolean
} & OpenedFileDetails