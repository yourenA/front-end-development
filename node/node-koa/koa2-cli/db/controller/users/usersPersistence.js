const db = require('../../../db/sequelize/models/index').sequelize.models;
const language = require('../../language.json');
let attributes = ['id', 'name', 'created_at', 'updated_at', 'permission'];
exports.signin = async function (name, password) {
	/**
	 * findOne({attributes:[],where:{}}) 寻找一条记录
	 * */
	let user = await db.user.findOne({
		attributes: attributes,
		where: {
			name: name,
			password: password
		}
	});
	if (user) {
		return user.get({'plain': true}) //获取有用的信息
	} else {
		return language['name or password error'];
	}
};

exports.getUsers = async  (countPerPage, currentPage)=> {
	/**
	 * findAndCountAll({attributes:[],limit:num,offset:num}) 找到全部记录和记录个数
	 * 返回格式{count:num,rows:[{}]}
	 * */
	return await db.user.findAndCountAll({
		// attributes: attributes,
		limit: countPerPage,
		offset: countPerPage * (currentPage - 1)
	});
};

exports.createUser = async function (name, password) {
	let user = await db.user.findOne({
		attributes: attributes,
		where: {
			name: name
		}
	});
	if (user) {
		return language['user existing'];
	}
	/**
	 * create({key:value,key:value})
	 *
	 * */
	let newUser = await db.user.create({name: name, password: password});
	if (newUser) {
		console.log(newUser.get({'plain': true}));
	}
	return newUser;
};

exports.updateUser = async function (id, old_password, new_password) {
	/**
	 * update(values, options) 返回受影响的行数
	 * */
	return await db.user.update({
		password: new_password
	}, {
		where: {
			id: id,
			password: old_password
		}
	});
};

exports.deleteUser = async function (id) {
	/**
	 * destroy([options={}]) 返回受影响的行数
	 * 当设置force:true ，删除时把记录完全删除，而不是只把delete_at设置为当前时间
	 * */
	return await db.user.destroy({
		// force:true,
		where: {
			id: id
		}
	});
};
