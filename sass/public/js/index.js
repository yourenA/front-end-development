'use strict';

/**
 * Created by Administrator on 2017/2/13.
 */
// 圆形进度条
$(window).load(function () {
    var $circleProgress = $('.circle-progress'),
        deg1 = 60,
        deg2 = 230,
        deg3 = deg2 - 180;
    var $progress1 = $circleProgress.eq(0),
        $progress2 = $circleProgress.eq(1);
    $progress1.find('.progress-num').html(parseInt(deg1 * 100 / 360) + '%');
    $progress2.find('.progress-num').html(parseInt(deg2 * 100 / 360) + '%');
    $progress1.find('.right-inner').css('transform', 'rotate(' + deg1 + 'deg)');
    $circleProgress.eq(1).find('.right-inner').css('transform', 'rotate(180deg)');
    $circleProgress.eq(1).find('.left-inner').css('transform', 'rotate(' + deg3 + 'deg)');
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIiQiLCJ3aW5kb3ciLCJsb2FkIiwiJGNpcmNsZVByb2dyZXNzIiwiZGVnMSIsImRlZzIiLCJkZWczIiwiJHByb2dyZXNzMSIsImVxIiwiJHByb2dyZXNzMiIsImZpbmQiLCJodG1sIiwicGFyc2VJbnQiLCJjc3MiXSwibWFwcGluZ3MiOiI7O0FBQUE7OztBQUdBO0FBQ0FBLEVBQUVDLE1BQUYsRUFBVUMsSUFBVixDQUFlLFlBQVU7QUFDckIsUUFBSUMsa0JBQWtCSCxFQUFFLGtCQUFGLENBQXRCO0FBQUEsUUFDSUksT0FBTyxFQURYO0FBQUEsUUFFSUMsT0FBTyxHQUZYO0FBQUEsUUFHSUMsT0FBT0QsT0FBTyxHQUhsQjtBQUlBLFFBQUlFLGFBQWFKLGdCQUFnQkssRUFBaEIsQ0FBbUIsQ0FBbkIsQ0FBakI7QUFBQSxRQUNJQyxhQUFhTixnQkFBZ0JLLEVBQWhCLENBQW1CLENBQW5CLENBRGpCO0FBRUFELGVBQVdHLElBQVgsQ0FBZ0IsZUFBaEIsRUFBaUNDLElBQWpDLENBQXNDQyxTQUFTUixPQUFPLEdBQVAsR0FBYSxHQUF0QixJQUE0QixHQUFsRTtBQUNBSyxlQUFXQyxJQUFYLENBQWdCLGVBQWhCLEVBQWlDQyxJQUFqQyxDQUFzQ0MsU0FBU1AsT0FBTyxHQUFQLEdBQWEsR0FBdEIsSUFBMkIsR0FBakU7QUFDQUUsZUFBV0csSUFBWCxDQUFnQixjQUFoQixFQUFnQ0csR0FBaEMsQ0FBb0MsV0FBcEMsRUFBaUQsWUFBV1QsSUFBWCxHQUFpQixNQUFsRTtBQUNBRCxvQkFBZ0JLLEVBQWhCLENBQW1CLENBQW5CLEVBQXNCRSxJQUF0QixDQUEyQixjQUEzQixFQUEyQ0csR0FBM0MsQ0FBK0MsV0FBL0MsRUFBNEQsZ0JBQTVEO0FBQ0FWLG9CQUFnQkssRUFBaEIsQ0FBbUIsQ0FBbkIsRUFBc0JFLElBQXRCLENBQTJCLGFBQTNCLEVBQTBDRyxHQUExQyxDQUE4QyxXQUE5QyxFQUEyRCxZQUFXUCxJQUFYLEdBQWlCLE1BQTVFO0FBQ0gsQ0FaRCIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEFkbWluaXN0cmF0b3Igb24gMjAxNy8yLzEzLlxyXG4gKi9cclxuLy8g5ZyG5b2i6L+b5bqm5p2hXHJcbiQod2luZG93KS5sb2FkKGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgJGNpcmNsZVByb2dyZXNzID0gJCgnLmNpcmNsZS1wcm9ncmVzcycpLFxyXG4gICAgICAgIGRlZzEgPSA2MCxcclxuICAgICAgICBkZWcyID0gMjMwLFxyXG4gICAgICAgIGRlZzMgPSBkZWcyIC0gMTgwO1xyXG4gICAgdmFyICRwcm9ncmVzczEgPSAkY2lyY2xlUHJvZ3Jlc3MuZXEoMCksXHJcbiAgICAgICAgJHByb2dyZXNzMiA9ICRjaXJjbGVQcm9ncmVzcy5lcSgxKTtcclxuICAgICRwcm9ncmVzczEuZmluZCgnLnByb2dyZXNzLW51bScpLmh0bWwocGFyc2VJbnQoZGVnMSAqIDEwMCAvIDM2MCkgKyclJyk7XHJcbiAgICAkcHJvZ3Jlc3MyLmZpbmQoJy5wcm9ncmVzcy1udW0nKS5odG1sKHBhcnNlSW50KGRlZzIgKiAxMDAgLyAzNjApKyclJyk7XHJcbiAgICAkcHJvZ3Jlc3MxLmZpbmQoJy5yaWdodC1pbm5lcicpLmNzcygndHJhbnNmb3JtJywgJ3JvdGF0ZSgnKyBkZWcxICsnZGVnKScpO1xyXG4gICAgJGNpcmNsZVByb2dyZXNzLmVxKDEpLmZpbmQoJy5yaWdodC1pbm5lcicpLmNzcygndHJhbnNmb3JtJywgJ3JvdGF0ZSgxODBkZWcpJyk7XHJcbiAgICAkY2lyY2xlUHJvZ3Jlc3MuZXEoMSkuZmluZCgnLmxlZnQtaW5uZXInKS5jc3MoJ3RyYW5zZm9ybScsICdyb3RhdGUoJysgZGVnMyArJ2RlZyknKTtcclxufSkiXX0=
