var soap = require('soap');
var url = 'http://220.169.236.108:4020/hnjyjcService/service1.asmx?wsdl';
var args = {
    untcode: 'oldwiner',
    deviceld: "x674361",
    username: "18071996460",
    password: '我是朗杰'
};
soap.createClient(url, function (err, client) {

    client.Login(args, function (err, result) { //login是方法是别人定义的接口方法
        if (err) {
            console.log('err', err);
        } else {
            console.log('result', result);
        }
    });
});

var url2 = 'http://webservice.webxml.com.cn/WebServices/MobileCodeWS.asmx?wsdl';
var args2 = { mobileCode: '1343633****'};
var soaptest = function(){
    soap.createClient(url2, function(err, client) {
        client.getMobileCodeInfo(args2, function(err, result) {
            console.log(result);
        });
    });
}
soaptest();
