/**
 * Created by Administrator on 2017/4/11.
 */
import React, {Component} from 'react'
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
import imageData from './../util/image.json';
import {Actions} from 'react-native-router-flux'
import NavBar from './../components/NavBar'

export default class Pic extends Component {
    constructor() {
        super()
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        this.state = {
            imageDS: ds.cloneWithRows(imageData),
            images: imageData,
            showIndex: 0,
        }
    }

    componentDidMount() {
    }

    onPressImage = (rowID)=> {
        Actions.showbigimage({showIndex:this.state.showIndex,images:this.state.images,rowID:rowID})
    }

    render() {
        return (
            <View style={styles.container}>
                <NavBar   navbar_text='画廊'  showrightBtn={true}  right_text='技巧'  rightBtnPress={()=>{Actions.imageTech({})}} />
                <ListView
                    dataSource={this.state.imageDS}
                    renderRow={(rowData, sectionID, rowID) =>
                        <TouchableWithoutFeedback onPress={this.onPressImage.bind(this,rowID)}>
                            <View style={{
                                padding: 10,
                                marginTop: 10,
                                marginLeft: 10,
                                marginRight: 10,
                                borderRadius: 5,
                                backgroundColor: '#FFF'
                            }}>
                                <Image
                                    style={{
                                        flex: 1,
                                        height: 200,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                    resizeMethod='scale'
                                    source={{uri: rowData.url}}
                                >
                                </Image>

                            </View>
                        </TouchableWithoutFeedback>
                    }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 50,
        backgroundColor: '#EEE'
    },
})