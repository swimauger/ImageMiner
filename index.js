const { app, ipcMain, BrowserWindow } = require('electron');
const fs = require('fs');
const fsp = require('fs').promises;
const path = require('path');
const convert = require('./lib/js/convert');

let win;
const dataFolder = path.resolve(app.getPath('userData'), 'exports');

app.whenReady()
.then(async () => {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });
    win.loadFile('app/src/index.html');
    if (!fs.existsSync(dataFolder)) {
        await fsp.mkdir(dataFolder, { recursive: true });
    }
})
.catch(console.error);

ipcMain.on('load', async (event, data) => {
     const files = await fsp.readdir(dataFolder);
     files.forEach(file => win.webContents.send('newexport', path.resolve(dataFolder, file)));
});

ipcMain.on('removeexport', async (event, data) => {
    await fsp.unlink(data);
    event.reply('removedexport', data);
});

ipcMain.on('export', async (event, data) => {
    const files = await fsp.readdir(dataFolder);
    const filePath = path.resolve(dataFolder, `imagemine-${files.length}.xlsx`);
    await convert(data, filePath);
    event.reply('newexport', filePath);
});