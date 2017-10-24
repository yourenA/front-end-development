/**
 * Created by Administrator on 2017/10/24.
 */
define(['add', 'reduce'], function(add, reduce){
    var sum = function(arr){
        return reduce(arr, add);
    };

    return sum;
})