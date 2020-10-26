const { ipcRenderer } = require('electron');

const $exports = document.querySelector('div.exports');
const $files = document.querySelector('div.files');
const $fileExplorer = document.querySelector('input[type="file"]');
const $loading = document.querySelector('div.loading');
const $loadingMessage = document.querySelector('div.loading div.message span');
let pendingExportFiles = {};

window.addEventListener('load', (event) => {
    ipcRenderer.send('load');
});

function addFiles(files) {
    for (const file of files) {
        if (/image/.test(file.type) && !pendingExportFiles[file.path]) {
            pendingExportFiles[file.path] = true;
            $files.innerHTML += `<div class="file" data-path="${file.path}"><i class="fas fa-file"></i>${file.name}</div>`;
        }
    }
}

function dragOver(event) {
    event.preventDefault();
}

$fileExplorer.addEventListener('change', (event) => {
    addFiles(event.target.files);
});

document.querySelector('input[type="text"]').addEventListener('keyup', ({ target: { value } }) => {
    for (const $export of Array.from(document.querySelectorAll('div.exports div'))) {
        if (new RegExp(value).test($export.textContent)) {
            $export.style.display = 'flex';
        } else {
            $export.style.display = 'none';
        }
    }
});

document.querySelector('button.export').addEventListener('click', (event) => {
    ipcRenderer.send('export', Array.from($files.children).map(el => {
        pendingExportFiles = {};
        const path = el.getAttribute('data-path');
        el.remove();
        return path;
    }));
});

function removeExport(event) {
    const file = event.target.previousElementSibling.href.replace('file://', '').replace(/%20/g, ' ');
    ipcRenderer.send('removeexport', file);
}

function openFileExplorer(event) {
    $fileExplorer.click();
}

ipcRenderer.on('removedexport', (event, data) => {
    document.querySelector(`a[href="file://${data}"]`).parentElement.remove();
});

ipcRenderer.on('newexport', (event, data) => {
    const href = 'file://'+data;
    $exports.innerHTML += `
    <div>
        <a href="${href}" download>
            <i class="fas fa-file-download"></i>
            <span>${data.split('/').pop()}</span>
        </a>
        <i class="far fa-trash-alt" onclick="removeExport(event)"></i>
    </div>
    `;
});

ipcRenderer.on('loading', (event, isLoading) => {
    if (isLoading) {
        $loading.style.display = 'block';
    } else {
        $loading.style.display = 'none';
    }
});

ipcRenderer.on('loadingimage', (event, image) => {
    $loadingMessage.textContent = `Exporting image ${image}`;
})