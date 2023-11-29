import React, { useEffect, useRef, useState } from 'react';
import { OpenedFileDetails } from '../typings/files';
import { editor } from 'monaco-editor';
import { v4 as uuidv4 } from 'uuid';
import { Monaco } from '@monaco-editor/react';
import { EditorContextType } from '../typings/context';
import { ipcRenderer } from 'electron';

export const EditorContext = React.createContext<EditorContextType>({
  handle: {
    getFileDetailsById: () => {
      return undefined;
    },
    listenForFileOpenings: () => {
      return;
    },
    handleEditorDidMount: () => {
      return;
    },
    updateActiveFileId: () => {
      return;
    }
  }, values: {
    fallback: true,
    openedFiles: new Map<string, OpenedFileDetails>(),
    activeFileId: '',
    monacoEditorRef: null,
  }
});
EditorContext.displayName = 'EditorContext';

export function EditorProvider(props: { children: React.ReactNode }) {

  const [fallback, setFallback] = useState(true);
  const [openedFiles, setOpenedFiles] = useState(new Map<string, OpenedFileDetails>());
  const [activeFileId, setActiveFileId] = useState<string>('');
  const monacoEditorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  const updateActiveFileId = (id: string) => {
    setActiveFileId(id);
  };

  const openAFile = (fileDetails: OpenedFileDetails) => {
    const id = uuidv4();
    setActiveFileId(id);
    setOpenedFiles(new Map(openedFiles.set(id, fileDetails)));
    if (fallback) setFallback(false);
  };

  function getFileDetailsById(id: string) {
    return openedFiles.get(id);
  }

  function handleEditorDidMount(editor: editor.IStandaloneCodeEditor, monaco: Monaco) {
    monacoEditorRef.current = editor;
  }

  function listenForFileOpenings() {
    //@ts-ignore
    window.electronAPI.ipcRenderer.on('on-file-open', (fileDetails: OpenedFileDetails) => {
      openAFile(fileDetails);
    });
  }

  useEffect(() => {
    console.log('opened files updated:', openedFiles.keys());
  }, [openedFiles]);

  return (
    <EditorContext.Provider {...props} value={{
      handle: {
        listenForFileOpenings,
        getFileDetailsById,
        handleEditorDidMount,
        updateActiveFileId
      },
      values: {
        fallback,
        activeFileId,
        openedFiles,
        monacoEditorRef
      }
    }}></EditorContext.Provider>
  );
}

export function useEditor() {
  const context = React.useContext(EditorContext);
  if (context === undefined) throw new Error('useEditor must be used within EditorProvider');
  return context;
}
