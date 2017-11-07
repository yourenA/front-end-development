/**
 * Created by Administrator on 2017/10/10.
 */
export const IS_MOBILE = 'IS_MOBILE';
export const NOT_MOBILE = 'NOT_MOBILE';
export const checkMobile = (clientWidth) =>{
    if(clientWidth <= 992){
        return({
            type:IS_MOBILE
        })
    }else{
        return({
            type:NOT_MOBILE
        })
    }
}