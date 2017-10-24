/**
 * Created by Administrator on 2017/10/24.
 */
(function(){
    myApp.sum = function(arr){
        return myApp.reduce(arr, myApp.add);
    }
    console.log(myApp)
    // console.log(indexInReduce) //indexInReduce在reduce中，不会污染全局作用域
})();