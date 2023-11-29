import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import { Window } from './views/Window';
import './App.css';
import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    // //@ts-ignore
    // window.electronAPI.ipcRenderer.sendMessage('showOpenDialog');
    // //@ts-ignore
    // window.electronAPI.ipcRenderer.on('on-file-open', (fileDetails: OpenedFileDetails) => {
    //   console.log(fileDetails);
    // });
  }, []);
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Window />} />
      </Routes>
    </Router>
  );
}
