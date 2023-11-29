import { OpenedFileDetails } from '../../typings/files';
import { useEditor } from '../../context/EditorContext';

export default function FileTabs() {
  const { handle, values } = useEditor();
  return (
    values.openedFiles.size === 0 ? (
      <></>
    ) : (
      <div id={'synth-editor-file-tabs'}>
        {
          [...values.openedFiles.keys()].map((key, id) => (
            <div onClick={() => {
              handle.updateActiveFileId(key);
            }} key={key} className={values.activeFileId === key ? 'synth-editor-file-tab-active' : ''} id={'synth-editor-file-tab'}>
              {values.openedFiles.get(key)?.fileName}
            </div>
          ))
        }
      </div>
    )
  );
}
