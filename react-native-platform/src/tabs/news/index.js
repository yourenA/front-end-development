import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Platform,
} from 'react-native';
import NavBar from './../../components/NavBar'
import ScrollableTabView, {DefaultTabBar, } from 'react-native-scrollable-tab-view';
import Toutiao from './toutiao'
import {Actions} from 'react-native-router-flux'

export default React.createClass({
    render() {
        return(
            <View style={styles.container}>
                <NavBar showLeftBtn={true} leftBtnPress={()=> {
                    Actions.pop()
                }}  left_text='后退' navbar_text='新闻知多少'/>
                <ScrollableTabView
                    tabBarActiveTextColor="#ffdb42"
                    tabBarUnderlineStyle={styles.underline}
                    initialPage={0}
                    renderTabBar={() => <DefaultTabBar />}
                >
                    <View tabLabel="头条" style={styles.tabView}>
                        <Toutiao type={1}/>
                    </View>
                    <View tabLabel="娱乐" style={styles.tabView}>
                        <Toutiao type={2}/>

                    </View>
                    <View tabLabel="军事" style={styles.tabView}>
                        <Toutiao type={3}/>

                    </View>
                    <View tabLabel="汽车" style={styles.tabView}>
                        <Toutiao type={4}/>
                    </View>
                    <View tabLabel="财经" style={styles.tabView}>
                        <Toutiao type={5}/>

                    </View>
                    <View tabLabel="体育" style={styles.tabView}>
                        <Toutiao type={7}/>

                    </View>
                </ScrollableTabView>
            </View>
            )

    }
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    underline:{
        backgroundColor:'#ffdb42'
    },
    tabView: {
        flex: 1,
    },
});