/**
 * Created by Administrator on 2017/4/11.
 */
import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    Platform,
    ListView,
    TouchableWithoutFeedback,
    Image,
    RefreshControl
} from 'react-native'

import ImageModal from '../components/imageModal'
const ImageItem = ({ url, images, rowID, t }) => {//t为Pic的this ,父组件可以通过props将自身的this传递给子组件
    let gif = url.endsWith('.gif'), newUrl = url
    if (gif) newUrl = url.replace('mw690','small')
        .replace('mw1024','small')
        .replace('mw1200','small')

    return (
        <TouchableWithoutFeedback onPress={() => {t.setState({modalUri: url, modalHide: false})}}>{/*在子组件调用父组件的this.setState({})*/}
            <View style={{padding: 10, margin: 10, borderRadius: 5, backgroundColor: '#FFF'}}>
                <Image
                    style={{
                        flex: 1,
                        height: 200,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    resizeMethod='scale'
                    source={{uri: newUrl}}
                >
                    <Text
                        style={{
                            backgroundColor: 'transparent',
                            color: '#FFF',
                            fontSize: 18
                        }}
                    >
                        {gif && 'PLAY'}{/*如果事gif显示'PLAY'*/}
                    </Text>
                </Image>

            </View>
        </TouchableWithoutFeedback>
    )
}
export default class Pic extends Component {
    constructor() {
        super()
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        this.state = {
            imageDS: ds,
            images: [],
            isRefreshing: false,
            currentPage: 1,
            modalUri: '',
            modalHide: true
        }
    }
    componentDidMount() {
        this._fetchImages()
    }
    _fetchImages(page = 1, callback) {
        let url = 'http://i.jandan.net/?oxwlxojflwblxbsapi=jandan.get_ooxx_comments&page=' + page
        fetch(url)
            .then((res) => res.json())
            .then((res) => {
                let tmp = page == 1 ? [] : this.state.images
                res.comments.forEach((ele, index, arr) => {
                    tmp = tmp.concat(ele.pics)
                })
                this.setState({
                    imageDS: this.state.imageDS.cloneWithRows(tmp),
                    images: tmp,
                    currentPage: page
                }, callback && callback())
            })
    }
    _onRefresh=()=>{
        this.setState({isRefreshing: true})
        /**
         * 存在callback，设置refreshing为false
         * */
        this._fetchImages(1,this.setState({isRefreshing: false}))
    }
    _onLoadMore=()=>{
        console.log("load more")
        let page = ++this.state.currentPage
        this._fetchImages(page)
    }
    render() {
        /**
         * 这一组件可以用在ScrollView或ListView内部，为其添加下拉刷新的功能。
         * 当ScrollView处于竖直方向的起点位置（scrollY: 0），此时下拉会触发一个onRefresh事件。
         *
         * onEndReached
         * 当所有的数据都已经渲染过，并且列表被滚动到距离最底部不足onEndReachedThreshold个像素的距离时调用。原生的滚动事件会被作为参数传递。
         * 译注：当第一次渲染时，如果数据不足一屏（比如初始值是空的），这个事件也会被触发，请自行做标记过滤。
         *
         * onEndReachedThreshold number
         * 调用onEndReached之前的临界值，单位是像素。
         * */
        return (
            <View  style={styles.container}>
                <ListView
                    dataSource={this.state.imageDS}
                    renderRow={(rowData, sectionID, rowID) =>
                        <ImageItem url={rowData} images={this.state.images} key={rowID} rowID={rowID} t={this} />
                    }
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this._onRefresh}
                            tintColor='#FFDB42'
                            title='拼命加载中' //android没有
                            titleColor="black"//android没有
                            colors={['black']}
                            progressBackgroundColor="#FFDB42"

                        />
                    }

                    onEndReachedThreshold={200} //距离底部多少获取更多
                    onEndReached={this._onLoadMore} //拉到底部钩子
                />
                <ImageModal
                    uri={this.state.modalUri}
                    hide={this.state.modalHide}
                    onPress={()=>this.setState({modalHide: true})}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'ios' ? 60 : 54,
        paddingBottom: 50,
        backgroundColor: '#EEE'
    },
})
