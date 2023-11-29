import { Editor } from './editor/Editor';
import { CT } from './sidebar/ct/CT';
import { Menu } from './sidebar/menu/Menu';

export const Window = () => {
  return (
    <div id={'window'}>
        <Menu/>
        <Editor />
        <CT/>
    </div>
  );
}
