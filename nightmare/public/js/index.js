"use strict";

var data = [{
    "test_name": "相加",
    "status_code": 200,
    "status_code_explain": "成功",
    "level": 1
}, {
    "test_name": "A分组",
    "status_code": 200,
    "status_code_explain": "成功",
    "level": 1
}, {
    "test_name": "相减",
    "status_code": 200,
    "status_code_explain": "成功",
    "level": 2
}, {
    "test_name": "B分组",
    "status_code": 200,
    "status_code_explain": "成功",
    "level": 1
}, {
    "test_name": "相加",
    "status_code": 200,
    "status_code_explain": "成功",
    "level": 2
}, {
    "test_name": "C分组",
    "status_code": 200,
    "status_code_explain": "成功",
    "level": 2
}, {
    "test_name": "相乘",
    "status_code": 200,
    "status_code_explain": "成功",
    "level": 3
}, {
    "test_name": "相加",
    "status_code": 200,
    "status_code_explain": "成功",
    "level": 2
}, {
    "test_name": "比较",
    "status_code": 200,
    "status_code_explain": "成功",
    "level": 2
}, {
    "test_name": "阶乘",
    "status_code": 200,
    "status_code_explain": "成功",
    "level": 1
}, {
    "test_name": "比较",
    "status_code": 200,
    "status_code_explain": "成功",
    "level": 1
}, {
    "test_name": "阶乘",
    "status_code": 200,
    "status_code_explain": "成功",
    "level": 1
}, {
    "test_name": "阶乘",
    "status_code": 200,
    "status_code_explain": "成功",
    "level": 1
}, {
    "test_name": "阶乘",
    "status_code": 200,
    "status_code_explain": "成功",
    "level": 1
}, {
    "test_name": "阶乘",
    "status_code": 200,
    "status_code_explain": "成功",
    "level": 1
}];
var resultAdata = [];
for (var i = 0, len = data.length; i < len; i++) {
    if (data[i].level > 1) {
        console.log(resultAdata[i - 1]);
        resultAdata[i - 1].children = [data[i]];
    } else {
        resultAdata.push(data[i]);
    }
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbImRhdGEiLCJyZXN1bHRBZGF0YSIsImkiLCJsZW4iLCJsZW5ndGgiLCJsZXZlbCIsImNvbnNvbGUiLCJsb2ciLCJjaGlsZHJlbiIsInB1c2giXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBTUEsT0FBSyxDQUNQO0FBQ0ksaUJBQWEsSUFEakI7QUFFSSxtQkFBZSxHQUZuQjtBQUdJLDJCQUF1QixJQUgzQjtBQUlJLGFBQVM7QUFKYixDQURPLEVBT1A7QUFDSSxpQkFBYSxLQURqQjtBQUVJLG1CQUFlLEdBRm5CO0FBR0ksMkJBQXVCLElBSDNCO0FBSUksYUFBUztBQUpiLENBUE8sRUFhUDtBQUNJLGlCQUFhLElBRGpCO0FBRUksbUJBQWUsR0FGbkI7QUFHSSwyQkFBdUIsSUFIM0I7QUFJSSxhQUFTO0FBSmIsQ0FiTyxFQW1CUDtBQUNJLGlCQUFhLEtBRGpCO0FBRUksbUJBQWUsR0FGbkI7QUFHSSwyQkFBdUIsSUFIM0I7QUFJSSxhQUFTO0FBSmIsQ0FuQk8sRUF5QlA7QUFDSSxpQkFBYSxJQURqQjtBQUVJLG1CQUFlLEdBRm5CO0FBR0ksMkJBQXVCLElBSDNCO0FBSUksYUFBUztBQUpiLENBekJPLEVBK0JQO0FBQ0ksaUJBQWEsS0FEakI7QUFFSSxtQkFBZSxHQUZuQjtBQUdJLDJCQUF1QixJQUgzQjtBQUlJLGFBQVM7QUFKYixDQS9CTyxFQXFDUDtBQUNJLGlCQUFhLElBRGpCO0FBRUksbUJBQWUsR0FGbkI7QUFHSSwyQkFBdUIsSUFIM0I7QUFJSSxhQUFTO0FBSmIsQ0FyQ08sRUEyQ1A7QUFDSSxpQkFBYSxJQURqQjtBQUVJLG1CQUFlLEdBRm5CO0FBR0ksMkJBQXVCLElBSDNCO0FBSUksYUFBUztBQUpiLENBM0NPLEVBaURQO0FBQ0ksaUJBQWEsSUFEakI7QUFFSSxtQkFBZSxHQUZuQjtBQUdJLDJCQUF1QixJQUgzQjtBQUlJLGFBQVM7QUFKYixDQWpETyxFQXVEUDtBQUNJLGlCQUFhLElBRGpCO0FBRUksbUJBQWUsR0FGbkI7QUFHSSwyQkFBdUIsSUFIM0I7QUFJSSxhQUFTO0FBSmIsQ0F2RE8sRUE2RFA7QUFDSSxpQkFBYSxJQURqQjtBQUVJLG1CQUFlLEdBRm5CO0FBR0ksMkJBQXVCLElBSDNCO0FBSUksYUFBUztBQUpiLENBN0RPLEVBbUVQO0FBQ0ksaUJBQWEsSUFEakI7QUFFSSxtQkFBZSxHQUZuQjtBQUdJLDJCQUF1QixJQUgzQjtBQUlJLGFBQVM7QUFKYixDQW5FTyxFQXlFUDtBQUNJLGlCQUFhLElBRGpCO0FBRUksbUJBQWUsR0FGbkI7QUFHSSwyQkFBdUIsSUFIM0I7QUFJSSxhQUFTO0FBSmIsQ0F6RU8sRUErRVA7QUFDSSxpQkFBYSxJQURqQjtBQUVJLG1CQUFlLEdBRm5CO0FBR0ksMkJBQXVCLElBSDNCO0FBSUksYUFBUztBQUpiLENBL0VPLEVBcUZQO0FBQ0ksaUJBQWEsSUFEakI7QUFFSSxtQkFBZSxHQUZuQjtBQUdJLDJCQUF1QixJQUgzQjtBQUlJLGFBQVM7QUFKYixDQXJGTyxDQUFYO0FBNEZBLElBQUlDLGNBQVksRUFBaEI7QUFDQSxLQUFJLElBQUlDLElBQUUsQ0FBTixFQUFRQyxNQUFJSCxLQUFLSSxNQUFyQixFQUE0QkYsSUFBRUMsR0FBOUIsRUFBa0NELEdBQWxDLEVBQXNDO0FBQ2xDLFFBQUdGLEtBQUtFLENBQUwsRUFBUUcsS0FBUixHQUFjLENBQWpCLEVBQW1CO0FBQ2ZDLGdCQUFRQyxHQUFSLENBQWFOLFlBQVlDLElBQUUsQ0FBZCxDQUFiO0FBQ0FELG9CQUFZQyxJQUFFLENBQWQsRUFBaUJNLFFBQWpCLEdBQTBCLENBQUNSLEtBQUtFLENBQUwsQ0FBRCxDQUExQjtBQUNILEtBSEQsTUFHSztBQUNERCxvQkFBWVEsSUFBWixDQUFpQlQsS0FBS0UsQ0FBTCxDQUFqQjtBQUNIO0FBQ0oiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBkYXRhPVtcclxuICAgIHtcclxuICAgICAgICBcInRlc3RfbmFtZVwiOiBcIuebuOWKoFwiLFxyXG4gICAgICAgIFwic3RhdHVzX2NvZGVcIjogMjAwLFxyXG4gICAgICAgIFwic3RhdHVzX2NvZGVfZXhwbGFpblwiOiBcIuaIkOWKn1wiLFxyXG4gICAgICAgIFwibGV2ZWxcIjogMVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBcInRlc3RfbmFtZVwiOiBcIkHliIbnu4RcIixcclxuICAgICAgICBcInN0YXR1c19jb2RlXCI6IDIwMCxcclxuICAgICAgICBcInN0YXR1c19jb2RlX2V4cGxhaW5cIjogXCLmiJDlip9cIixcclxuICAgICAgICBcImxldmVsXCI6IDFcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgXCJ0ZXN0X25hbWVcIjogXCLnm7jlh49cIixcclxuICAgICAgICBcInN0YXR1c19jb2RlXCI6IDIwMCxcclxuICAgICAgICBcInN0YXR1c19jb2RlX2V4cGxhaW5cIjogXCLmiJDlip9cIixcclxuICAgICAgICBcImxldmVsXCI6IDJcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgXCJ0ZXN0X25hbWVcIjogXCJC5YiG57uEXCIsXHJcbiAgICAgICAgXCJzdGF0dXNfY29kZVwiOiAyMDAsXHJcbiAgICAgICAgXCJzdGF0dXNfY29kZV9leHBsYWluXCI6IFwi5oiQ5YqfXCIsXHJcbiAgICAgICAgXCJsZXZlbFwiOiAxXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIFwidGVzdF9uYW1lXCI6IFwi55u45YqgXCIsXHJcbiAgICAgICAgXCJzdGF0dXNfY29kZVwiOiAyMDAsXHJcbiAgICAgICAgXCJzdGF0dXNfY29kZV9leHBsYWluXCI6IFwi5oiQ5YqfXCIsXHJcbiAgICAgICAgXCJsZXZlbFwiOiAyXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIFwidGVzdF9uYW1lXCI6IFwiQ+WIhue7hFwiLFxyXG4gICAgICAgIFwic3RhdHVzX2NvZGVcIjogMjAwLFxyXG4gICAgICAgIFwic3RhdHVzX2NvZGVfZXhwbGFpblwiOiBcIuaIkOWKn1wiLFxyXG4gICAgICAgIFwibGV2ZWxcIjogMlxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBcInRlc3RfbmFtZVwiOiBcIuebuOS5mFwiLFxyXG4gICAgICAgIFwic3RhdHVzX2NvZGVcIjogMjAwLFxyXG4gICAgICAgIFwic3RhdHVzX2NvZGVfZXhwbGFpblwiOiBcIuaIkOWKn1wiLFxyXG4gICAgICAgIFwibGV2ZWxcIjogM1xyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBcInRlc3RfbmFtZVwiOiBcIuebuOWKoFwiLFxyXG4gICAgICAgIFwic3RhdHVzX2NvZGVcIjogMjAwLFxyXG4gICAgICAgIFwic3RhdHVzX2NvZGVfZXhwbGFpblwiOiBcIuaIkOWKn1wiLFxyXG4gICAgICAgIFwibGV2ZWxcIjogMlxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBcInRlc3RfbmFtZVwiOiBcIuavlOi+g1wiLFxyXG4gICAgICAgIFwic3RhdHVzX2NvZGVcIjogMjAwLFxyXG4gICAgICAgIFwic3RhdHVzX2NvZGVfZXhwbGFpblwiOiBcIuaIkOWKn1wiLFxyXG4gICAgICAgIFwibGV2ZWxcIjogMlxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBcInRlc3RfbmFtZVwiOiBcIumYtuS5mFwiLFxyXG4gICAgICAgIFwic3RhdHVzX2NvZGVcIjogMjAwLFxyXG4gICAgICAgIFwic3RhdHVzX2NvZGVfZXhwbGFpblwiOiBcIuaIkOWKn1wiLFxyXG4gICAgICAgIFwibGV2ZWxcIjogMVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBcInRlc3RfbmFtZVwiOiBcIuavlOi+g1wiLFxyXG4gICAgICAgIFwic3RhdHVzX2NvZGVcIjogMjAwLFxyXG4gICAgICAgIFwic3RhdHVzX2NvZGVfZXhwbGFpblwiOiBcIuaIkOWKn1wiLFxyXG4gICAgICAgIFwibGV2ZWxcIjogMVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBcInRlc3RfbmFtZVwiOiBcIumYtuS5mFwiLFxyXG4gICAgICAgIFwic3RhdHVzX2NvZGVcIjogMjAwLFxyXG4gICAgICAgIFwic3RhdHVzX2NvZGVfZXhwbGFpblwiOiBcIuaIkOWKn1wiLFxyXG4gICAgICAgIFwibGV2ZWxcIjogMVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBcInRlc3RfbmFtZVwiOiBcIumYtuS5mFwiLFxyXG4gICAgICAgIFwic3RhdHVzX2NvZGVcIjogMjAwLFxyXG4gICAgICAgIFwic3RhdHVzX2NvZGVfZXhwbGFpblwiOiBcIuaIkOWKn1wiLFxyXG4gICAgICAgIFwibGV2ZWxcIjogMVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBcInRlc3RfbmFtZVwiOiBcIumYtuS5mFwiLFxyXG4gICAgICAgIFwic3RhdHVzX2NvZGVcIjogMjAwLFxyXG4gICAgICAgIFwic3RhdHVzX2NvZGVfZXhwbGFpblwiOiBcIuaIkOWKn1wiLFxyXG4gICAgICAgIFwibGV2ZWxcIjogMVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBcInRlc3RfbmFtZVwiOiBcIumYtuS5mFwiLFxyXG4gICAgICAgIFwic3RhdHVzX2NvZGVcIjogMjAwLFxyXG4gICAgICAgIFwic3RhdHVzX2NvZGVfZXhwbGFpblwiOiBcIuaIkOWKn1wiLFxyXG4gICAgICAgIFwibGV2ZWxcIjogMVxyXG4gICAgfVxyXG5dO1xyXG5sZXQgcmVzdWx0QWRhdGE9W11cclxuZm9yKGxldCBpPTAsbGVuPWRhdGEubGVuZ3RoO2k8bGVuO2krKyl7XHJcbiAgICBpZihkYXRhW2ldLmxldmVsPjEpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCByZXN1bHRBZGF0YVtpLTFdKVxyXG4gICAgICAgIHJlc3VsdEFkYXRhW2ktMV0uY2hpbGRyZW49W2RhdGFbaV1dXHJcbiAgICB9ZWxzZXtcclxuICAgICAgICByZXN1bHRBZGF0YS5wdXNoKGRhdGFbaV0pXHJcbiAgICB9XHJcbn0iXX0=
