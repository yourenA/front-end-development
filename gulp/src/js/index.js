const data=[
    {
        "test_name": "相加",
        "status_code": 200,
        "status_code_explain": "成功",
        "level": 1
    },
    {
        "test_name": "A分组",
        "status_code": 200,
        "status_code_explain": "成功",
        "level": 1
    },
    {
        "test_name": "相减",
        "status_code": 200,
        "status_code_explain": "成功",
        "level": 2
    },
    {
        "test_name": "B分组",
        "status_code": 200,
        "status_code_explain": "成功",
        "level": 1
    },
    {
        "test_name": "相加",
        "status_code": 200,
        "status_code_explain": "成功",
        "level": 2
    },
    {
        "test_name": "C分组",
        "status_code": 200,
        "status_code_explain": "成功",
        "level": 2
    },
    {
        "test_name": "相乘",
        "status_code": 200,
        "status_code_explain": "成功",
        "level": 3
    },
    {
        "test_name": "相加",
        "status_code": 200,
        "status_code_explain": "成功",
        "level": 2
    },
    {
        "test_name": "比较",
        "status_code": 200,
        "status_code_explain": "成功",
        "level": 2
    },
    {
        "test_name": "阶乘",
        "status_code": 200,
        "status_code_explain": "成功",
        "level": 1
    },
    {
        "test_name": "比较",
        "status_code": 200,
        "status_code_explain": "成功",
        "level": 1
    },
    {
        "test_name": "阶乘",
        "status_code": 200,
        "status_code_explain": "成功",
        "level": 1
    },
    {
        "test_name": "阶乘",
        "status_code": 200,
        "status_code_explain": "成功",
        "level": 1
    },
    {
        "test_name": "阶乘",
        "status_code": 200,
        "status_code_explain": "成功",
        "level": 1
    },
    {
        "test_name": "阶乘",
        "status_code": 200,
        "status_code_explain": "成功",
        "level": 1
    }
];
let resultAdata=[]
for(let i=0,len=data.length;i<len;i++){
    if(data[i].level>1){
        console.log( resultAdata[i-1])
        resultAdata[i-1].children=[data[i]]
    }else{
        resultAdata.push(data[i])
    }
}