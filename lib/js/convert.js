const Row = require('./row');
const xlsx = require('xlsx');
const exif = require('./exif');

module.exports = async function(pictures, file) {
    const exifs = await Promise.all(pictures.map(src => exif(`picture/${src}`)));
    const rows = await Promise.all(exifs.map(Row.parseExif));
    const workbook = xlsx.utils.book_new();
    const worksheet = xlsx.utils.json_to_sheet(rows);
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Raw Exif');
    xlsx.writeFile(workbook, file);
}
