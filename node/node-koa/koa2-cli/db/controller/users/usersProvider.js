var usersPersistence = require('./usersPersistence');
var language = require('./../../language.json');
exports.signin = async function(name,password){
    if(!name){
        return language['name must be specified'];
    }else if(!password){
        return language['password must be specified'];
    }
    return await usersPersistence.signin(name,password);
};

exports.getUsers = async function(countPerPage,currentPage){
    /**
     * countPerPage 每一页多少条
     * currentPage 当前页
     * */
    return await usersPersistence.getUsers(countPerPage,currentPage);
};

exports.createUser = async function(session,name,password){
    if(session && session.user && session.user.permission) {
        if(!name){
            return language['name must be specified'];
        }else if(!password){
            return language['password must be specified'];
        }
        return await usersPersistence.createUser(name,password);
    }else{
        return language['current user can not permission to create users']
    }
};

exports.updateUser = async function(session,id,old_password,new_password,re_password){
    // session.user.id === Number(id) 判断是不是更新本人
    if(session && session.user && session.user.id === Number(id) || session.user.permission === 1){
        if(!id){
            return language['id must be specified'];
        }else if(!old_password){
            return language['old_password must be specified'];
        }else if(!new_password){
            return language['new_password must be specified'];
        }else if (!re_password){
            return language['re_password must be specified'];
        }else if(new_password !== re_password){
            return language['re_password must be equal new_password'];
        }
        let isUpdate = await usersPersistence.updateUser(id,old_password,new_password);
        if(isUpdate[0]){
            return isUpdate;
        }else{
            return language['updateUser error , please check your arguments'];
        }
    }else{
        return language['current user just can update itself'];
    }
};

exports.deleteUser = async function(session,id){
    if(session && session.user && session.user.permission) {
        if(!id){
            return language['id must be specified'];
        }
        let isDeleted = await usersPersistence.deleteUser(id);
        if(isDeleted){
            return isDeleted;
        }else{
            return language['deleteUser error , please check your arguments'];
        }
    }else{
        return language['current user has not permission to delete users'];
    }
};

