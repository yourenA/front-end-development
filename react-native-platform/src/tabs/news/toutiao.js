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
import NewsItem from '../../components/newsItem'
import RightBottomBtn from './../../components/rightBottomBtn'
import {Actions} from 'react-native-router-flux'


class Toutiao extends Component {
    constructor() {
        super()
        this.state = {
            showTurnTop:false
        }
    }

    componentDidMount = ()=> {
        console.log("this.props",this.props);
        if(!this.props.toutiao[`loaded_${this.props.type}`]){
            console.log("获取数据")
            this.props.dispatch( fetchToutiao(this.props.type));
        }
    }
    loadMore=()=>{
        let newPage=this.props.toutiao[`page_${this.props.type}`]+1;
        this.props.dispatch( fetchToutiao(this.props.type,newPage));
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
        if (this.props.toutiao[`data_${this.props.type}`].rowIdentities.length == 0) return <LoadingSpinner animating={true}/>;
        return (
            <View style={styles.container}>
                <ScrollView
                    ref={(scrollView) => { this._scrollView = scrollView; }}
                    scrollEventThrottle={200}
                    onScroll={this.scrollView } >
                    <ListView
                        dataSource={this.props.toutiao[`data_${this.props.type}`]}
                        renderRow={(rowData, sectionID, rowID) => <NewsItem data={rowData} type={this.props.type} key={rowID}/>}
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
const mapStateToProps = state => ({
    toutiao: state.toutiao
})
export default connect(mapStateToProps)(Toutiao);