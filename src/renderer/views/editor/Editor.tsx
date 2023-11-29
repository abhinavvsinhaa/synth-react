import { FallbackCTABtns } from '../../constants';
import { OpenedFileDetails } from '../../typings/files';
import { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Editor as MonacoEditor, Monaco } from '@monaco-editor/react';
import { editor } from 'monaco-editor';

export const Editor = () => {
  const [fallback, setFallback] = useState(true);
  const [openedFiles, setOpenedFiles] = useState(new Map<string, OpenedFileDetails>());
  const [activeFileId, setActiveFileId] = useState<string>('');
  const monacoEditorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  const RenderFallback = () => {
    return (
      <div id={'synth-editor-fallback-container'}>
        <div id={'synth-editor-fallback-greeting-div'}>
          Welcome to SynthCode!
        </div>
        <div id={'synth-editor-fallback-actionbtn-container'}>
          {
            FallbackCTABtns.map((ctaBtn, id) => (
              <div key={id} onClick={ctaBtn.onClick} id={'synth-editor-fallback-actionbtn'}>
                {ctaBtn.text}
              </div>
            ))
          }
        </div>
      </div>
    );
  };

  const openAFile = (fileDetails: OpenedFileDetails) => {
    const id = uuidv4();
    openedFiles.set(id, fileDetails);
    setOpenedFiles(openedFiles);
    setActiveFileId(id);
    if (fallback) setFallback(false);
  };

  function listenForFileOpenings() {
    //@ts-ignore
    window.electronAPI.ipcRenderer.on('on-file-open', (fileDetails: OpenedFileDetails) => {
      openAFile(fileDetails);
    });
  }

  function getFileDetailsById(id: string) {
    return openedFiles.get(id);
  }

  function handleEditorDidMount(editor: editor.IStandaloneCodeEditor, monaco: Monaco) {
    monacoEditorRef.current = editor;
  }

  const RenderEditor = () => {
      const activeFile = getFileDetailsById(activeFileId);
      return (
        <MonacoEditor
          height='100%'
          theme={'vs-dark'}
          defaultLanguage={activeFile?.fileExtension}
          defaultValue={activeFile?.data}
          onMount={handleEditorDidMount}
        />
      );
    }
  ;

  useEffect(() => {
    listenForFileOpenings();
  }, []);

  return (
    <div id={'synth-editor'}>
      {
        fallback ? <RenderFallback /> : <RenderEditor />
      }
    </div>
  );
};
