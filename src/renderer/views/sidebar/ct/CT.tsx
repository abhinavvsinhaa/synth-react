import { useEffect } from "react";

const Compile = () => {
  const compileCPP = () => {
    // @ts-ignore
    window.electronAPI.ipcRenderer.sendMessage('execute', {
      command: 'g++',
      arguments: ["-std=c++14"]
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
  return (
    <div className="ct-tab">
      <div className={'ct-header'}>
        <div className={'tab-details'}>
          <p className={'tab-name'}>Run test cases</p>
          <p className={'tab-description'}>Check code output against given test case</p>
        </div>
        <button className='compile-button'>Execute</button>
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
