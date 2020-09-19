const { ExifImage } = require('exif');

module.exports = function(src) {
    return new Promise((resolve, reject) => {
        new ExifImage({ image: src }, (err, data) => {
            if (err) {
                reject(err);
            } else {
                data.image['ImageId'] = src.split('/');
                data.image['ImageId'] = data.image['ImageId'][data.image['ImageId'].length-1];
                resolve(data);
            }
        });
    });
}