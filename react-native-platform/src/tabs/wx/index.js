import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Platform,
    Modal,
    TouchableWithoutFeedback,
    GridView,
    Button,
    AsyncStorage
} from 'react-native';
import NavBar from '../../components/NavBar'
import Tab from './tab'
import {Actions} from 'react-native-router-flux'

import ScrollableTabView, {DefaultTabBar,} from 'react-native-scrollable-tab-view';
export default class Wx extends Component {
    constructor() {
        super()
        this.state = {
            showNames:[]
        }
    }

    async componentDidMount() { //async  componentDidMount() { } AsyncStorage为异步
        let wxSelectedId=await AsyncStorage.getItem('wxSelectedId');
        if(wxSelectedId){
            console.log("wxSelectedId",JSON.parse(wxSelectedId));
            this.setState({showNames:JSON.parse(wxSelectedId)});

        }else{
            Actions.sub({})
        }
    }
    async componentWillReceiveProps(){
        let wxSelectedId=await AsyncStorage.getItem('wxSelectedId');
        this.setState({showNames:JSON.parse(wxSelectedId)});
    }
    render() {
        console.log(this.state.showNames)
        return (
            <View style={styles.container}>
                <NavBar navbar_text='微信精选文章' rightBtnPress={()=>{Actions.sub({category:this.state.category})}} showrightBtn={true} right_text='订阅'/>
                <ScrollableTabView
                    tabBarActiveTextColor="#ffdb42"
                    tabBarUnderlineStyle={styles.underline}
                    initialPage={0}
                    renderTabBar={() => <DefaultTabBar />}
                >
                    {this.state.showNames.map(function (item,index) {
                        return(
                            <View key={index} tabLabel={item.name} style={styles.tabView}>
                                <Tab id={item.id}/>
                            </View>
                        )
                    })}

                </ScrollableTabView>
            </View>
        )

    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        paddingBottom: 50
    },
    underline: {
        backgroundColor: '#ffdb42'
    },
    tabView: {
        flex: 1,
    },
    spinner: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.65)'
    },
    header: {
        padding: 10,
        backgroundColor: '#fcfcfc'
    },
    categoryBtn: {
        margin: 10,
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#dddddd'
    },
    categoryText: {
        fontSize: 16,
        textAlign: 'center'
    },
    gridLayout: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f2f2f2'
    },
});