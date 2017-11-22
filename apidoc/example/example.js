/**
 * @api {get} /user/:id Read data of a User名称
 * @apiVersion 0.3.0
 * @apiName GetUser
 * @apiGroup User
 * @apiPermission admin
 *
 * @apiDescription 描述
 *
 * @apiParam {Number} id The Users-ID.
 *
 * @apiExample Example usage:
 * curl -i http://localhost/user/4711
 * @apiExample Example usage2:
 * curl -i http://localhost/user/471111
 *
 * @apiSuccess {Number}   id               The Users-ID.
 * @apiSuccess {Date}     registered    Registration Date.
 * @apiSuccess {Date}     name          Fullname of the User.
 * @apiSuccess {String[]} nicknames     List of Users nicknames (Array of Strings).
 * @apiSuccess {Object}   profile       Profile data (example for an Object)
 * @apiSuccess {Number}   profile.age   Users age.
 * @apiSuccess {String}   profile.image Avatar-Image.
 * @apiSuccess {Object[]} options       List of Users options (Array of Objects).
 * @apiSuccess {String}   options.name  Option Name.
 * @apiSuccess {String}   options.value Option Value.
 *
 * @apiError NoAccessRight Only authenticated Admins can access the data.
 * @apiError UserNotFound   The <code>id</code> of the User was not found.
 * @apiError UserNotFound2   The <code>id</code> of the User was not found.
 *
 * @apiErrorExample Response (example):
 *     HTTP/1.1 401 Not Authenticated
 *     {
 *       "error": "NoAccessRight"
 *     }
 * @apiErrorExample Response (example222222):
 *     HTTP/1.1 401 Not Authenticated
 *     {
 *       "error": "NoAccessRight"
 *     }
 */
function getUser() { return; }

/**
 * @api {post} /user 方法 路径
 * @apiVersion 0.3.0
 * @apiName PostUser   //对应下面的PostUser方法
 * @apiGroup User      //所属组
 * @apiPermission none //权限
 *
 * @apiDescription 这是创建用户的描述
 *
 * @apiParam {String} name Name of the User. //参数 {类型} 名称 描述
 * @apiParam {String} sex sex of the User. 
 * 
 * @apiSuccess {Number} id         The new Users-ID. //返回 {类型} 名称 描述
 *
 * @apiUse CreateUserError  //使用_apidoc.js中的
 */
function postUser() { return; }

/**
 * @api {put} /user/:id 方法 路径
 * @apiVersion 0.3.0
 * @apiName PutUser
 * @apiGroup User
 * @apiPermission none
 *
 * @apiDescription This function has same errors like POST /user, but errors not defined again, they were included with "apiErrorStructure"
 *
 * @apiParam {String} name Name of the User.
 *
 * @apiUse CreateUserError
 */
function putUser() { return; }
