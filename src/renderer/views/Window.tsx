import { Editor } from './editor/Editor';
import { CT } from './sidebar/ct/CT';
import { Menu } from './sidebar/menu/Menu';
import { EditorProvider } from '../context/EditorContext';

export const Window = () => {
  return (
    <div id={'window'}>
      <Menu />
      <EditorProvider>
        <Editor />
        <CT />
      </EditorProvider>
    </div>
  );
};
