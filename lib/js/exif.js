const { ExifImage } = require('exif');
const win = require('../../index');

module.exports = function(src, callback) {
    return new Promise((resolve) => {
        new ExifImage({ image: src }, (err, data) => {
            if (err) {
                src = src.split('/');
                callback(src[src.length-1]);
                resolve({
                    image: {
                        ImageId: src[src.length-1]
                    }
                });
            } else {
                data.image['ImageId'] = src.split('/');
                data.image['ImageId'] = data.image['ImageId'][data.image['ImageId'].length-1];
                callback(data.image['ImageId']);
                resolve(data);
            }
        });
    });
}