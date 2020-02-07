import React, {Component} from 'react';
import UserCard from "../profile/UserCard";
import ChannelCard from "../profile/ChannelCard";
import Users from "./../../static/jsons/profiles"
import "./topic.css"
import {Redirect} from "react-router-dom";


class ChannelPage extends Component {
    state = {
        title: "",
        rule: "",
        description: "",
        identifier: "",
        owner: "",
        authors: "",

    };

    componentDidMount() {

        const that = this;

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("ACCESS_TOKEN"))

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        let a = window.location.href
        let re = /^http:\/\/(localhost|127\.0\.0\.1):3000\/channel\/(\w+)\/?$/
        let profile_name = a.match(re)[2];

        let url = "http://127.0.0.1:8000/api/chanel/get/";

        url = url + profile_name;


        fetch(url, requestOptions)
            .then(response => response.text())
            .then(function (result) {

               console.log(result)
                let obj = JSON.parse(result);
                let data = obj.data;
                let title = data.title;
                if (!title) {
                    title = "NO TITLE";
                }
                let rule = data.law;
                if (!rule) {
                    rule = "NO RULES"
                }
                let description = data.description;
                if (!description) {
                    description = "NO DESCRIPTION"
                }
                let identifier = data.identifier;
                let owners = data.owner;
                var authors = data.author;

                let owner_string = owners.username
                //console.log(authors)

                let author_str = ""
                for (let author of authors) {
                    // console.log("AUTHORAR: "+author)
                    author_str = author_str + "<a href=\"http://localhost:3000/profile/other/ " + author.username + "\">" + author.username + "</a> <br/>"
                    //console.log(author_str)
                }

                document.getElementById("Authors").innerHTML = author_str;

                that.setState({
                    title: title,
                    rule: rule,
                    description: description,
                    identifier: identifier,
                    owner: owner_string,
                    authors: author_str,
                });

                {
                    var myHeaders2 = new Headers();
                    myHeaders2.append("Content-Type", "application/json");
                    myHeaders2.append("Authorization", "Bearer " + localStorage.getItem("ACCESS_TOKEN"))

                    var requestOptions2 = {
                        method: 'GET',
                        headers: myHeaders2,
                        redirect: 'follow'
                    };

                    let a2 = window.location.href
                    let re2 = /^http:\/\/(localhost|127\.0\.0\.1):3000\/channel\/(\w+)\/?$/
                    let profile_name2 = a2.match(re)[2];

                    let url2 = "http://127.0.0.1:8000/api/posts/chanel/";

                    url2 = url2 + profile_name;


                    fetch(url2, requestOptions2)
                        .then(response2 => {
                            let response2_json = response2.json();
                            // console.log(response2_json);
                            return response2_json
                        })
                        .then(function (result2) {


                            let output_str = "<br/>"
                            for (let msg of result2.msg) {

                                let author_id = msg.author;
                                let author_name
                                for (let author_ of authors)
                                {
                                    if (author_.id = author_id)
                                    {
                                        author_name = author_.username;
                                    }
                                }
                                let stringRes = '<div class="row">\n' +
                                    '    <div class="col">\n' +
                                    '        <div class="card">\n' +
                                    '            <div class="card-body">\n' +
                                    '                <h4 class="card-title">' + msg.title + '</h4>\n' +
                                    '                <h6 class="text-muted card-subtitle mb-2">'+ author_name + "::: " + msg.create_time + '</h6>\n' +
                                    '                <p class="card-text">Nullam id dolor id nibh ultricies vehicula ut id elit. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus.</p><a class="card-link" href="#"><i class="fa fa-plus"></i><span>Text</span></a>\n' +
                                    '                <a\n' +
                                    '                    class="card-link" href="#"><i class="fa fa-minus"></i><span>Text</span></a>\n' +
                                    '            </div>\n' +
                                    '        </div>\n' +
                                    '    </div>\n' +
                                    '</div>'
                                console.log(stringRes)
                            }
                            //let newObj = JSON.parse(result2);

                            //console.log("newObj:" + newObj.toString());


                        })
                        .catch(error2 => {
                            alert('error0 ' + error2)
                            return
                        });
                }





            })
            .catch(error => {
                alert('error0 ' + error)
                return
            });




    }

    render() {
        if (localStorage.getItem("ACCESS_TOKEN") == null && localStorage.getItem("ACCESS_TOKEN") == undefined) {
            return (<Redirect to="/signUp"/>)
        }
        return (

            <div className="container">
                <div className="row text-center">
                    <div className="col channel-titr-container"
                         style={{backgroundColor: 'rgb(119,255,180)', minHeight: '400px'}}>
                        Title:
                        <br/>
                        <div className="row channel-titr" id="channel-Title"> {this.state.title}</div>

                        <hr/>
                        Identifier:
                        <br/>
                        <div className="row channel-titr"
                             id="channel-identifier">{this.state.identifier}</div>
                        <hr/>
                        Description:
                        <br/>
                        <div className="row channel-titr"
                             id="Channel-description">{this.state.description}</div>
                        <hr/>
                        Rules
                        <br/>
                        <div className="row channel-titr" id="Channel-Rules">{this.state.rule}</div>
                        <hr/>
                        Admin
                        <br/>
                        <div className="row channel-titr" id="Admins"> {<a
                            href={"http://localhost:3000/profile/other/" + this.state.owner}>  {"    " + this.state.owner}</a>}</div>
                        <hr/>
                        Authors<br/>
                        <div className="row channel-titr" id="Authors">


                        </div>
                    </div>
                    <div className="col-8" id="post-container">
                        <div className="row"></div>
                        <div className="row"></div>
                        <div className="row"></div>
                        <div className="row"></div>
                        <div className="row"></div>

                        <div className="row"></div>
                    </div>
                </div>
                <script src="assets/js/jquery.min.js"></script>
                <script src="assets/bootstrap/js/bootstrap.min.js"></script>
            </div>
        )
    }

}

export default ChannelPage