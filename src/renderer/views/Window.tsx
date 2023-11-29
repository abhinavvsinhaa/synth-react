import { Editor } from './editor/Editor';
import { CT } from './sidebar/ct/CT';
import { Menu } from './sidebar/menu/Menu';
import "../css/views/index.css"

export const Window = () => {
  return (
    <div className={'window'}>
        <Menu/>
        <Editor />
        <CT/>
    </div>
  );
}
