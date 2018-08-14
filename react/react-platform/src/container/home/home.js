/**
 * Created by Administrator on 2017/6/13.
 */
import React from 'react'
// import CommentEditor from './comment-editor'
class Home extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            editor: null
        }
    }
    render() {
        const that=this;
        return (
            <div className="home">
                <iframe src="http://124.228.9.126:8000/water/#/login" name="iframe_a" title="title" style={{width:'100%',height:'500px'}}></iframe>
            </div>

        )
    }
}


export default Home