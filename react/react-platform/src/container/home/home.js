/**
 * Created by Administrator on 2017/6/13.
 */
import React from 'react'
import CommentEditor from './comment-editor'
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
            </div>

        )
    }
}


export default Home