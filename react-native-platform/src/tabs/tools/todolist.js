/**
 * @author lovebing
 */

import React, {
    Component,
    PropTypes
} from 'react';
import {
    Button,
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    Dimensions,
    Platform,
    AsyncStorage,
    TextInput,
    Linking,
    ScrollView,
    Image,
    Alert
} from 'react-native';
import {Actions} from 'react-native-router-flux'
import NavBar from './../../components/NavBar'

export default class Todolist extends Component {

    constructor() {
        super();
        this.state = {
            todolist: [],
        };
    }

    async componentDidMount() {
        let todoListDate=await AsyncStorage.getItem('todoListDate');
        todoListDate=JSON.parse(todoListDate);
        console.log('todoListDate1',todoListDate)
        if(!Array.isArray(todoListDate)){
            todoListDate=[]
        }
        this.setState({
            todolist:todoListDate
        })
    }
    deleteTodo=(id)=>{
        console.log(id);
        Alert.alert(
            '提示',
            '确定要删除吗？',
            [
                {text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: '确定', onPress: () => {
                    for(let i=0;i<this.state.todolist.length;i++){
                        if(this.state.todolist[i].id===id){
                            this.state.todolist.splice(i,1);
                            this.setState({
                                todolist:this.state.todolist
                            });
                            AsyncStorage.setItem('todoListDate', JSON.stringify(this.state.todolist));
                            break
                        }
                    }
                }},
            ]
        )

    }
    async componentWillReceiveProps(){
        let todoListDate=await AsyncStorage.getItem('todoListDate');
        console.log("todoListDate",JSON.parse(todoListDate));
        this.setState({
            todolist:JSON.parse(todoListDate)
        })
    }

    render() {
        let that=this
        return (
            <View style={styles.container}>
                <NavBar showLeftBtn={true}  showrightBtn={true} rightBtnPress={()=>{Actions.todo({})}} leftBtnPress={()=>{Actions.pop()}} navbar_text= '记事本' left_text='后退' right_text='新建'/>
                <ScrollView>
                    {this.state.todolist.map(function (item,index) {
                        return(
                            <View  key={index}>
                                <TouchableWithoutFeedback

                                    //Actions.todo({})向子页面传递title会自动设为顶部标题
                                    onPress={() => Actions.todo({title:item.title,content: item.content,isDone:item.isDone,date:item.date,id:item.id})} >
                                    <View style={styles.row}>
                                        <View>
                                            <Text style={styles.title} numberOfLines={1}>
                                                {item.title}
                                            </Text>
                                            <Text style={styles.date}>
                                                {item.date}
                                            </Text>
                                        </View>
                                        {item.isDone?<Image style={styles.doneImage} source={require('./../../img/done.png')} />:null}
                                        <View style={styles.rightIcon}>
                                            <Button
                                                onPress={that.deleteTodo.bind(this,item.id)}
                                                title="删除"
                                                color="#841584"
                                            />
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>

                            </View>

                        )
                    })}
                </ScrollView>
            </View>
        );
    }
}
let deviceWidth = Dimensions.get('window').width
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    row:{
        width:deviceWidth,
        height:60,
        borderBottomWidth:1,
        borderBottomColor:'#ddd',
        padding:5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
        paddingLeft:10
    },
    title:{
        fontSize:16,
        width:deviceWidth-100
    },
    date:{
        fontSize:12
    },
    rightIcon:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center'
    },
    doneImage:{
        width:60,
        height:30,
        marginRight:5,
        position:'absolute',//absolute不会受到flex的影响
        left:250
    }
});
