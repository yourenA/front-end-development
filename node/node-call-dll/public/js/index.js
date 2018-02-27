/**
 * Created by llan on 2017/6/9.
 */
(function ($) {
    let $label = $('.label');
    $label.hide();
    $('.count').on('click', (e)=> {
        e.preventDefault();
        $label.hide();
        let max = $('#max').val();
        if (max) {
            $.ajax({
                type: 'POST',
                url: '/result',
                data: {
                    max: max
                }
            }).done((data)=> {
                $('.result').html(`计算所得结果为:${data.result}`);
            });
        } else {
            $label.show();
        }
    });
    $('.btn').on('click',(e)=>{
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/test',
            data: {
                retVal: 3
            }
        }).done((data)=> {
            console.log('data',data);
        });
    })
})(jQuery);
