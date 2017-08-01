/**
 * Created by Administrator on 2017/4/11.
 */
import React, {Component} from 'react'
import {
    Text,
    View,
    WebView,
    StyleSheet,
    Platform,
    ScrollView,
    ListView,
    Dimensions,
    TouchableOpacity
} from 'react-native'
import {fetchToutiao} from './../../actions/news/toutiao';
import {connect} from 'react-redux';
import LoadingSpinner from '../../components/loadingSpinner'
import WxItem from '../../components/wxItem'
import RightBottomBtn from './../../components/rightBottomBtn'
import {Actions} from 'react-native-router-flux'
import axios from 'axios';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

class Tab extends Component {
    constructor() {
        super()
        this.state = {
            showTurnTop:false,
            tempArr:[],
            data:ds,
            page:1
        }
    }

    componentDidMount = ()=> {
        this._getData(this.props.id,1)
    }
    componentWillReceiveProps(nextProps){
        if(this.props.id!==nextProps.id){
            this.setState({
                data:new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
                tempArr:[],
            },function () {
                this._getData(this.props.id,1)
            })
        }
    }
    _getData=(id,page)=>{
        axios({
            url:'http://route.showapi.com/582-2',
            params:{
                showapi_appid:36573,
                showapi_sign:'6818f6ac390444cfbf2e24b129ca049b',
                typeId:id,
                page:page
            }
        }).then((data)=>{
            console.log('list',data.data.showapi_res_body.pagebean.contentlist);
            let temp=this.state.tempArr.concat(data.data.showapi_res_body.pagebean.contentlist)
            this.setState({
                tempArr:temp,
                data:this.state.data.cloneWithRows(temp)
            })
        }).catch((err)=>{
            console.log(err)
        });
    }
    loadMore=()=>{
        let newPage=this.state.page+1;
        this.setState({
            page:this.state.page+1
        })
        this._getData(this.props.id,newPage)
    }
    _renderTurnTopBtn=()=> {
        if(this.state.showTurnTop){
            return (
            <RightBottomBtn onPress={() => { this._scrollView.scrollTo({y: 0}); }} icon="chevron-up" />
            )
        }else {
            return null
        }

    }
    scrollView=(e)=>{
        if(e.nativeEvent.contentOffset.y>600){
            this.setState({
                showTurnTop:true
            })
        }else{
            this.setState({
                showTurnTop:false
            })
        }
    }
    render() {
        /**
         * data通过cloneWithRows拼接，不能直接使用data.length
         * */
        if (this.state.data.rowIdentities.length == 0) return <LoadingSpinner animating={true}/>;
        return (
            <View style={styles.container}>
                <ScrollView
                    ref={(scrollView) => { this._scrollView = scrollView; }}
                    scrollEventThrottle={200}
                    onScroll={this.scrollView } >
                    <ListView
                        dataSource={this.state.data}
                        renderRow={(rowData, sectionID, rowID) => <WxItem data={rowData} type={this.props.type} key={rowID}/>}
                        renderSeparator={(sectionID, rowID, adjacentRowHighlighted) => {
                            return <View style={{borderWidth: .3, borderColor: '#ccc'}} key={rowID}></View>
                        }}
                    />
                    <TouchableOpacity onPress={this.loadMore}>
                        <View style={styles.loadmore}><Text>点击加载更多...</Text></View>
                    </TouchableOpacity>

                </ScrollView>
                {this._renderTurnTopBtn()}

            </View>
        );
    }
}
let deviceWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    loadmore: {
        width: deviceWidth,
        height: 50,
        flex: 1, justifyContent: 'center', alignItems: 'center'
    }
})
export default Tab;