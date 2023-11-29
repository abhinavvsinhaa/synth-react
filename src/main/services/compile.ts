import { spawn } from "child_process"

export const runCommand = (event: Electron.IpcMainEvent) => {
    const child = spawn('node -v')
    
    child.stdout.on('data', data => {
        console.log('data:', data);
        event.reply('onExecuted', data)
    })
    
    child.stderr.on('error', error => {
        console.log('error:', error);
    })
}
