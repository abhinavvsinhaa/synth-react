import { OpenedFileDetails } from '../../typings/files';

export default function FileTabs({ filesArr, activeFileId }: { filesArr: OpenedFileDetails[], activeFileId: string }) {

  return (
    filesArr.length === 0 ? (
      <></>
    ) : (
      <div id={'synth-editor-file-tabs'}>
        {
          filesArr.map((file) => (
            <div id={'synth-editor-file-tab'}>
              {file.fileName}
            </div>
          ))
        }
      </div>
    )
  );
}
