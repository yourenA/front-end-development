/**
 * Created by Administrator on 2017/8/31.
 */
import language from '../../../db/language.json';
import {md5,handleResult} from './../../../util/index';
import controllers from './../../../db/controller/index'
exports.signin = async(ctx) => {
    let password = md5(ctx.request.body.password),
        result = await controllers.users.signin(ctx.request.body.name, password), //异步方法
        bodyData = handleResult(result, language['sign in success']); //如果result是language[],那么在handleResult中会忽略第二个参数
    if (bodyData.status === 0) {
        ctx.session.user = { //通过ctx.session就能获得定义的所有session
            id: bodyData.data.id,
            name: bodyData.data.name,
            permission: bodyData.data.permission
        }
    }
    return ctx.body = bodyData;
};

exports.signout = async(ctx) => {
    ctx.session = null;
    return ctx.body = {
        status: 0,
        info: language['sign out success']
    }
};

exports.getUsers = async(ctx)=> {
    let countPerPage = Number(ctx.query['countPerPage']) || 10,
        currentPage = Number(ctx.query['currentPage']) || 1,
        result = await controllers.users.getUsers(countPerPage, currentPage);
    return ctx.body = handleResult(result, language['getUsers success']);
};

exports.createUser = async(ctx)=> {
    console.log('ctx.session',ctx.session)
    let password = md5(ctx.request.body.password),
        result = await controllers.users.createUser(ctx.session, ctx.request.body.name, password);
    return ctx.body = handleResult(result, language['create user success']);
};

exports.updateUser = async(ctx)=> {
    let body = ctx.request.body,
        id = ctx.params.id,// ctx.params.id 获得/:id 中的参数id
        session = ctx.session,
        oldPassword = md5(body['old_password']),
        newPassword = md5(body['new_password']),
        rePassword = md5(body['re_password']),
        result = await controllers.users.updateUser(session, id, oldPassword, newPassword, rePassword);
        return ctx.body = handleResult(result, language['update user success']);
};

exports.deleteUser = async(ctx)=> {
    let id = ctx.params.id,
        session = ctx.session,
        result = await controllers.users.deleteUser(session, id);
    return ctx.body = handleResult(result, language['delete user success']);
};

