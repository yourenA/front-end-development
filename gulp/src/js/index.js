var zNodes=[
    {id:1,name:"A"},
    {id:2,name:"B"},
    {id:3,name:"C"},
    {id:31,pId:3,name:"C1"},
    {id:36,pId:31,name:"z"},
    {id:37,pId:36,name:"z1123"} ,
    {id:38,pId:37,name:"z123123123"}
];
function treeMenu(a){
    this.tree=a||[];//this.tree 为 传入的数组
    this.groups={};
};
treeMenu.prototype={
    init:function(pid){
        this.group(); // pid为要获取的id

        return this.getDom(this.groups[pid]);
    },
    group:function(){
        for(var i=0;i<this.tree.length;i++){
            if(this.groups[this.tree[i].pId]){
                this.groups[this.tree[i].pId].push(this.tree[i]);
            }else{
                this.groups[this.tree[i].pId]=[];
                this.groups[this.tree[i].pId].push(this.tree[i]);
            }
        }
    },
    getDom:function(a){
        if(!a){return ''}
        var html='\n<ul >\n';
        for(var i=0;i<a.length;i++){
            html+='<li><a href="'+a[i].id+'">'+a[i].name+'</a>';
            html+=this.getDom(this.groups[a[i].id]);
            html+='</li>\n';
        };
        html+='</ul>\n';
        return html;
    }
};
var html=new treeMenu(zNodes).init(0);


var tree = zNodes.reduce((o, x) => {
    let id = x.id
    let pId = x.pId
    o[id] = o[id] || {children: []}
    o[id].node = x
    if (pId) {
        o[pId] = o[pId] || {children: []} //改变父节点对象
        o[pId].children.push(x)
    }
    console.log('o',o)
    return o
}, {})

var node = {id:38,pId:37,name:"z123123123"}
console.log(listParents(tree, node).map(x => x.name).concat(node.name).join(' -> '))

console.log(listFirstChildren(tree, node).map(x => x.name).join(' -> '))

function listParents(tree, node) {
    if (!node.pId) {
        return []
    }

    return _list(tree, tree[node.pId].node)

    function _list (tree, node) {
        console.log(node)
        if (node.pId === undefined) {
            return [node]//当没有pid的时候结束递归。跳出结构,有了跳出才有结果
        } else {
            return _list(tree, tree[node.pId].node).concat([node]) //递归，递归一般都是通过return
        }
    }
}

function listFirstChildren (tree, node) {
    if (tree[node.id].children.length <= 0) {
        return []
    }

    return _list(tree, tree[node.id].children[0])

    function _list (tree, node) {
        if (tree[node.id].children.length <= 0) {
            return [node]
        } else {
            return [node].concat(_list(tree, tree[node.id].children[0]))
        }
    }
}


