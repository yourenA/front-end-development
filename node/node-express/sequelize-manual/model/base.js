/**
 * Created by aresn on 16/5/11.
 */
var moment = require('moment');

var BaseModel = {
    inc: moment().valueOf(),
    // id生成
    uid: function() {
        var new_id = 0;
        new_id += moment().valueOf();// 毫秒时间戳

        // 自增
        this.inc += 1;
        new_id += this.inc;
        console.log('this.inc',this.inc )
        console.log('new_id',new_id)

        return new_id;
    },
    timestamp: function() {

    }
};

module.exports = BaseModel;