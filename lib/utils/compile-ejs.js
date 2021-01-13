const path = require('path')
const ejs = require('ejs')
const compileEjs = (template, data = {}) => {
    const templatePath = path.resolve(__dirname, `../template/${template}.ejs`)
    console.log(templatePath)
    return ejs.renderFile(templatePath, { data }, { async: true })
}
module.exports = {
    compileEjs
}