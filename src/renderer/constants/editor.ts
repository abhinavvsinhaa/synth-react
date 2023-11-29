import { OpenedFileDetails } from '../typings/files';


export const FallbackCTABtns = [
  {
    id: 'editor.fallback.openfile',
    text: 'Open a file',
    onClick: async () => {
      // @ts-ignore
      window.electronAPI.ipcRenderer.sendMessage('showOpenDialog');
    }
  },
  {
    id: 'editor.fallback.createfile',
    text: 'Create a new file',
    onClick: async () => {
      //@ts-ignore
      window.electronAPI.ipcRenderer.sendMessage('showSaveDialog');
    }
  }
];