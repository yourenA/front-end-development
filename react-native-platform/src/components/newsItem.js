/**
 * Created by Administrator on 2017/4/11.
 */
import React, { Component } from 'react'
import {
    Text,
    View,
    WebView,
    StyleSheet,
    Platform,
    Dimensions,
    ScrollView,
    TouchableNativeFeedback,
    Image,
    TouchableOpacity
} from 'react-native'
import {Actions} from 'react-native-router-flux'

class NewsItem extends Component {
    constructor() {
        super()
        this.state = {
        }
    }
    render() {
        let data=this.props.data;
        let d=new Date(data.edit_time * 1000);
        let time = (d.getFullYear()) + '-' +
            (d.getMonth() + 1) + '-' +
            (d.getDate()>=10?d.getDate():'0'+d.getDate()) + ' ' +
            (d.getHours()>=10?d.getHours():'0'+d.getHours()) + ':' +
            (d.getMinutes()>=10?d.getMinutes():'0'+d.getMinutes()) + ':' +
            (d.getSeconds()>=10?d.getSeconds():'0'+d.getSeconds());
        if(this.props.type === 2){
            if(data.text_image0 != ''&& data.text_image1 != '') {
                return(
                    <TouchableNativeFeedback
                        onPress={() => Actions.toutiaozhengwen({content: data.content})}
                        background={   TouchableNativeFeedback.Ripple('#ffdb42',false)}
                    >
                        <View style={styles.listItemCol}>
                            <Text style={styles.itemTitle} numberOfLines={2}>
                                {data.title}
                            </Text>
                            <View style={styles.itemImageColBox}>
                                <Image
                                    style={styles.itemImageCol}
                                    source={{uri: data.top_image }}
                                />
                                <Image
                                    style={styles.itemImageCol}
                                    source={{uri: data.text_image0 }}
                                />
                                <Image
                                    style={styles.itemImageCol}
                                    source={{uri: data.text_image1 }}
                                />
                            </View>
                            <Text style={styles.itemTimeCol} >{data.source+' '+time}</Text>
                        </View>
                    </TouchableNativeFeedback>
                )
            }
        }
        return (
            <TouchableNativeFeedback
                onPress={() => Actions.toutiaozhengwen({content: data.content})}
                background={   TouchableNativeFeedback.Ripple('#ffdb42',false)}
                >
                <View style={styles.listItem}>
                    <Text style={styles.itemTitle} numberOfLines={2}>
                        {data.title}
                    </Text>
                    <Text style={styles.itemTime} >{data.source+' '+time}</Text>
                    <Image
                        style={styles.itemImage}
                        source={{uri: data.top_image }}
                    />
                </View>
            </TouchableNativeFeedback>
        )
    }
}
let deviceWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
    listItemCol:{
        flexDirection: 'column',
        width: deviceWidth,
        padding: 10,
        backgroundColor: 'transparent',
    },
    listItem: {
        flexDirection: 'row',
        width: deviceWidth,
        padding: 10,
        backgroundColor: 'transparent',
    },
    itemTitle: {
        flex: 1,
        lineHeight: 20,
        marginRight: 5
    },
    itemImageColBox:{
        marginTop:5,
        flexDirection: 'row',
        flex:1,
        justifyContent: 'space-between',
    },
    itemImageCol:{
        width: deviceWidth/3-10,
        height: 80,
        borderRadius:5
    },
    itemImage: {
        width: deviceWidth/3-10,
        height: 80,
        borderRadius:5
    },
    itemTimeCol:{
        marginTop:3,
        color:'#ccc',
        fontSize:12
    },
    itemTime:{
        position:'absolute',
        left:10,
        bottom:10,
        color:'#ccc',
        fontSize:12
    }
})
export default NewsItem