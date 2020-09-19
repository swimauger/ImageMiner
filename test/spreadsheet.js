const fs = require('fs').promises;
const path = require('path');
const convert = require('../lib/js/convert');

(async () => {
    let pictures = await fs.readdir(path.resolve(__dirname, 'picture'));
    pictures = pictures.map(pic => path.resolve(__dirname, 'picture', pic));
    await convert(pictures, path.resolve(__dirname, 'test.xlsx'));
})();
