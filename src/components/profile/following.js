import React, {Component} from 'react'
import "./style.css"
import data from "../../static/jsons/profiles"
import UserCard from "./UserCard";
import ch from "../../static/jsons/Channels"
import ChannelCard from "./ChannelCard";
import Follow from "./follow";
import Edit from "./edit";

class Following extends Component {
    state = {
        users: [],
        channels: [],
    }

    componentDidMount() {
        //console.log(data)
        this.setState({
            users: data,
            channels: ch
        })

    }

    render() {
        let temp
        if ((this.props.flag))
            temp = <Follow me={this.props.me}/>
        else
            temp = <Edit/>
        return (
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light">
                    {temp}
                </nav>
                <h2>Following</h2>
                <br/>
                <h3>Users</h3>
                <hr/>
                <div className="row">
                    {this.state.users.map((user) => {
                        if (this.props.user.followingUsers.includes(user.id))
                            return (
                                <UserCard user={user}/>
                            )
                    })}
                </div>
                <h3>Channels</h3>
                <hr/>
                <div className="row">
                    {this.state.channels.map((channel) => {
                        if (this.props.user.followingChannels.includes(channel.id))
                            return (
                                <ChannelCard channel={channel}/>
                            )
                    })}
                </div>
            </div>
        )
    }
}

export default Following