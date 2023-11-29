import { ExtensionLanguageMap, FallbackCTABtns } from '../../constants';
import { OpenedFileDetails } from '../../typings/files';
import { useEffect, useRef, useState } from 'react';
import { Editor as MonacoEditor, Monaco } from '@monaco-editor/react';
import FileTabs from './FileTabs';
import { useEditor } from '../../context/EditorContext';

export const Editor = () => {
  const { handle, values } = useEditor();
  const parentRef = useRef(null);

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

  const RenderEditor = () => {
      const activeFile = handle.getFileDetailsById(values.activeFileId);
      const fallBackLanguage = 'js';
      return (
        <MonacoEditor
          height='100%'
          theme={'vs-dark'}
          defaultLanguage={ExtensionLanguageMap.get(activeFile?.fileExtension || fallBackLanguage)}
          defaultValue={activeFile?.data}
          onMount={handle.handleEditorDidMount}
        />
      );
    }
  ;

  useEffect(() => {
    handle.listenForFileOpenings();
  }, []);

  return (
    <div id={'synth-editor'} ref={parentRef}>
      <FileTabs filesArr={values.filesArr} activeFileId={values.activeFileId} />
      {
        values.fallback ? <RenderFallback /> : <RenderEditor />
      }
    </div>
  );
};
