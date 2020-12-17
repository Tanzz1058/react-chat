import React from 'react';
import { Segment, Comment } from 'semantic-ui-react';
import MessagesHeader from './messagesHeader';
import MessagesForm from './messagesForm';
import firebase from '../../firebase';
import Message from './message';

class Messages extends React.Component{
    state = {
        messagesRef: firebase.database().ref('messages'),
        channel: this.props.currentChannel,
        user: this.props.currentUser,
        messages: [],
        messagesLoading: true
    }

    componentDidMount(){
        if(this.props.currentUser && this.props.currentChannel){
            this.addListeners(this.props.currentChannel.id);
        }
    }

    addListeners = channelId =>{
        this.addMessageListener(channelId)
    }

    addMessageListener = channelId => {
        let loadedMessages = [];
       this.state.messagesRef.child(channelId).on('child_added' , snapshot=>{
            loadedMessages.push(snapshot.val());
            this.setState({messages: loadedMessages, messagesLoading: false })
        })
    }

    displayMessage = messages => (
        messages.map(message =>(
            <Message
            key = {message.timeStamp}
            message = {message}
            user = {this.props.currentUser}/>
        ))
    )

    render(){
        const {messagesRef, channel, user} = this.state;

        return(
            <React.Fragment>
                <MessagesHeader/>
                <Segment>
                    <Comment.Group className= 'messages'>
                        {this.displayMessage(this.state.messages)}
                    </Comment.Group>
                </Segment>
                <MessagesForm 
                messagesRef = {messagesRef}
                currentChannel = {channel}
                currentUser = {user}/>
            </React.Fragment>
            
        )
    }
}
export default Messages;