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
import axios from 'axios';
export default class Sub extends Component {

    constructor() {
        super();
        this.state = {
            category: []
        };
    }

    async componentDidMount() {
        let wxSelectedId=await AsyncStorage.getItem('wxSelectedId');
        let seleteId=[];
        if(wxSelectedId){
            let wxParseSelectedId=JSON.parse(wxSelectedId);
            for(let j=0;j<wxParseSelectedId.length;j++){
                seleteId.push(wxParseSelectedId[j].id)
            }
        }

        axios({
            url:'http://route.showapi.com/582-1',
            params:{
                showapi_appid:36573,
                showapi_sign:'6818f6ac390444cfbf2e24b129ca049b'
            }
        }).then((data)=>{
            console.log('list',data);
            for(let i=0;i<data.data.showapi_res_body.typeList.length;i++){
                if(seleteId.indexOf(data.data.showapi_res_body.typeList[i].id)>=0){
                    data.data.showapi_res_body.typeList[i].selected=true
                }else{
                    data.data.showapi_res_body.typeList[i].selected=false
                }
            }
            this.setState({
                category:data.data.showapi_res_body.typeList
            })
        }).catch((err)=>{
            console.log(err)
        });
    }
    toggleSelect=(id)=>{
        console.log("选择的id",id)
        for(let i=0;i<this.state.category.length;i++){
            if(this.state.category[i].id==id){
                this.state.category.splice(i,1,{id:this.state.category[i].id,name:this.state.category[i].name,selected:!this.state.category[i].selected})
                this.setState({
                    category:this.state.category
                })
            }
        }
    }
    setTopic=()=>{
        console.log('this.state.category.length',this.state.category.length);
        let seletedNum=0
        for(let i=0;i<this.state.category.length;i++){
            if(this.state.category[i].selected===true){
                seletedNum++
            }
        }
        if(seletedNum<=0||seletedNum>6){
            Alert.alert("订阅主题必须在1-6之间")
        }else{
            let temp=[]
            for(let i=0;i<this.state.category.length;i++){
                if(this.state.category[i].selected===true){
                    temp.push({id:this.state.category[i].id,name:this.state.category[i].name})
                }
            }
            AsyncStorage.setItem('wxSelectedId', JSON.stringify(temp));
            Actions.pop({ refresh: { test: true }})
        }

    }
    render() {
        let that = this;
        return (
            <View tyle={styles.container}>
                <NavBar showLeftBtn={true} showrightBtn={true} rightBtnPress={()=> {
                    that.setTopic()
                }} leftBtnPress={()=> {
                    Actions.pop()
                }} navbar_text='订阅主题' left_text='后退' right_text='确认'/>
                <ScrollView >
                    <View style={styles.Grid}>
                        {that.state.category.map(function (item, index) {
                            return (
                            <TouchableWithoutFeedback
                                key={index}
                                onPress={()=>that.toggleSelect(item.id)}>
                                <View
                                      style={[styles.item, (index + 1) % 3 === 0 ? styles.thirdItem : styles.noThirdItem]}>
                                    <Text style={{fontSize: 16}} numberOfLines={1}>{item.name}</Text>
                                    {item.selected?<Image source={require('./../../img/rightbottom.png')} style={styles.selectImg}/>:null}
                                </View>
                            </TouchableWithoutFeedback>
                            )
                        })}
                    </View>
                </ScrollView>
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
    Grid: {
        width: deviceWidth,
        backgroundColor: '#fff',
        flexDirection: 'row',
        flexWrap: "wrap",
    },
    item: {
        width: deviceWidth / 3 - 0.333,
        height: 80,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center'
    },
    noThirdItem: {
        borderRightWidth: 0.5,
        borderBottomWidth: 0.5,
    },
    thirdItem: {
        borderBottomWidth: 0.5,
    },
    selectImg:{
        position:'absolute',
        right:0.5,
        bottom:0.5,
        width:40,
        height:40
    }
});
