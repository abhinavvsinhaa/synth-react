import { Monaco } from '@monaco-editor/react';
import { editor } from 'monaco-editor';
import { OpenedFileDetails } from './files';
import React, { MutableRefObject } from 'react';

export type EditorContextType = {
  handle: {
    listenForFileOpenings: () => void,
    handleEditorDidMount: (editor: editor.IStandaloneCodeEditor, monaco: Monaco) => void
    getFileDetailsById: (id: string) => OpenedFileDetails | undefined,
    updateActiveFileId: (id: string) => void,
    getActiveFileDetails: () => OpenedFileDetails | undefined
  },
  values: {
    fallback: boolean,
    openedFiles: Map<string, OpenedFileDetails>,
    activeFileId: string,
    monacoEditorRef: React.MutableRefObject<editor.IStandaloneCodeEditor | null> | null,
  }
}
