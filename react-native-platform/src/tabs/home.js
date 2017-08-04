/**
 * Created by Administrator on 2017/4/11.
 */
import React, {Component} from 'react'
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Platform,
    ScrollView,
    TouchableWithoutFeedback,
    Image,
    ListView,
    Dimensions,
    TouchableNativeFeedback
} from 'react-native'
import {Actions} from 'react-native-router-flux'
import SwipeableViews from 'react-swipeable-views-native'
import {autoPlay} from 'react-swipeable-views-utils'
const AutoPlaySwipeableViews = autoPlay(SwipeableViews)
import LoadingSpinner from '../components/loadingSpinner'
import { fetchEndPoints } from './../actions/fetchZH';
import { connect } from 'react-redux';
import NavBar from './../components/NavBar';

//使用纯函数定义无状态(无state)函数组件,第一个参数为props,只有一个render方法
const ListItem = ({data}) => {//{data}==> data=this.props.data获得this.props中的某个值
    return (
        <TouchableNativeFeedback
            background={   TouchableNativeFeedback.Ripple('#ffdb42',false)}
             onPress={() => Actions.content({articleID: data.id})}>
            <View style={styles.listItem}>
                <Text style={styles.itemTitle} numberOfLines={2}>
                    {data.title}
                </Text>
                <Image
                    style={styles.itemImage}
                    source={{uri: data.images[0]}}
                />
            </View>
        </TouchableNativeFeedback>
    )
}


class Home extends Component {
    constructor() {
        super()
    }
    componentDidMount=()=>{
        if(!this.props.fetchZH.loaded){
            this.props.dispatch( fetchEndPoints());
        }
    }
    _swiperViews=()=>{
        console.log("topStories",this.props.fetchZH.top_stories);
        let views = []
        this.props.fetchZH.top_stories.forEach((ele, index, arr) => {
            views.push(
                <TouchableWithoutFeedback onPress={() => Actions.content({articleID: ele.id})}>
                    <View style={[styles.slide]}>
                        <Image
                            style={{
                                flex: 1,
                                height: 200,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                            source={{uri: ele.image}}//{uri}图片地址，不是url
                            resizeMode='cover'
                        >
                            <Text style={styles.slideTitle}>
                                {ele.title}
                            </Text>
                        </Image>
                    </View>
                </TouchableWithoutFeedback>
            )
        })
        return views
    }
    render() {
        if (this.props.fetchZH.top_stories.length == 0) return <LoadingSpinner animating={true}/>
        return (
            <View style={styles.container}>
                <NavBar   navbar_text='你知道吗?'/>
                <ScrollView>
                    <AutoPlaySwipeableViews
                        ref='swiper'
                        style={styles.slideContainer}
                        interval={5000}
                        springConfig={{tension: 100, friction: 30}}
                        children={this.props.fetchZH.top_stories.length == 0 ? <View></View> : this._swiperViews()}
                    />
                    <ListView
                        dataSource={this.props.fetchZH.stories}
                        renderRow={(rowData, sectionID, rowID) => <ListItem data={rowData} key={rowID}/>}//renderRow渲染每一个item
                        renderSeparator={(sectionID, rowID, adjacentRowHighlighted) => {
                            return <View style={{borderWidth: .3, borderColor: '#ccc'}} key={rowID}></View>//renderSeparator渲染item之间的分界
                        }}
                    />
                </ScrollView>

            </View>

        );
    }
}
//Dimensions用于获取设备屏幕的宽高。
//var {height, width} = Dimensions.get('window');
let deviceWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
    container: {
        flex: 1,//要定义，否则没有高度
        paddingBottom: 50//因为底部有导航，所以需要paddingBottom
    },
    slideContainer: {
        height: 200,
        flex: 0
    },
    slide: {
        height: 200,
        backgroundColor: 'transparent',
    },
    slideTitle: {
        color: '#fff',
        fontSize: 18,
        marginTop: 100,
        marginLeft: 20,
        marginRight: 20,
        textAlign: 'center'
    },
    listItem: {
        flexDirection: 'row',//改变flex默认方向
        width: deviceWidth,
        padding: 10,
        backgroundColor: 'transparent',
    },
    itemTitle: {
        flex: 1,//占据剩余宽度
        lineHeight: 20,
        marginRight: 5
    },
    itemImage: {
        width: 60,//固定宽度
        height: 60
    }
})

const mapStateToProps = state => ({
    fetchZH: state.fetchZH
})

export default connect(mapStateToProps)(Home);
