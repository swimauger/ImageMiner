const { ExifImage } = require('exif');

module.exports = function(src) {
    return new Promise((resolve) => {
        new ExifImage({ image: src }, (err, data) => {
            if (err) {
                src = src.split('/');
                resolve({
                    image: {
                        ImageId: src[src.length-1]
                    }
                });
            } else {
                data.image['ImageId'] = src.split('/');
                data.image['ImageId'] = data.image['ImageId'][data.image['ImageId'].length-1];
                resolve(data);
            }
        });
    });
}