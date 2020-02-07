import React, {Component} from 'react'
import "../profile/style.css"
import {Editor} from "react-draft-wysiwyg";
import {EditorState, convertToRaw, ContentState} from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';

class Post extends Component {
    constructor() {
        super();
        this.state = {
            editorState: EditorState.createEmpty(),
        };
        this.insideSubmit = this.insideSubmit.bind(this)
    }

    onEditorStateChange(editorState) {


        this.setState({
            editorState,
        });
    }

    async insideSubmit() {
        let title = document.getElementById("title").value;
        //
        //let pic = document.getElementById("file").value;

        let edState = this.state.editorState;
        // console.log(draftToHtml(convertToRaw(edState.getCurrentContent())))
        let content = draftToHtml(convertToRaw(edState.getCurrentContent()));

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("ACCESS_TOKEN"))

        if (!(document.getElementById("title").validity.valid)) {
            alert("something in input is wrong")
            return
        }


        let a = window.location.href
        let re = /^http:\/\/(localhost|127\.0\.0\.1):3000\/channel\/(\w+)\/post\/?$/
        let channelIdentifier = a.match(re)[2];

        var raw = JSON.stringify({
            "chanelIdentifier": channelIdentifier,
            "body": content,
            "title": title,
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        fetch("http://127.0.0.1:8000/api/posts/", requestOptions)
            .then(response => response.text())
            .then(function (result) {
                console.log(result)
                let obj = JSON.parse(result);
                let msg = obj.msg;
                alert(msg)

            })
            .catch(error => {
                //alert('error' + error)
            });


    }


    render() {
        const editorStyle = {
            border: '1px solid black',
            padding: '5px',
            borderRadius: '5%',
            height: '300px',
            width: '100%',
        };
        return (
            <div className="container">
                <div className="row">
                    <div className="card col-8">
                        {/*<nav className="navbar navbar-expand-lg navbar-light">*/}
                        {/*    {temp}*/}
                        {/*</nav>*/}
                        <h3 className="card-title center">New Post Into Channel</h3>
                        <div className="card-body">
                            <div>
                                <div className="md-form">
                                    <label className="center">Title</label>
                                    <input type="text" id="title" className="form-control" placeholder="title"
                                    />
                                </div>
                                <br/>
                                <br/>
                                <div className="form-group shadow-textarea">
                                    <label htmlFor="description">Content</label>
                                    <Editor
                                        editorState={this.state.editorState}
                                        toolbarClassName="toolbarClassName"
                                        wrapperClassName="wrapperClassName"
                                        editorClassName="editorClassName"
                                        editorStyle={editorStyle}
                                        onEditorStateChange={this.onEditorStateChange.bind(this)}
                                    />

                                </div>
                                <button onClick={this.insideSubmit.bind(this)} type="submit"
                                        className="btn btn-primary">
                                    Post
                                </button>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Post