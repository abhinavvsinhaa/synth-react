import { useEditor } from '../../../context/EditorContext';
import { useEffect, useState } from 'react';


export const CT = () => {
  const { values, handle } = useEditor();
  const [status, setStatus] = useState('');
  const [output, setOutput] = useState('');
  const [input, setInput] = useState('');

  const Compile = () => {
    const compileCPP = () => {
      setOutput('');
      setStatus('');
      // @ts-ignore
      window.electronAPI.ipcRenderer.sendMessage('compileAndRun', {
        filePath: handle.getActiveFileDetails()?.path,
        inputData: input
      });
    };

    useEffect(() => {
      //@ts-ignore
      window.electronAPI.ipcRenderer.on('compilationStatus', (status: AllowSharedBufferSource) => {
        const decoded = new TextDecoder().decode(status);
        setStatus(decoded);
      });
      //@ts-ignore
      window.electronAPI.ipcRenderer.on('scriptExecuted', (output: AllowSharedBufferSource) => {
        const decoded = new TextDecoder().decode(output);
        setOutput(decoded);
      });
    }, []);

    return (
      <div className='ct-tab'>
        <div className={'ct-header'}>
          <div className={'tab-details'}>
            <p className={'tab-name'}>Compile and Run</p>
            <p className={'tab-description'}>See your code's compilation results here</p>
          </div>
          <button className='compile-button' onClick={compileCPP}>Compile and Run</button>
        </div>
        <div className={'ct-input'}>
          <textarea value={input} onChange={(e) => {
            setInput(e.target.value);
          }}></textarea>
        </div>
        <div className='ct-output'>
          <p id='compile-output-text'>{output || status}</p>
        </div>
      </div>
    );
  };

  const RunTestCase = () => {
    const runCPP = () => {
      // @ts-ignore
      window.electronAPI.ipcRenderer.sendMessage('run');

      // @ts-ignore
      window.electronAPI.ipcRenderer.on('onRan', data => {
        var decoded = new TextDecoder().decode(data);
        console.log('run:', data);

        // const ele = document.getElementById('compile-output-text')
        // ele!.innerText = decoded
      });
    };

    return (
      <div className='ct-tab'>
        <div className={'ct-header'}>
          <div className={'tab-details'}>
            <p className={'tab-name'}>Run test cases</p>
            <p className={'tab-description'}>Check code output against given test case</p>
          </div>
          <button className='compile-button' onClick={runCPP}>Execute</button>
        </div>
      </div>
    );
  };
  return (
    <div id={'synth-ct'}>
      <Compile />
    </div>
  );
};
