const { response } = require("express");


const uploadFile = (req, res = response)=>{
    res.json({
        message: 'Upload File'
    })
}

module.exports = {
    uploadFile
}