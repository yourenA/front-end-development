let j={
    "data": [
        {
            "name": "meter_status",
            "display_name": "户表使用年限",
            "group": "数据分析"
        },
        {
            "name": "concentrator_delete",
            "display_name": "集中器删除",
            "group": "集中器管理"
        },
        {
            "name": "concentrator_add_and_edit",
            "display_name": "集中器添加/编辑",
            "group": "集中器管理"
        },
        {
            "name": "server_delete",
            "display_name": "通讯服务器删除",
            "group": "通讯服务器管理"
        },
        {
            "name": "server_status_edit",
            "display_name": "通讯服务器状态编辑",
            "group": "通讯服务器管理"
        },
        {
            "name": "server_add_and_edit",
            "display_name": "通讯服务器添加/编辑",
            "group": "通讯服务器管理"
        },
        {
            "name": "concentrator_model_delete",
            "display_name": "集中器类型删除",
            "group": "集中器类型管理"
        },
        {
            "name": "concentrator_model_add_and_edit",
            "display_name": "集中器类型添加/编辑",
            "group": "集中器类型管理"
        },
        {
            "name": "meter_model_delete",
            "display_name": "水表类型删除",
            "group": "水表类型管理"
        },
        {
            "name": "meter_model_add_and_edit",
            "display_name": "水表类型添加/编辑",
            "group": "水表类型管理"
        },
        {
            "name": "manufacturer_delete",
            "display_name": "生产厂家删除",
            "group": "生产厂家管理"
        },
        {
            "name": "manufacturer_add_and_edit",
            "display_name": "生产厂家添加/编辑",
            "group": "生产厂家管理"
        },
        {
            "name": "member_delete",
            "display_name": "会员删除",
            "group": "会员管理"
        },
        {
            "name": "member_add_and_edit",
            "display_name": "会员添加/编辑",
            "group": "会员管理"
        },
        {
            "name": "meter_delete",
            "display_name": "水表删除",
            "group": "水表管理"
        },
        {
            "name": "meter_add_and_edit",
            "display_name": "水表添加/编辑",
            "group": "水表管理"
        },
        {
            "name": "village_delete",
            "display_name": "安装小区删除",
            "group": "安装小区管理"
        },
        {
            "name": "village_add_and_edit",
            "display_name": "安装小区添加/编辑",
            "group": "安装小区管理"
        },
        {
            "name": "role_status_edit",
            "display_name": "用户组状态编辑",
            "group": "用户管理"
        },
        {
            "name": "config_edit",
            "display_name": "系统配置编辑",
            "group": "其他"
        },
        {
            "name": "user_delete",
            "display_name": "用户删除",
            "group": "用户管理"
        },
        {
            "name": "user_status_edit",
            "display_name": "用户状态编辑",
            "group": "用户管理"
        },
        {
            "name": "user_default_password_edit",
            "display_name": "用户默认密码重置",
            "group": "用户管理"
        },
        {
            "name": "user_add_and_edit",
            "display_name": "用户添加/编辑",
            "group": "用户管理"
        },
        {
            "name": "role_delete",
            "display_name": "用户组删除",
            "group": "用户管理"
        },
        {
            "name": "role_add_and_edit",
            "display_name": "用户组添加/编辑",
            "group": "用户管理"
        }
    ]
}

const group=_.groupBy(j.data,'group')
console.log('group',group);
_.forEach(group, function(value, key) {
    console.log(key);
    console.log(value);
});