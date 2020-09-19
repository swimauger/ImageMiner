String.prototype.toTitleCase = function () {
    return this[0].toUpperCase() + this.substr(1, this.length);
}

class Row {
    static headers = ['ImageId', 'ImageWidth','ImageHeight','Make','Model','Orientation','XResolution','YResolution','ResolutionUnit','Software','ModifyDate','YCbCrPositioning','ExifOffset','GPSInfo','ThumbnailImageWidth','ThumbnailImageHeight','Compression','ThumbnailOrientation','ThumbnailXResolution','ThumbnailYResolution','ThumbnailResolutionUnit','ThumbnailOffset','ThumbnailLength','ExposureTime','FNumber','ExposureProgram','ISO','ExifVersion','DateTimeOriginal','CreateDate','ComponentsConfiguration','ShutterSpeedValue','ApertureValue','BrightnessValue','ExposureCompensation','MaxApertureValue','MeteringMode','LightSource','Flash','FocalLength','MakerNote','UserComment','FlashpixVersion','ColorSpace','ExifImageWidth','ExifImageHeight','InteropOffset','SensingMethod','SceneType','ExposureMode','WhiteBalance','FocalLengthIn35mmFormat','SceneCaptureType','ImageUniqueID','GPSVersionID','GPSLatitudeRef','GPSLatitude','GPSLongitudeRef','GPSLongitude','GPSAltitudeRef','GPSAltitude','GPSTimeStamp','GPSDateStamp','InteropIndex','InteropVersion','Error'];
    
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

    constructor(columns) {
        for (const header of Row.headers) {
            this[header] = columns[header] ? columns[header] : 'N/A';
        }
    }
}

module.exports = Row;