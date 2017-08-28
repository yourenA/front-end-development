//找父节点
var zNodes=[
    {id:0,name:"Aaaa"},
    {id:1,pId:0,name:"A"},
    {id:11,pId:1,name:"A1"},
    {id:12,pId:1,name:"A2"},
    {id:13,pId:1,name:"A3"},
    {id:2,pId:0,name:"B"},
    {id:21,pId:2,name:"B1"},
    {id:22,pId:2,name:"B2"},
    {id:23,pId:2,name:"B3"},
    {id:3,pId:0,name:"C"},
    {id:31,pId:3,name:"C1"},
    {id:32,pId:3,name:"C2"},
    {id:33,pId:3,name:"C3"},
    {id:34,pId:31,name:"x"},
    {id:35,pId:31,name:"y"},
    {id:36,pId:31,name:"z"},
    {id:37,pId:36,name:"z1123"} ,
    {id:38,pId:37,name:"z123123123"}
];
function  findP(zNodes,node) {
    var ans=[];
    for(var i=0;i<zNodes.length;i++){
        if(node.pId==zNodes[i].id){
            if(!zNodes[i].pId){
                return zNodes[i];
            }
            ans.push(zNodes[i]);
            return  ans.concat(findP(zNodes,zNodes[i]));
        }
    }
}
console.log(findP(zNodes,  {id:38,pId:37,name:"z123123123"}));
// 输出
//[ { id: 1, pId: 0, name: 'A' }, { id: 0, name: 'Aaaa' } ]

//找子节点
function findC(zNodes,node) {
    var ans=[];
    for(var i=0;i<zNodes.length;i++){
        if(node.id==zNodes[i].pId){
            ans.push(zNodes[i]);
            ans=ans.concat(findC(zNodes,zNodes[i]));
        }
    }
    return ans;
}
console.log(findC(zNodes, {id:3,pId:0,name:"C"}));
// 输出
// [
//     { id: 11, pId: 1, name: 'A1' },
//     { id: 12, pId: 1, name: 'A2' },
//     { id: 13, pId: 1, name: 'A3' }
// ]