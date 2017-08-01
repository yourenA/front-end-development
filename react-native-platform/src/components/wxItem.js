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

class WxItem extends Component {
    constructor() {
        super()
        this.state = {
        }
    }
    render() {
        const data=this.props.data
        return (
            <TouchableNativeFeedback
                onPress={() => Actions.wz({wxUrl: data.url,wxTitle:data.title,thumbImage:data.contentImg})}
                background={   TouchableNativeFeedback.Ripple('#ffdb42',false)}
                >
                <View style={styles.listItem}>
                    <Image
                        style={styles.itemImage}
                        source={{uri: data.contentImg }}
                    />
                    <View style={styles.itemTitle}>
                        <Text style={{lineHeight:23,marginTop:-7}} numberOfLines={2}>
                            {data.title}
                        </Text>
                        <View style={{ flexDirection: 'row', justifyContent:'space-between'}}>
                            <Text >
                                {data.date}
                            </Text>
                            <View  style={{ flexDirection: 'row'}}>
                                <Text  style={styles.user}  numberOfLines={1}>
                                    {data.userName}
                                </Text>
                                <Image
                                    style={styles.avatorImage}
                                    source={{uri: data.userLogo }}
                                />
                            </View>

                        </View>
                    </View>


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
        marginLeft: 5,
        justifyContent:'space-between'
    },
    itemImage: {
        width: deviceWidth/3-20,
        height: 80,
        borderRadius:5
    },
    user:{
        width:60,
        textAlign:'right'
    },
    avatorImage:{
        width: 20,
        height: 20,
        borderRadius:10,
        marginLeft:5
    }
})
export default WxItem