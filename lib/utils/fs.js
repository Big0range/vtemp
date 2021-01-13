const fs = require('fs')
const write = (path,data)=>{
    return fs.promises.writeFile(path,data,{encoding:'utf8'})
}
module.exports = {
    write
}