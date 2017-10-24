/**
 * Created by Administrator on 2017/10/24.
 */
define(['sum'], function(sum){
    var values = [ 1, 2, 4, 5, 6, 7, 8, 9 ];
    var answer = sum(values)
    document.getElementById("answer").innerHTML = answer;
})