String.prototype.toTitleCase = function () {
    return this[0].toUpperCase() + this.substr(1, this.length);
}

class Row {    
    static parseExifValue(val) {
        if (val instanceof Array) {
            return val.toString();
        } else if (val instanceof Buffer) {
            return 'N/A';
        } else {
            return val;
        }
    }

    static parseExif(exif) {
        const columns = {};
        for (const key in exif) {
            for (const prop in exif[key]) {
                if (!columns[prop.toTitleCase()]) {
                    columns[prop.toTitleCase()] = Row.parseExifValue(exif[key][prop]);
                } else {
                    columns[key.toTitleCase() + prop.toTitleCase()] = Row.parseExifValue(exif[key][prop]);
                }
            }
        }
        return columns;
    }
}

module.exports = Row;