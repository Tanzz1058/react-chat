import React from 'react';
import moment from 'moment';
import {Comment, CommentAuthor, CommentContent, CommentMetadata, CommentText, Image} from 'semantic-ui-react';

class Message extends React.Component{

    isOwn = (message, user) => {
        return message.user.id === user.uid ? 'message_self' : ''
    }

    timeFromNow = timeStamp => moment(timeStamp).fromNow();

    isMessage = message => { return !message.hasOwnProperty('image')}

    render(){
        const {message, user} = this.props;
        return(
            <Comment>
                <Comment.Avatar src = {message.user.avatar} />
                <CommentContent className = {this.isOwn(message, user)}>
                     <CommentAuthor as = 'a'>{message.user.name}</CommentAuthor>
                     <CommentMetadata>{this.timeFromNow(message.timeStamp)}</CommentMetadata>
                     {!this.isMessage(message) ? <Image src = {message.image} className = 'messsage_image'/>
                     : <CommentText>{message.content}</CommentText>} 
                </CommentContent>
            </Comment>
        )
    }
}

export default Message; 