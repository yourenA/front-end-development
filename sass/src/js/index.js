/**
 * Created by Administrator on 2017/2/13.
 */
// 圆形进度条
$(window).load(function(){
    var $circleProgress = $('.circle-progress'),
        deg1 = 60,
        deg2 = 230,
        deg3 = deg2 - 180;
    var $progress1 = $circleProgress.eq(0),
        $progress2 = $circleProgress.eq(1);
    $progress1.find('.progress-num').html(parseInt(deg1 * 100 / 360) +'%');
    $progress2.find('.progress-num').html(parseInt(deg2 * 100 / 360)+'%');
    $progress1.find('.right-inner').css('transform', 'rotate('+ deg1 +'deg)');
    $circleProgress.eq(1).find('.right-inner').css('transform', 'rotate(180deg)');
    $circleProgress.eq(1).find('.left-inner').css('transform', 'rotate('+ deg3 +'deg)');
})