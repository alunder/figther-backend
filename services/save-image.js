const multiparty = require('multiparty');
const Env = require('../env');
const fs = require('fs');
const path = require('path');
const random = require('random-number');
const options = {
    min:  100000000000, 
    max:  999999999999, 
    integer: true
  };
exports.saveImage = async (request, reply) => {
    var form = new multiparty.Form();
    var image_name = "";
    form.parse(request.payload, async (err, fields, files) => {

    if (err) return reply({
        message: "failed",
        file_name: null
    });
    else {
        if(files.image){
            image_name = random(options) + Date.now() + path.extname(files.image[0].originalFilename);
            upload(files.image[0], reply, image_name);
        } else {
            reply({
                message: "failed",
                file_name: null
            });
        }
        
    }
    });
  };
  exports.saveImageAdmin = async (request, reply) => {
    var form = new multiparty.Form();
    var image_name = "";
    form.parse(request.payload, async (err, fields, files) => { 
    if (err) return reply({
        message: "failed",
        file_name: null
    });
    else {
        if(files.file){
            image_name = random(options) + Date.now() + path.extname(files.file[0].originalFilename);
            upload(files.file[0], reply, image_name);
        } else {
            reply({
                message: "failed",
                file_name: null
            });
        }
        
    }
    });
  };
  
  const upload = async (files, reply, fileName) => {
    fs.readFile(files.path, async (err, data) => {
  
      fs.writeFile(Env.IMAGE_PATH + fileName, data, async (err) => {
  
        if (err) return reply({
            message: "failed",
            file_name: null
        });
        else {
            console.log("Success!");
            console.log(Env.IMAGE_PATH + fileName);          
          return reply({message:'success!',file_name: fileName});
        }
  
      });
    });
  };