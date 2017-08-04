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
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import {Actions} from 'react-native-router-flux'
import NavBar from './../../components/NavBar'
import moment from 'moment'
import UUID from 'uuid-js'
export default class Todo extends Component {

    constructor() {
        super();
        this.rightNewBtnPress=this.rightNewBtnPress.bind(this);
        this.rightEditBtnPress=this.rightEditBtnPress.bind(this);
        this.complete=this.complete.bind(this);
        this.state = {
            content: '',
            height: 0,
            title: '',
            isDone:false
        };
    }

    componentDidMount() {
        if (this.props.content && this.props.title) {
            this.setState({
                content: this.props.content,
                title: this.props.title
            })
        }

    }

    changeTitle = (title)=> {
        console.log("title",title);
        this.setState({title: title})
    }

    changeContent = (event)=> {
        console.log("event",event.nativeEvent.contentSize);
        this.setState({
            content: event.nativeEvent.text,
            height: event.nativeEvent.contentSize.height //改变内容输入框的高度
        });
    }
    leftBtnPress=()=>{
        console.log('左按钮');
        Actions.pop()
    }
    async rightNewBtnPress(){
        //新建
        if(this.state.title.length===0||this.state.content.length===0){
            Alert.alert('标题和内容不能为空');
            return false
        }else{
            let saveDate={
                title:this.state.title,
                content:this.state.content,
                date:moment().format("YYYY-MM-DD HH:mm:ss"),
                isDone:this.state.isDone,
                id: UUID.create().hex
            };
            let todolistDate=await AsyncStorage.getItem('todoListDate');
            todolistDate=JSON.parse(todolistDate)
            if(!Array.isArray(todolistDate)){
                todolistDate=[]
            }
            todolistDate.unshift(saveDate);
            AsyncStorage.setItem('todoListDate', JSON.stringify(todolistDate));
            Actions.pop({ refresh: { test: true }})
        }

    }
    async rightEditBtnPress(){
        //编辑
        let todolistEditDate=await AsyncStorage.getItem('todoListDate');
        todolistEditDate=JSON.parse(todolistEditDate);
        console.log("todolistEditDate",todolistEditDate)
        for(let i=0;i<todolistEditDate.length;i++){
            if(todolistEditDate[i].id===this.props.id){
                todolistEditDate[i].title=this.state.title
                todolistEditDate[i].content=this.state.content
                todolistEditDate[i].date=moment().format("YYYY-MM-DD HH:mm:ss")
                AsyncStorage.setItem('todoListDate', JSON.stringify(todolistEditDate));
                break
            }
        }
        Actions.pop({ refresh: { test: true }})
    }
    async complete(){
        let todolistEditDate=await AsyncStorage.getItem('todoListDate');
        todolistEditDate=JSON.parse(todolistEditDate);
        console.log("todolistEditDate",todolistEditDate)
        for(let i=0;i<todolistEditDate.length;i++){
            if(todolistEditDate[i].id===this.props.id){
                todolistEditDate[i].isDone=true
                todolistEditDate[i].date=moment().format("YYYY-MM-DD HH:mm:ss")
                AsyncStorage.setItem('todoListDate', JSON.stringify(todolistEditDate));
                break
            }
        }
        Actions.pop({ refresh: { test: true }})
    }
    render() {
        let that=this;
        return (
            <View tyle={styles.container}>
                <NavBar showLeftBtn={true}  showrightBtn={true} rightBtnPress={this.props.title ?this.rightEditBtnPress:this.rightNewBtnPress} leftBtnPress={this.leftBtnPress} navbar_text={this.props.title || '新建'} left_text='后退' right_text='确认'/>
                <View>
                    <ScrollView>
                        <View style={styles.date}>
                            <Text>
                                {this.props.date}
                            </Text>
                        </View>
                        <View style={styles.title}>
                            <Text style={styles.title_text}>
                                标题:
                            </Text>
                            <TextInput
                                editable={!this.props.isDone}
                                placeholder="标题..."
                                style={styles.title_input}
                                onChangeText={this.changeTitle}//注意这里是onChangeText
                                value={this.state.title}
                            />
                            {
                                that.props.isDone?<Image style={styles.doneImage} source={require('./../../img/done.png')} />: <Button
                                    onPress={that.complete}
                                    title="完成该事件"
                                    color="#841584"
                                />
                            }

                        </View>
                        <TextInput
                            editable={!this.props.isDone}
                            placeholder="内容..."
                            multiline={true}
                            onChange={this.changeContent}//注意这里是onChange
                            underlineColorAndroid="transparent"
                            style={[styles.textInputStyle, {height: Math.max(150, this.state.height)}]}
                            value={this.state.content}
                        />
                    </ScrollView>
                </View>
            </View>

        );
    }
}
let deviceWidth = Dimensions.get('window').width
let deviceHeight = Dimensions.get('window').height
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    input: {

        textAlignVertical: 'top',
        borderColor: '#ccc',
        borderWidth: 1,
    },
    title: {
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',

    },
    title_text: {
        width: 50,
        textAlign: 'right',
        fontSize: 16
    },
    title_input: {
        width: deviceWidth - 150,
        paddingRight: 5,
        paddingLeft: 5
    },
    date: {
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInputStyle: { //文本输入组件样式
        padding: 10,
        height: 30,
        fontSize: 16,
        paddingTop: 0,
        paddingBottom: 0,
        textAlignVertical: 'top'//顶部对齐，默认居中
    },
});
