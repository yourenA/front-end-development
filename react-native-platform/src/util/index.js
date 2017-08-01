/**
 * Created by Administrator on 2017/4/19.
 */
exports.convertWeekday = (num) => {
    switch (num) {
        case 1:
            return "星期一";
            break;
        case 2:
            return "星期二";
            break;
        case 3:
            return "星期三";
            break;
        case 4:
            return "星期四";
            break;
        case 5:
            return "星期五";
            break;
        case 6:
            return "星期六";
            break;
        case 7:
            return "星期天";
            break;
        default:
            return null
    }
};
const convertTime = (string) => {
    let result=string.slice(8,10)
    return `${result}时`
}
exports.convertTime=convertTime;

exports.convertCodeToImage = (time,code) => {
    let changetime=convertTime(time).slice(0,2);
    if(Number(changetime)>18 || Number(changetime)<6){
        return `http://appimg.showapi.com/images/weather/icon/night/${code}.png`
    }else{
        return `http://appimg.showapi.com/images/weather/icon/day/${code}.png`
    }
}

