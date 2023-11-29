import { useEffect } from "react";

const Compile = () => {
  const compileCPP = () => {
    // @ts-ignore
    window.electronAPI.ipcRenderer.sendMessage('execute', {

    })

     // @ts-ignore
     window.electronAPI.ipcRenderer.on('onExecuted', data => {
      var decoded = new TextDecoder().decode(data)
      const ele = document.getElementById('compile-output-text')
      ele!.innerText = decoded 
    })
  }

  // useEffect(() => {
  // }, [])

  return (
    <div className="ct-tab">
      <div className={'ct-header'}>
        <div className={'tab-details'}>
          <p className={'tab-name'}>Compile</p>
          <p className={'tab-description'}>See your code's compilation results here</p>
        </div>
        <button className='compile-button' onClick={compileCPP}>Compile</button>
      </div>
      <div className='ct-output'>
        <p id='compile-output-text'></p>
      </div>
    </div>
  );
}

const RunTestCase = () => {
  const runCPP = () => {
    // @ts-ignore
    window.electronAPI.ipcRenderer.sendMessage('run')

     // @ts-ignore
     window.electronAPI.ipcRenderer.on('onRan', data => {
      var decoded = new TextDecoder().decode(data)
      console.log('run:', data);
      
      // const ele = document.getElementById('compile-output-text')
      // ele!.innerText = decoded 
    })
  }

  return (
    <div className="ct-tab">
      <div className={'ct-header'}>
        <div className={'tab-details'}>
          <p className={'tab-name'}>Run test cases</p>
          <p className={'tab-description'}>Check code output against given test case</p>
        </div>
        <button className='compile-button' onClick={runCPP}>Execute</button>
      </div>
    </div>
  );
}

export const CT = () => {
  return (
    <div id={'synth-ct'}>
      <Compile/>
      <RunTestCase/>
    </div>
  );
}
