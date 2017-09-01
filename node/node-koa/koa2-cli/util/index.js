/**
 * Created by Administrator on 2017/8/31.
 */
var crypto = require('crypto');
exports.md5 = (str)=>{
    if(!str){
        return null;
    }
    return crypto.createHash('md5').update(str).digest('hex');
};


exports.handleResult = (result,info) =>{
    if(typeof (result) === 'string'){
        return {
            status: -1,
            info: result
        }
    }else{
        return {
            status: 0,
            info: info,
            data:result
        }
    }
};