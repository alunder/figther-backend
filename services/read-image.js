const mime = require('mime-types');
const fs = require('fs');
const Env = require('../env');
exports.readImage = async (request, reply) => {
    
    var mimeType = mime.lookup(request.params.name);
    if (mimeType == false) {
        mimeType = 'image/jpg';
    }
    var img = fs.readFileSync(Env.IMAGE_PATH + request.params.name);
    reply(img).header('Content-Disposition', 'inline').header('Content-type', mimeType);
};