const { app, BrowserWindow } = require('electron');

app.whenReady()
   .then(() => {
        const win = new BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {
                nodeIntegration: true
            }
        });

        win.loadFile('app/src/index.html');
   })
   .catch(console.error);