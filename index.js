/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */



/*
 * 
 * @param {string} options /public/sitemap
 * 
 */
var fs = require('fs');
module.exports.getFile = function(path,fileName,callback){
   var fileLocation = path+'/'+fileName+".json";
    var file;
    var dir;
    var fileExists;

    dir = fs.readdirSync(path);
    if(!dir){
        console.log(dir)
        console.error('no such directory as '+path);
        return;
    }else{
        for(var i in dir){
            if(dir[i] === fileName+'.json'){
                fileExists = true;
            }
        }
        if(!fileExists){
            file = fs.writeFileSync(fileLocation);
        }

        file = fs.open(fileLocation,'rs+',function(err,data){
            if(err){
                console.log(err)
            }else{
                var stat = fs.statSync(fileLocation);

                 var buffer = new Buffer(stat.size);
                var content = fs.readFileSync(fileLocation,'utf8');
                callback(JSON.parse(content));

            }
        });
    }

}


module.exports.generate = function(path,fileName){
    this.getFile(path,fileName,function(content){
        for(var i in content){
            console.log(content[i]);
        }
    });
}